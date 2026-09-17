/**
 * AWS services index.
 *
 * Two exports:
 *  - awsServices: the list rendered on the /aws selection page. Each entry
 *    points at a category slug handled by pages/category/[slug].js.
 *  - awsServiceCategories: the per-service category data objects that live in
 *    data/aws/*.js (kept out of the very large prepareData.js bundle).
 *
 * S3 still has its category inside prepareData.js ("AWS S3"), so its card links
 * there instead of duplicating the content. SQS and SNS now live in
 * data/aws/sqs.js and data/aws/sns.js; the older, much smaller "AWS SQS" entry
 * still in prepareData.js is shadowed, because getStaticProps checks
 * awsServiceCategories first.
 */
import { awsEc2 } from "@/data/aws/ec2";
import { awsIam } from "@/data/aws/iam";
import { awsVpc } from "@/data/aws/vpc";
import { awsLambda } from "@/data/aws/lambda";
import { awsRds } from "@/data/aws/rds";
import { awsElb } from "@/data/aws/elb";
import { awsCloudWatch } from "@/data/aws/cloudwatch";
import { awsRoute53 } from "@/data/aws/route53";
import { awsCloudFront } from "@/data/aws/cloudfront";
import { awsEventBridge } from "@/data/aws/eventbridge";
import { awsSecretsManager } from "@/data/aws/secretsManager";
import { awsEcs } from "@/data/aws/ecs";
import { awsCodePipeline } from "@/data/aws/codepipeline";
import { awsSqs } from "@/data/aws/sqs";
import { awsSns } from "@/data/aws/sns";

export const awsServiceCategories = [
  awsEc2,
  awsIam,
  awsVpc,
  awsLambda,
  awsRds,
  awsElb,
  awsCloudWatch,
  awsRoute53,
  awsCloudFront,
  awsEventBridge,
  awsSecretsManager,
  awsEcs,
  awsCodePipeline,
  awsSqs,
  awsSns,
];

export const awsServices = [
  {
    name: "EC2",
    slug: "AWS ECS",
    group: "Compute",
    icon: "Server",
    description: "Virtual servers: AMIs, instance types, EBS, Auto Scaling and pricing models.",
    color: "#F97316",
    bg: "#FFF4E5",
  },
  {
    name: "S3",
    slug: "AWS S3",
    group: "Storage",
    icon: "HardDrive",
    description: "Object storage with 11 nines durability, storage classes, lifecycle rules and access control.",
    color: "#4A0A14",
    bg: "#FFEAF0",
  },
  {
    name: "IAM",
    slug: "AWS IAM",
    group: "Security",
    icon: "ShieldCheck",
    description: "Identity, roles and policies: who can do what, and how policy evaluation works.",
    color: "#DC2626",
    bg: "#FEE2E2",
  },
  {
    name: "VPC",
    slug: "AWS VPC",
    group: "Networking",
    icon: "Network",
    description: "Networking: subnets, route tables, gateways, security groups and endpoints.",
    color: "#4F46E5",
    bg: "#E0E7FF",
  },
  {
    name: "Lambda",
    slug: "AWS Lambda",
    group: "Compute",
    icon: "Zap",
    description: "Serverless, event-driven compute: invocation models, concurrency and cold starts.",
    color: "#EA580C",
    bg: "#FFEDD5",
  },
  {
    name: "RDS",
    slug: "AWS RDS",
    group: "Database",
    icon: "Database",
    description: "Managed relational databases: Multi-AZ, read replicas, backups and Aurora.",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  {
    name: "ELB",
    slug: "AWS ELB",
    group: "Networking",
    icon: "Scale",
    description: "Load balancing: ALB vs NLB, listeners, target groups and health checks.",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  {
    name: "CloudWatch + CloudTrail",
    slug: "AWS CloudWatch",
    group: "Observability",
    icon: "Activity",
    description: "Metrics, logs and alarms alongside the audit trail of every API call.",
    color: "#DB2777",
    bg: "#FCE7F3",
  },
  {
    name: "Route 53",
    slug: "AWS Route 53",
    group: "Networking",
    icon: "Globe",
    description: "Managed DNS: hosted zones, alias records, routing policies and health checks.",
    color: "#059669",
    bg: "#D1FAE5",
  },
  {
    name: "CloudFront",
    slug: "AWS CloudFront",
    group: "Networking",
    icon: "Cloud",
    description: "Global CDN: cache keys, origin access control, edge functions and signed URLs.",
    color: "#0891B2",
    bg: "#CFFAFE",
  },
  {
    name: "SQS",
    slug: "AWS SQS",
    group: "Messaging",
    icon: "Inbox",
    description: "Managed queues: Standard vs FIFO, visibility timeout and dead-letter queues.",
    color: "#0066CC",
    bg: "#E6F7FF",
  },
  {
    name: "SNS",
    slug: "AWS SNS",
    group: "Messaging",
    icon: "Bell",
    description: "Push-based pub/sub: topics, subscriptions, filter policies and fan-out.",
    color: "#2E7D32",
    bg: "#E8F5E9",
  },
  {
    name: "EventBridge",
    slug: "AWS EventBridge",
    group: "Messaging",
    icon: "Workflow",
    description: "Serverless event bus: rules, targets, Scheduler, archive and replay.",
    color: "#D97706",
    bg: "#FEF3C7",
  },
  {
    name: "Secrets Manager",
    slug: "AWS Secrets Manager",
    group: "Security",
    icon: "KeyRound",
    description: "Encrypted secrets with automatic rotation, versioning and audited access.",
    color: "#9333EA",
    bg: "#F3E8FF",
  },
  {
    name: "ECS / EKS / Fargate",
    slug: "AWS ECS",
    group: "Containers",
    icon: "Container",
    description: "Container orchestration and serverless capacity: tasks, services, pods and roles.",
    color: "#E11D48",
    bg: "#FFE4E6",
  },
  {
    name: "CodePipeline",
    slug: "AWS CodePipeline",
    group: "DevOps",
    icon: "GitBranch",
    description: "CI/CD: stages and actions, CodeBuild, CodeDeploy strategies and cross-account releases.",
    color: "#0284C7",
    bg: "#E0F2FE",
  },
  {
    name: "Cognito",
    slug: "AWS Cognito",
    group: "Security",
    icon: "Users",
    description: "End-user auth: User Pools, Identity Pools, OAuth tokens and Lambda triggers.",
    color: "#65A30D",
    bg: "#ECFCCB",
  },
  {
    name: "Sentry",
    slug: "Sentry",
    group: "Observability",
    icon: "Bug",
    description: "Error tracking and performance monitoring: issues, releases, tracing and alerts.",
    color: "#7E22CE",
    bg: "#E9D5FF",
  },
];
