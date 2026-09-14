/** AWS CodePipeline — CI/CD orchestration with CodeBuild and CodeDeploy */
export const awsCodePipeline = {
  id: 113,
  category: "AWS CodePipeline",
  themeBgColor: "#E0F2FE",
  textColor: "#075985",
  topicColor: "#0284C7",
  lightColor: "#F0F9FF",
  type: [
    {
      id: 1,
      label: "Beginner",
      concepts: [
        {
          topic: "Pipelines, Stages, Actions & Artifacts",
          tags: ["aws", "codepipeline", "ci/cd", "stages", "artifacts"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS CodePipeline</strong> is a managed continuous delivery service that models a release as a series of <strong>stages</strong> (Source, Build, Test, Deploy) containing <strong>actions</strong>. Each time the source changes, a new <strong>execution</strong> flows through the stages, passing <strong>artifacts</strong> via S3. It orchestrates the other AWS developer tools and third-party providers rather than doing the work itself.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Vocabulary</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Pipeline:</strong> The whole workflow definition, plus a service role and an artifact bucket.</li>
  <li><strong>Stage:</strong> A logical phase. Stages run <strong>sequentially</strong>; a failure stops the execution at that stage.</li>
  <li><strong>Action:</strong> A unit of work in a stage with a <strong>provider</strong> (CodeBuild, CodeDeploy, CloudFormation, Lambda, Manual approval, GitHub via CodeConnections, ECR, S3, Step Functions, Jenkins). Actions in the same stage with the same <code>runOrder</code> run <strong>in parallel</strong>.</li>
  <li><strong>Artifact:</strong> A zip in the pipeline's S3 bucket produced by one action and consumed by later ones (source code, build output, <code>imagedefinitions.json</code>, CloudFormation templates). Encrypted with SSE-S3 or a KMS key.</li>
  <li><strong>Execution:</strong> One run of the pipeline for a specific source revision, with its own ID and per-stage status.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Sources</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>GitHub, GitLab, Bitbucket</strong> via <strong>CodeConnections</strong> (formerly CodeStar Connections): an OAuth-style app installation, webhooks trigger the pipeline on push.</li>
  <li><strong>S3</strong> object versions (uploads from external tools) and <strong>ECR</strong> image pushes.</li>
  <li><strong>CodeCommit</strong> still works for existing users but is closed to new customers.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">A minimal container pipeline</h4>
<pre><code class="language-text">Source  (GitHub main via CodeConnections)      -> SourceArtifact
Build   (CodeBuild: test, docker build, push)  -> BuildArtifact (imagedefinitions.json)
Deploy  (ECS rolling update action)            <- BuildArtifact</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">V2 pipelines</h4>
<p style="line-height: 1.75;">Pipeline type V2 adds <strong>trigger filters</strong> (branches, tags, file paths, pull request events), <strong>pipeline-level variables</strong>, <strong>stage-level rollback and conditions</strong>, and per-action-minute pricing instead of a flat monthly fee. New pipelines should be V2.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Observability</h4>
<p style="line-height: 1.75;">Every state change emits an <strong>EventBridge</strong> event (<code>CodePipeline Pipeline Execution State Change</code>, stage and action variants), so notifications to Slack or automated follow-ups are a rule away. The console shows a visual execution history; the CLI has <code>get-pipeline-state</code>.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CodePipeline orchestrates a release as sequential stages of actions, passing artifacts through an S3 bucket. The source stage watches GitHub through CodeConnections, CodeBuild does the work in build and test stages, and deploy actions hand off to ECS, CodeDeploy or CloudFormation. Actions with the same run order execute in parallel, V2 pipelines add trigger filters and variables, and every state change is an EventBridge event I can alert on."</div>
</div>`,
          examples: [
            `# Pipeline definition (aws codepipeline create-pipeline --cli-input-json file://pipeline.json)
{
  "pipeline": {
    "name": "orders-api",
    "pipelineType": "V2",
    "roleArn": "arn:aws:iam::123456789012:role/codepipeline-orders-api",
    "artifactStore": { "type": "S3", "location": "orders-api-pipeline-artifacts" },
    "triggers": [{
      "providerType": "CodeStarSourceConnection",
      "gitConfiguration": { "sourceActionName": "GitHub", "push": [{ "branches": { "includes": ["main"] }, "filePaths": { "excludes": ["docs/**"] } }] }
    }],
    "stages": [
      { "name": "Source", "actions": [{
          "name": "GitHub", "actionTypeId": { "category": "Source", "owner": "AWS", "provider": "CodeStarSourceConnection", "version": "1" },
          "configuration": { "ConnectionArn": "arn:aws:codeconnections:us-east-1:123456789012:connection/abcd", "FullRepositoryId": "my-org/orders-api", "BranchName": "main", "OutputArtifactFormat": "CODE_ZIP" },
          "outputArtifacts": [{ "name": "SourceArtifact" }]
      }]},
      { "name": "Build", "actions": [{
          "name": "BuildAndPush", "actionTypeId": { "category": "Build", "owner": "AWS", "provider": "CodeBuild", "version": "1" },
          "configuration": { "ProjectName": "orders-api-build" },
          "inputArtifacts": [{ "name": "SourceArtifact" }], "outputArtifacts": [{ "name": "BuildArtifact" }]
      }]},
      { "name": "Deploy", "actions": [{
          "name": "DeployToECS", "actionTypeId": { "category": "Deploy", "owner": "AWS", "provider": "ECS", "version": "1" },
          "configuration": { "ClusterName": "prod", "ServiceName": "orders-api", "FileName": "imagedefinitions.json" },
          "inputArtifacts": [{ "name": "BuildArtifact" }]
      }]}
    ]
  }
}`,
            `# Run and inspect
aws codepipeline start-pipeline-execution --name orders-api
aws codepipeline get-pipeline-state --name orders-api \\
  --query 'stageStates[].{stage:stageName,status:latestExecution.status,revision:actionStates[0].currentRevision.revisionId}' --output table
aws codepipeline list-pipeline-executions --name orders-api --max-items 5

# Slack notification on any failed execution, via EventBridge
aws events put-rule --name pipeline-failed --event-pattern '{
  "source": ["aws.codepipeline"],
  "detail-type": ["CodePipeline Pipeline Execution State Change"],
  "detail": { "state": ["FAILED"] }
}'`,
          ],
          questions: [
            {
              question: "What is the difference between CodePipeline, CodeBuild and CodeDeploy?",
              solution: "<p><strong>CodePipeline</strong> is the orchestrator: it defines the stages, watches the source, passes artifacts and decides what runs next. <strong>CodeBuild</strong> does the work of compiling, testing and packaging in ephemeral containers driven by a buildspec. <strong>CodeDeploy</strong> handles the release onto EC2, ECS or Lambda with strategies such as in-place, blue/green, canary and linear, plus automatic rollback. A pipeline typically has CodeBuild in its build and test stages and CodeDeploy (or CloudFormation) in its deploy stages, but any of them can be used alone.</p>",
            },
            {
              question: "How do artifacts move between stages?",
              solution: "<p>Each action can declare <strong>output artifacts</strong>, which CodePipeline zips and stores in the pipeline's <strong>S3 artifact bucket</strong> (encrypted with SSE-S3 or a customer KMS key), and <strong>input artifacts</strong>, which are downloaded and unpacked into the action's workspace. The source action outputs the repository snapshot, CodeBuild outputs whatever its buildspec lists under <code>artifacts</code>, and deploy actions read the files they need, for example <code>imagedefinitions.json</code> for ECS or a template for CloudFormation. Artifact names must match exactly between producer and consumer.</p>",
            },
            {
              question: "How do you run actions in parallel within a stage?",
              solution: "<p>Give actions in the same stage the same <strong><code>runOrder</code></strong> value; CodePipeline starts them simultaneously and waits for all to succeed before moving on. Different run orders create sequential groups inside the stage. A common layout is a Test stage with unit tests, lint and security scan as three parallel CodeBuild actions at run order 1, followed by an integration test at run order 2. Stages themselves always run sequentially.</p>",
            },
            {
              question: "What do V2 pipelines add over V1?",
              solution: "<p>V2 adds <strong>trigger filters</strong> so a push only starts the pipeline for specific branches, tags, or file paths (and can trigger on pull request events), <strong>pipeline-level variables</strong> that can be set at start and referenced in actions, <strong>stage-level conditions and automatic rollback</strong> to the last successful revision, and <strong>parallel and queued execution modes</strong>. Pricing changes from a flat monthly fee per active pipeline to per action-execution minute, which is cheaper for pipelines that run infrequently.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html",
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html",
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types.html",
          ],
        },
        {
          topic: "CodeBuild & buildspec.yml",
          tags: ["aws", "codebuild", "buildspec", "docker", "ecr", "testing"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS CodeBuild</strong> is the serverless build service most pipelines use for compiling, testing and packaging. Each build runs in a fresh <strong>container</strong> from an AWS-managed or custom image, follows the steps in a <strong>buildspec.yml</strong>, and is billed per build minute. No build servers to maintain, and builds scale out as far as your concurrency limit allows.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Project configuration</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Environment:</strong> Managed images (Amazon Linux, Ubuntu, Windows) with runtimes for Node, Python, Java, Go, .NET; or your own ECR image. Compute types from small (3 GB) to 2xlarge (145 GB), plus ARM, GPU and <strong>Lambda-based</strong> compute for fast small builds.</li>
  <li><strong>Privileged mode</strong> is required to build Docker images (Docker-in-Docker).</li>
  <li><strong>Service role:</strong> What the build may do: pull from ECR, push images, read secrets, write logs, upload artifacts.</li>
  <li><strong>VPC access</strong> when builds must reach private resources such as a database for integration tests.</li>
  <li><strong>Caching:</strong> S3 cache or local Docker layer and source caches speed up repeated builds.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">buildspec.yml phases</h4>
<pre><code class="language-yaml">version: 0.2
env:
  variables: { NODE_ENV: test }
  parameter-store: { API_BASE_URL: /orders/test/api-url }
  secrets-manager: { NPM_TOKEN: ci/npm-token:token }
phases:
  install:      # runtime versions, tool installs
  pre_build:    # login to ECR, dependency install, lint
  build:        # compile, test, docker build
  post_build:   # push image, write imagedefinitions.json
reports:        # JUnit / Cucumber / coverage test reports
artifacts:      # files to hand to the next pipeline stage
cache:          # paths to cache between builds</code></pre>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Commands run in order; a non-zero exit fails the phase and the build (except <code>post_build</code>, which runs even after a failed <code>build</code> unless you guard it with <code>finally</code> or the build status variable).</li>
  <li><code>CODEBUILD_RESOLVED_SOURCE_VERSION</code> gives the commit SHA, the standard image tag.</li>
  <li><strong>Reports</strong> turn JUnit XML and coverage files into test dashboards with history and flakiness tracking.</li>
  <li><strong>Batch builds</strong> run a matrix (multiple runtimes or architectures) from one buildspec.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Good practices</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Pin runtime versions and base images; builds must be reproducible.</li>
  <li>Reference secrets through <code>env.secrets-manager</code> or <code>parameter-store</code>, never plain environment variables, and never <code>echo</code> them; CodeBuild masks known secret values in logs.</li>
  <li>Use <code>docker buildx</code> with registry cache to ECR to cut image build times.</li>
  <li>Set a build timeout and a concurrency limit so a runaway or looping build cannot burn budget.</li>
  <li>Keep build logic in the repository's buildspec, not in the console, so changes are reviewed with the code.</li>
</ul>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CodeBuild runs each build in a clean container from a buildspec in the repo: install, pre_build, build and post_build phases, then reports and artifacts. I enable privileged mode to build Docker images, tag them with the commit SHA, push to ECR and emit imagedefinitions.json for the ECS deploy action. Secrets come from Secrets Manager or Parameter Store through the env section, caching speeds up repeat builds, and test reports give me JUnit dashboards."</div>
</div>`,
          examples: [
            `# buildspec.yml: test, build, push image, hand off to the ECS deploy action
version: 0.2
env:
  variables:
    REPO_URI: 123456789012.dkr.ecr.us-east-1.amazonaws.com/orders-api
  secrets-manager:
    NPM_TOKEN: ci/npm-token:token
phases:
  install:
    runtime-versions: { nodejs: 20 }
    commands:
      - npm ci
  pre_build:
    commands:
      - npm run lint
      - npm test -- --reporters=default --reporters=jest-junit
      - aws ecr get-login-password | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
      - export TAG=\${CODEBUILD_RESOLVED_SOURCE_VERSION:0:7}
  build:
    commands:
      - docker buildx build --platform linux/arm64 -t $REPO_URI:$TAG -t $REPO_URI:latest \\
          --cache-from type=registry,ref=$REPO_URI:cache --cache-to type=registry,ref=$REPO_URI:cache,mode=max --push .
  post_build:
    commands:
      - printf '[{"name":"api","imageUri":"%s"}]' $REPO_URI:$TAG > imagedefinitions.json
reports:
  unit-tests:
    files: [junit.xml]
    file-format: JUNITXML
artifacts:
  files: [imagedefinitions.json]
cache:
  paths: ['node_modules/**/*']`,
            `# Create the project (privileged for Docker, ARM compute, S3 cache, 30-minute timeout)
aws codebuild create-project --name orders-api-build \\
  --source type=CODEPIPELINE,buildspec=buildspec.yml \\
  --artifacts type=CODEPIPELINE \\
  --environment type=ARM_CONTAINER,image=aws/codebuild/amazonlinux2-aarch64-standard:3.0,computeType=BUILD_GENERAL1_SMALL,privilegedMode=true \\
  --service-role arn:aws:iam::123456789012:role/codebuild-orders-api \\
  --cache type=S3,location=orders-api-build-cache \\
  --timeout-in-minutes 30 --concurrent-build-limit 3

# Tail the last build's logs
BUILD_ID=$(aws codebuild list-builds-for-project --project-name orders-api-build --max-items 1 --query 'ids[0]' --output text)
aws codebuild batch-get-builds --ids $BUILD_ID --query 'builds[0].{status:buildStatus,phase:currentPhase,logs:logs.deepLink}'`,
          ],
          questions: [
            {
              question: "What is a buildspec and what are its main sections?",
              solution: "<p>A buildspec is the YAML file (usually <code>buildspec.yml</code> in the repository root) that tells CodeBuild what to run. Its main sections are <strong>env</strong> (variables, Parameter Store and Secrets Manager references), <strong>phases</strong> (<code>install</code>, <code>pre_build</code>, <code>build</code>, <code>post_build</code>, each a list of shell commands), <strong>reports</strong> (test and coverage report locations and formats), <strong>artifacts</strong> (files to output to the pipeline or S3) and <strong>cache</strong> (paths to persist between builds). Keeping it in the repo means build changes are code-reviewed with the application.</p>",
            },
            {
              question: "How would you keep secrets and credentials out of your CodeBuild logs and pipeline?",
              solution: "<p>Reference secrets in <code>buildspec.yml</code> via the <code>env.secrets-manager</code> or <code>env.parameter-store</code> sections so CodeBuild injects them at runtime and masks them in logs. Never <code>echo</code> them. Use the CodeBuild service role (and ECR login via <code>get-login-password</code>) instead of static access keys, and use CodeConnections for GitHub rather than personal tokens. Restrict the build project's role to only the secrets and resources it needs, and enable CloudTrail to audit reads.</p>",
            },
            {
              question: "Why does building a Docker image in CodeBuild require privileged mode, and what are the alternatives?",
              solution: "<p>The Docker daemon needs elevated kernel capabilities to manage namespaces, cgroups and overlay filesystems, so running <code>docker build</code> inside the build container requires <strong>privileged mode</strong>, which grants the container those capabilities. Alternatives that avoid a daemon are rootless builders such as <strong>Kaniko</strong> or <strong>BuildKit in rootless mode</strong>, which construct image layers in user space, or pushing image builds to a dedicated builder service. In practice most teams enable privileged mode on a project that only builds trusted code.</p>",
            },
            {
              question: "How do you make CodeBuild builds faster?",
              solution: "<p>Enable <strong>caching</strong>: S3 cache for dependency directories such as <code>node_modules</code> or the Maven repository, and Docker layer caching via <code>buildx --cache-from/--cache-to</code> to ECR. Use a <strong>right-sized compute type</strong> (or Lambda compute for small, fast builds) and ARM where the toolchain allows. Run independent steps as <strong>parallel pipeline actions</strong> or a <strong>batch build</strong>, and avoid reinstalling tools by baking them into a custom build image stored in ECR.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html",
            "https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref.html",
            "https://docs.aws.amazon.com/codebuild/latest/userguide/build-caching.html",
          ],
        },
        {
          topic: "CodeDeploy Strategies",
          tags: ["aws", "codedeploy", "blue-green", "canary", "rollback", "appspec"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  <strong>AWS CodeDeploy</strong> is the release engine: it takes a built artifact and moves traffic to the new version safely, with hooks for validation and <strong>automatic rollback on alarms</strong>. It supports three compute platforms, each with different strategies, and it is the usual deploy action for production stages.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Compute platforms</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>EC2 / on-premises:</strong> An agent on each instance runs lifecycle hooks from <code>appspec.yml</code> (BeforeInstall, AfterInstall, ApplicationStart, ValidateService). Strategies: <strong>in-place</strong> (update instances in batches: one at a time, half at a time, all at once) or <strong>blue/green</strong> (provision a new Auto Scaling Group, reroute the load balancer, terminate the old).</li>
  <li><strong>ECS:</strong> <strong>Blue/green</strong> only. A second task set is registered with a second target group; a test listener can validate it; traffic then shifts <strong>all at once</strong>, <strong>canary</strong> (for example 10% then 100% after 5 minutes) or <strong>linear</strong> (10% every minute). Hooks are Lambda functions (BeforeInstall, AfterInstall, AfterAllowTestTraffic, BeforeAllowTraffic, AfterAllowTraffic).</li>
  <li><strong>Lambda:</strong> Shifts an <strong>alias</strong> between two published versions with <strong>canary</strong>, <strong>linear</strong> or all-at-once configurations; hooks are BeforeAllowTraffic and AfterAllowTraffic Lambdas.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Deployment configurations</h4>
<pre><code class="language-text">CodeDeployDefault.ECSCanary10Percent5Minutes     10% -> wait 5 min -> 100%
CodeDeployDefault.ECSLinear10PercentEvery1Minutes 10% more every minute
CodeDeployDefault.LambdaCanary10Percent10Minutes  alias 10% -> 100% after 10 min
CodeDeployDefault.OneAtATime                      EC2 in-place, one instance per batch</code></pre>
<p style="line-height: 1.75;">Custom configurations let you choose any percentages and intervals, and for EC2 the minimum healthy hosts.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Automatic rollback</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Roll back when the <strong>deployment fails</strong> (a hook returns failure, health checks fail) or when any associated <strong>CloudWatch alarm</strong> enters ALARM during the deployment (5xx rate, latency, Lambda errors).</li>
  <li>For ECS and Lambda, rollback is instant: traffic is pointed back at the blue task set or the previous version.</li>
  <li>Blue/green keeps the old environment for a configurable <strong>termination wait</strong>, so manual rollback is also fast.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">appspec files</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>EC2:</strong> <code>files</code> to copy, <code>permissions</code>, and <code>hooks</code> mapping lifecycle events to scripts.</li>
  <li><strong>ECS:</strong> The task definition ARN, container name and port for the target group, and Lambda hooks.</li>
  <li><strong>Lambda:</strong> The function name, current and target versions, and hooks.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Alternatives</h4>
<p style="line-height: 1.75;">ECS has a native <strong>rolling update</strong> with a deployment circuit breaker that does not need CodeDeploy; CloudFormation and CDK deploy infrastructure and can drive CodeDeploy for compute. Choose CodeDeploy when you need canary or linear traffic shifting with alarm-based rollback.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "CodeDeploy moves traffic to a new version safely. On ECS it does blue/green with a second target group and shifts traffic canary or linear style; on Lambda it shifts an alias between versions; on EC2 it runs agent hooks in place or swaps Auto Scaling Groups. I attach CloudWatch alarms so a rise in errors during the shift rolls back automatically, and I use pre-traffic hooks to run smoke tests before any user sees the new version."</div>
</div>`,
          examples: [
            `# appspec.yaml for an ECS blue/green deployment (stored in the build artifact)
version: 0.0
Resources:
  - TargetService:
      Type: AWS::ECS::Service
      Properties:
        TaskDefinition: <TASK_DEFINITION>
        LoadBalancerInfo:
          ContainerName: api
          ContainerPort: 8080
Hooks:
  - AfterAllowTestTraffic: "arn:aws:lambda:us-east-1:123456789012:function:smoke-test-green"

# Deployment group: canary 10% for 5 minutes, rollback on alarm or failure, keep blue for 30 minutes
aws deploy create-deployment-group --application-name orders-api --deployment-group-name prod \\
  --service-role-arn arn:aws:iam::123456789012:role/codedeploy-ecs \\
  --deployment-config-name CodeDeployDefault.ECSCanary10Percent5Minutes \\
  --deployment-style deploymentType=BLUE_GREEN,deploymentOption=WITH_TRAFFIC_CONTROL \\
  --ecs-services clusterName=prod,serviceName=orders-api \\
  --load-balancer-info 'targetGroupPairInfoList=[{targetGroups=[{name=orders-blue},{name=orders-green}],prodTrafficRoute={listenerArns=[<prod-listener-arn>]},testTrafficRoute={listenerArns=[<test-listener-arn>]}}]' \\
  --blue-green-deployment-configuration 'terminateBlueInstancesOnDeploymentSuccess={action=TERMINATE,terminationWaitTimeInMinutes=30},deploymentReadyOption={actionOnTimeout=CONTINUE_DEPLOYMENT}' \\
  --auto-rollback-configuration enabled=true,events=DEPLOYMENT_FAILURE,DEPLOYMENT_STOP_ON_ALARM \\
  --alarm-configuration enabled=true,alarms=[{name=orders-api-5xx-high},{name=orders-api-p99-latency-high}]`,
            `# SAM: Lambda canary with alarm-based rollback and a pre-traffic smoke test
Resources:
  OrdersApiFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: index.handler
      Runtime: nodejs20.x
      AutoPublishAlias: live
      DeploymentPreference:
        Type: Canary10Percent5Minutes
        Alarms:
          - !Ref OrdersApiErrorsAlarm
        Hooks:
          PreTraffic: !Ref SmokeTestFunction
  OrdersApiErrorsAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      Namespace: AWS/Lambda
      MetricName: Errors
      Dimensions: [{ Name: FunctionName, Value: !Ref OrdersApiFunction }, { Name: Resource, Value: !Sub "\${OrdersApiFunction}:live" }]
      Statistic: Sum
      Period: 60
      EvaluationPeriods: 1
      Threshold: 1
      ComparisonOperator: GreaterThanOrEqualToThreshold`,
          ],
          questions: [
            {
              question: "How would you implement a canary deployment for a Lambda-based API in CodePipeline?",
              solution: "<p>Use a <strong>CodeDeploy Lambda deployment</strong> (often via SAM or CDK). Publish a new function version, and CodeDeploy shifts the production <strong>alias</strong> using a configuration such as <code>Canary10Percent5Minutes</code> or <code>Linear10PercentEvery1Minute</code>. Attach <strong>CloudWatch alarms</strong> on error rate and latency; if any alarm fires during the shift, CodeDeploy rolls the alias back automatically. Add <strong>pre- and post-traffic hook</strong> Lambdas for smoke tests. The pipeline stage simply invokes this CodeDeploy deployment after the build.</p>",
            },
            {
              question: "Explain how a CodeDeploy blue/green deployment works on ECS.",
              solution: "<p>CodeDeploy creates a <strong>green task set</strong> running the new task definition and registers it with a <strong>second target group</strong> on the load balancer. An optional <strong>test listener</strong> lets a hook Lambda (AfterAllowTestTraffic) run smoke tests against green with no production traffic. Then the production listener shifts traffic from blue to green <strong>all at once, canary or linearly</strong>. If a hook fails or an alarm fires, traffic reverts to blue instantly. After success, blue is kept for a termination wait period and then removed.</p>",
            },
            {
              question: "What is the difference between in-place and blue/green deployments on EC2?",
              solution: "<p><strong>In-place</strong> stops the application on existing instances in batches (one at a time, half at a time, all at once), installs the new revision via the CodeDeploy agent and restarts it, so capacity is reduced during the deployment and rollback means redeploying the old revision. <strong>Blue/green</strong> provisions a <strong>new set of instances</strong> (usually by copying the Auto Scaling Group), deploys to them, reroutes the load balancer, and terminates the old set after a wait; capacity stays full and rollback is rerouting to the still-running old instances. Blue/green costs double capacity briefly but is safer.</p>",
            },
            {
              question: "How does automatic rollback decide to trigger, and what are its limits?",
              solution: "<p>You enable rollback on <strong>deployment failure</strong> (a lifecycle hook script or Lambda returns failure, instances fail health checks, or the deployment times out) and on <strong>alarm</strong> (any CloudWatch alarm in the deployment group's alarm list enters ALARM while the deployment is in progress). Limits: alarms only protect during the deployment window, so a slow-burning bug that surfaces after completion needs a manual redeploy of the previous revision; alarms must have enough traffic and a short period to fire within a canary interval; and for EC2 in-place, rollback is itself a new deployment that takes time.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html",
            "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html",
            "https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html",
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Advance",
      concepts: [
        {
          topic: "Cross-Account Pipelines & IAM",
          tags: ["aws", "codepipeline", "cross-account", "iam", "kms", "cdk pipelines"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Mature organisations separate <strong>tooling</strong>, <strong>dev</strong>, <strong>staging</strong> and <strong>production</strong> into different AWS accounts. A pipeline that lives in the tooling account and deploys into the others is the standard pattern, and getting its permissions right is a common interview deep-dive.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">The moving parts</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Pipeline service role</strong> (tooling account): orchestrates; needs access to the artifact bucket and KMS key and permission to assume the cross-account action roles.</li>
  <li><strong>Artifact bucket</strong> (tooling account): the bucket policy must allow the target accounts' roles to <code>GetObject</code>; the bucket must use a <strong>customer-managed KMS key</strong> because target accounts cannot decrypt with the default S3 key.</li>
  <li><strong>KMS key</strong> (tooling account): key policy grants <code>Decrypt</code> and <code>GenerateDataKey</code> to the target account roles.</li>
  <li><strong>Cross-account action role</strong> (each target account): trusts the tooling account (or the pipeline role specifically) and holds permissions to deploy: CloudFormation, ECS, Lambda, CodeDeploy, plus read on the artifact bucket and decrypt on the key.</li>
  <li><strong>CloudFormation execution role</strong> (each target account): the role CloudFormation itself assumes to create resources, often broad within the account, scoped by permissions boundaries.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Flow of a cross-account deploy action</h4>
<pre><code class="language-text">Pipeline role (tooling)  --sts:AssumeRole-->  action role (prod)
action role reads artifact from tooling bucket, decrypts with tooling KMS key
action role calls CloudFormation / ECS / CodeDeploy in prod
CloudFormation assumes its execution role (prod) to create resources</code></pre>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Least privilege</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>One role per action type and environment; the pipeline role only orchestrates.</li>
  <li>Scope deploy roles to specific stacks, clusters or functions; use <strong>permissions boundaries</strong> on execution roles.</li>
  <li>Prefer <strong>CodeConnections</strong> over stored Git tokens, and <strong>OIDC</strong> for any external CI that must call into AWS.</li>
  <li>Log everything: CloudTrail in each account captures the assumed-role sessions, with the pipeline execution ID in the session name for traceability.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Promotion and gates</h4>
<p style="line-height: 1.75;"><strong>Build once, promote the same artifact</strong>: the image digest or CloudFormation template built in the Build stage is what reaches production, never rebuilt. Between accounts place automated tests, <strong>manual approval</strong> actions (with SNS notification and an approval URL) and change-management checks (a Lambda action that verifies a ticket). Use <strong>stage-level rollback</strong> and alarms in prod.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">CDK Pipelines</h4>
<p style="line-height: 1.75;"><strong>CDK Pipelines</strong> generates this entire structure: a <strong>self-mutating</strong> CodePipeline that updates itself when the pipeline code changes, cross-account roles created by <code>cdk bootstrap --trust</code>, and stages that deploy CDK stacks per account and region with built-in asset publishing. It is the fastest way to a correct multi-account setup.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "The pipeline lives in a tooling account with an artifact bucket encrypted by a customer-managed KMS key whose policies allow the target accounts. Each deploy action assumes a role in the target account that can read the artifact and run CloudFormation or ECS there. I build once and promote the same artifact through dev, staging and prod with tests and approvals between them, and I let CDK Pipelines generate the roles and trust relationships rather than hand-writing them."</div>
</div>`,
          examples: [
            `# Tooling account: KMS key policy excerpt allowing prod's action role to decrypt artifacts
{
  "Sid": "AllowProdDeployRole",
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::222222222222:role/codepipeline-cross-account-deploy" },
  "Action": ["kms:Decrypt", "kms:DescribeKey", "kms:GenerateDataKey*"],
  "Resource": "*"
}

# Tooling account: artifact bucket policy excerpt
{
  "Effect": "Allow",
  "Principal": { "AWS": "arn:aws:iam::222222222222:role/codepipeline-cross-account-deploy" },
  "Action": ["s3:GetObject", "s3:GetObjectVersion", "s3:GetBucketVersioning"],
  "Resource": ["arn:aws:s3:::tooling-pipeline-artifacts", "arn:aws:s3:::tooling-pipeline-artifacts/*"]
}

# Prod account: trust policy of the cross-account deploy role
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "AWS": "arn:aws:iam::111111111111:role/codepipeline-orders-api" },
    "Action": "sts:AssumeRole"
  }]
}

# Pipeline action in the tooling account that deploys a CloudFormation stack into prod
{
  "name": "DeployProd",
  "actionTypeId": { "category": "Deploy", "owner": "AWS", "provider": "CloudFormation", "version": "1" },
  "roleArn": "arn:aws:iam::222222222222:role/codepipeline-cross-account-deploy",
  "configuration": {
    "ActionMode": "CREATE_UPDATE", "StackName": "orders-api-prod",
    "TemplatePath": "BuildArtifact::template.yaml",
    "RoleArn": "arn:aws:iam::222222222222:role/cloudformation-exec-orders-api",
    "Capabilities": "CAPABILITY_NAMED_IAM"
  },
  "inputArtifacts": [{ "name": "BuildArtifact" }]
}`,
            `// CDK Pipelines: tooling account pipeline deploying to staging and prod accounts
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from "aws-cdk-lib/pipelines";

const pipeline = new CodePipeline(this, "Pipeline", {
  pipelineName: "orders-api",
  crossAccountKeys: true,                       // customer-managed KMS key for artifacts
  synth: new ShellStep("Synth", {
    input: CodePipelineSource.connection("my-org/orders-api", "main", { connectionArn: CONNECTION_ARN }),
    commands: ["npm ci", "npm test", "npx cdk synth"],
  }),
});

pipeline.addStage(new AppStage(this, "Staging", { env: { account: "333333333333", region: "us-east-1" } }), {
  post: [new ShellStep("IntegrationTests", { commands: ["npm run test:integration"] })],
});
pipeline.addStage(new AppStage(this, "Prod", { env: { account: "222222222222", region: "us-east-1" } }), {
  pre: [new ManualApprovalStep("PromoteToProd")],
});

// One-time: cdk bootstrap aws://222222222222/us-east-1 --trust 111111111111 \\
//   --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess`,
          ],
          questions: [
            {
              question: "How do you deploy from one pipeline into multiple AWS accounts (dev, staging, prod)?",
              solution: "<p>Run the pipeline in a <strong>tooling account</strong>. Use an artifact S3 bucket and a <strong>customer-managed KMS key</strong> whose policies allow the target accounts to read. In each target account create a <strong>cross-account role</strong> that the pipeline's action role can assume, with permissions to deploy (CloudFormation, ECS, etc.). Each deploy action specifies that role ARN. CDK Pipelines automates this bootstrap. Promote the same artifact through accounts, with approvals or automated tests between them.</p>",
            },
            {
              question: "Why does a cross-account pipeline need a customer-managed KMS key?",
              solution: "<p>The pipeline encrypts artifacts in its S3 bucket. With the default <strong>AWS-managed S3 key</strong>, only principals in the <strong>same account</strong> can decrypt, because AWS-managed key policies cannot be edited to grant other accounts access. A <strong>customer-managed key</strong> has an editable key policy in which you grant <code>kms:Decrypt</code> and <code>kms:GenerateDataKey</code> to the deploy roles in the target accounts, so those roles can read the artifacts the pipeline produced. The bucket policy must grant the same roles S3 read access as well.</p>",
            },
            {
              question: "What is a self-mutating pipeline in CDK Pipelines?",
              solution: "<p>The pipeline definition is itself CDK code in the repository. After the Synth step, a built-in <strong>UpdatePipeline</strong> stage deploys the pipeline's own CloudFormation stack, so if a commit adds a stage, changes an account or modifies a step, the pipeline <strong>updates itself and restarts</strong> before deploying the application stages. This keeps the pipeline under version control and review like everything else and removes manual console edits, at the cost of a slightly longer run when the pipeline changes.</p>",
            },
            {
              question: "How do you give a manual approval real teeth in a production pipeline?",
              solution: "<p>Configure the <strong>Manual approval action</strong> with an SNS topic that notifies the approvers' channel and an external review URL (the change ticket or the staging environment). Restrict who can approve with an IAM policy on <code>codepipeline:PutApprovalResult</code> scoped to that pipeline and stage, and require MFA. Set the approval timeout (default seven days) so stale executions expire, and pair approval with automated gates: integration tests, security scans and a Lambda action that checks the change ticket state before the approval step is even reached.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html",
            "https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html",
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html",
          ],
        },
        {
          topic: "Execution Modes, Triggers & Pipeline Hygiene",
          tags: ["aws", "codepipeline", "execution modes", "triggers", "monorepo", "best practices"],
          explanation: `<div>
<p style="line-height: 1.75; margin-top: 1.5rem;">
  Once a pipeline works, the interesting problems are about <strong>behaviour under load</strong>: what happens when three commits land in five minutes, how monorepos avoid rebuilding everything, and how you keep a pipeline secure and observable over years.
</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Execution modes</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>SUPERSEDED</strong> (default): If a newer execution reaches a stage where an older one is <strong>waiting</strong> (for example at a manual approval), the older execution is cancelled and the newer proceeds. You always deploy the latest commit, but intermediate commits may never be deployed individually.</li>
  <li><strong>QUEUED</strong> (V2): Executions wait in order at each stage; every commit is processed and deployed one after another. Right for changes that must be applied sequentially, such as database migrations or infrastructure with ordering dependencies.</li>
  <li><strong>PARALLEL</strong> (V2): Executions run simultaneously and independently. Useful for pipelines that build feature branches or pull requests where runs do not share a deployment target.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Triggers (V2)</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li>Filter starts by <strong>branch</strong> (<code>main</code>, <code>release/*</code>), <strong>tag</strong> (<code>v*</code>), <strong>file path</strong> (<code>services/orders/**</code>), and <strong>pull request</strong> events (opened, updated, closed).</li>
  <li><strong>Monorepo pattern:</strong> one pipeline per service, each triggered only when its directory changes, so a docs commit does not rebuild every service.</li>
  <li>Pipeline <strong>variables</strong> (for example <code>DEPLOY_ENV</code> or a version label) can be supplied on manual start and referenced in action configuration.</li>
  <li>Disable the automatic source trigger for release pipelines that should only run when explicitly started.</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Stage conditions and rollback (V2)</h4>
<p style="line-height: 1.75;"><strong>Entry conditions</strong> gate a stage on CloudWatch alarms or Lambda checks (do not deploy while an incident alarm is firing). <strong>Success and failure conditions</strong> run checks after the stage. <strong>Stage-level rollback</strong> redeploys the last successful revision automatically when a stage fails, or manually with one click.</p>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">Hygiene checklist</h4>
<ul style="margin-left: 1.5rem; list-style: disc; line-height: 2;">
  <li><strong>Pipeline as code</strong> (CloudFormation, CDK, Terraform); no console edits.</li>
  <li><strong>Immutable artifacts:</strong> tag images by digest or commit SHA, never redeploy <code>latest</code>.</li>
  <li><strong>Least-privilege roles</strong> per action, secrets only via Secrets Manager or Parameter Store, CodeConnections instead of tokens.</li>
  <li><strong>Notifications:</strong> EventBridge rules to Slack or on-call for failures and approvals; metrics on execution duration and failure rate.</li>
  <li><strong>Artifact lifecycle rules</strong> on the bucket so old artifacts expire.</li>
  <li><strong>Security scanning</strong> as pipeline actions: dependency audit, container image scan (ECR enhanced scanning or Inspector), IaC scan (cfn-nag, Checkov).</li>
</ul>
<h4 style="margin-top: 1.5rem; font-size: 1.25rem; font-weight: 600;">When not to use CodePipeline</h4>
<p style="line-height: 1.75;">Teams already invested in GitHub Actions or GitLab CI often keep CI there and use OIDC-assumed roles to deploy; CodePipeline shines when you want AWS-native approvals, CodeDeploy traffic shifting and cross-account promotion without managing runners.</p>
<div style="margin-top: 1rem; background: #fff7ed; border-left: 4px solid #f97316; padding: 1rem; border-radius: 4px; font-size: 0.9rem;"><strong>🎯 Interview Answer:</strong> "Superseded mode always deploys the newest commit and cancels waiting older ones; queued mode applies every commit in order, which I use for migrations; parallel mode is for independent branch builds. V2 triggers filter on branch, tag and file path so a monorepo only rebuilds what changed, and stage conditions plus automatic rollback protect production. Everything is defined as code with least-privilege roles, immutable artifacts and EventBridge notifications."</div>
</div>`,
          examples: [
            `# Switch a pipeline to QUEUED so every commit (and its migration) is applied in order
aws codepipeline update-pipeline --cli-input-json '{"pipeline": { ... , "executionMode": "QUEUED", "pipelineType": "V2" }}'

# Monorepo trigger: only start when the orders service or shared libs change on main
"triggers": [{
  "providerType": "CodeStarSourceConnection",
  "gitConfiguration": {
    "sourceActionName": "GitHub",
    "push": [{
      "branches": { "includes": ["main"] },
      "filePaths": { "includes": ["services/orders/**", "libs/**"], "excludes": ["**/*.md"] }
    }]
  }
}]

# Start manually with a pipeline variable
aws codepipeline start-pipeline-execution --name orders-api \\
  --variables name=DEPLOY_ENV,value=staging name=VERSION_LABEL,value=hotfix-2026-09-12

# Stage entry condition: do not deploy to prod while the incident alarm is firing
"beforeEntry": {
  "conditions": [{
    "result": "FAIL",
    "rules": [{
      "name": "NoActiveIncident",
      "ruleTypeId": { "category": "Rule", "owner": "AWS", "provider": "CloudWatchAlarm", "version": "1" },
      "configuration": { "AlarmName": "orders-api-incident", "WaitTime": "300" },
      "region": "us-east-1"
    }]
  }]
},
"onFailure": { "result": "ROLLBACK" }`,
            `# EventBridge -> SNS notification for failed executions and pending approvals
aws events put-rule --name codepipeline-attention --event-pattern '{
  "source": ["aws.codepipeline"],
  "detail-type": ["CodePipeline Pipeline Execution State Change", "CodePipeline Action Execution State Change"],
  "detail": { "$or": [ { "state": ["FAILED"] }, { "type": { "provider": ["Manual"] }, "state": ["STARTED"] } ] }
}'
aws events put-targets --rule codepipeline-attention --targets '[{"Id":"slack","Arn":"arn:aws:sns:us-east-1:123456789012:deploys",
  "InputTransformer":{"InputPathsMap":{"p":"$.detail.pipeline","s":"$.detail.state","e":"$.detail.execution-id"},
  "InputTemplate":"\\"Pipeline <p> is <s> (execution <e>)\\""}}]'

# Expire old artifacts after 90 days
aws s3api put-bucket-lifecycle-configuration --bucket orders-api-pipeline-artifacts --lifecycle-configuration '{
  "Rules": [{ "ID": "expire-artifacts", "Status": "Enabled", "Filter": { "Prefix": "" }, "Expiration": { "Days": 90 } }]
}'`,
          ],
          questions: [
            {
              question: "What are pipeline execution modes and why does superseded mode matter?",
              solution: "<p>In <strong>Superseded</strong> mode (the default), if a newer execution reaches a stage where an older one is waiting (for example at a manual approval), the older one is cancelled and the newer proceeds, so you always deploy the latest commit. <strong>Queued</strong> mode processes executions strictly in order, useful when each change must be applied (database migrations). <strong>Parallel</strong> mode lets executions run simultaneously, useful for independent feature branches with V2 trigger filters. Choosing wrongly can either skip a required change or create a backlog of stale deployments.</p>",
            },
            {
              question: "How do you structure CI/CD for a monorepo with several services on CodePipeline?",
              solution: "<p>Create <strong>one V2 pipeline per service</strong>, each with a <strong>trigger filter on the service's file paths</strong> (plus shared libraries) so only affected services build and deploy on a commit. Share a single CodeConnections connection and artifact bucket conventions, and generate the pipelines from one CDK or Terraform module to keep them consistent. For tightly coupled services that must deploy together, use a single pipeline with parallel build actions and a coordinated deploy stage instead.</p>",
            },
            {
              question: "How would you stop a deployment from starting during an active incident?",
              solution: "<p>Use a V2 <strong>stage entry condition</strong> on the production stage with a <strong>CloudWatch alarm rule</strong> bound to the incident or error-rate alarm: if the alarm is in ALARM state the stage does not start (it can wait for a configured time and then fail). Complement it with a <strong>Lambda rule</strong> that checks a deployment freeze flag in Parameter Store or the change calendar in Systems Manager Change Calendar, so operators can freeze deploys during releases or holidays without editing the pipeline.</p>",
            },
            {
              question: "What security controls should every production pipeline have?",
              solution: "<p><strong>Least-privilege IAM</strong> per action with the pipeline role only orchestrating; <strong>no long-lived credentials</strong> (CodeConnections for Git, service roles for AWS, OIDC for external CI); secrets pulled from <strong>Secrets Manager or Parameter Store</strong> at runtime and masked in logs; <strong>KMS-encrypted artifacts</strong> with restrictive bucket and key policies; <strong>scanning actions</strong> for dependencies, container images and infrastructure templates; <strong>manual approval</strong> restricted by IAM for production; and <strong>CloudTrail and EventBridge</strong> notifications so every deployment and approval is auditable and visible.</p>",
            },
          ],
          links: [
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html",
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-filter.html",
            "https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-conditions.html",
          ],
        },
      ],
    },
  ],
};
