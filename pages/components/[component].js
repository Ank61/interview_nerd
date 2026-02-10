import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Code,
  Database,
  Cloud,
  Server,
  Shield,
  Zap,
  BookCheck,
  User,
  Settings,
  Home,
  FileCode,
  SquareDashedBottom,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SnippetFolder } from "@mui/icons-material";

// Icon mapping for serializable data
const iconMap = {
  Cloud,
  Server,
  Database,
  Shield,
  Zap,
  Code,
  BookOpen,
  FileCode,
  SquareDashedBottom,
};

// Component data with major topics (serializable)
const componentData = {
  AWS: {
    title: "AWS Questions",
    description:
      "Master Amazon Web Services with comprehensive interview questions covering cloud infrastructure, services, and best practices.",
    iconName: "Cloud",
    color: "bg-orange-50 border-orange-200",
    iconColor: "text-orange-600",
    topics: [
      {
        name: "EC2 & Compute",
        description:
          "Elastic Compute Cloud, instances, auto-scaling, and load balancing",
        questions: 12,
        iconName: "Server",
        color: "bg-orange-100",
      },
      {
        name: "S3 & Storage",
        description:
          "Simple Storage Service, data lifecycle, and storage classes",
        questions: 10,
        iconName: "Database",
        color: "bg-blue-100",
        customLink: "/category/AWS S3",
      },
      {
        name: "Lambda & Serverless",
        description:
          "Function-as-a-Service, event-driven architecture, and serverless patterns",
        questions: 8,
        iconName: "Zap",
        color: "bg-yellow-100",
      },
      {
        name: "VPC & Networking",
        description:
          "Virtual Private Cloud, subnets, security groups, and routing",
        questions: 9,
        iconName: "Shield",
        color: "bg-green-100",
      },
      {
        name: "RDS & Databases",
        description:
          "Relational Database Service, Aurora, and database management",
        questions: 7,
        iconName: "Database",
        color: "bg-purple-100",
      },
      {
        name: "CloudFormation & IaC",
        description:
          "Infrastructure as Code, templates, and automated deployments",
        questions: 6,
        iconName: "Code",
        color: "bg-indigo-100",
      },
    ],
  },
  SystemDesign: {
    title: "System Design",
    description:
      "Learn to design scalable, distributed systems with real-world architecture patterns and best practices.",
    iconName: "Shield",
    color: "bg-purple-50 border-purple-200",
    iconColor: "text-purple-600",
    topics: [
      {
        name: "Design Patterns",
        description:
          "Design patterns, architecture patterns, and best practices",
        questions: 10,
        iconName: "Zap",
        color: "bg-purple-100",
      },
      {
        name: "Distributed Systems",
        description:
          "Microservices, service discovery, and inter-service communication",
        questions: 8,
        iconName: "Server",
        color: "bg-blue-100",
      },
      {
        name: "Database Design",
        description:
          "Sharding, replication, consistency models, and CAP theorem",
        questions: 9,
        iconName: "Database",
        color: "bg-green-100",
      },
      {
        name: "Message Queues",
        description:
          "Event-driven architecture, message brokers, and async processing",
        questions: 6,
        iconName: "Zap",
        color: "bg-yellow-100",
      },
      {
        name: "CDN & Caching",
        description:
          "Content Delivery Networks, caching layers, and performance optimization",
        questions: 5,
        iconName: "Cloud",
        color: "bg-orange-100",
      },
      {
        name: "System Design Snippets",
        description: "Small snippets for system design",
        questions: 6,
        iconName: "SquareDashedBottom",
        color: "bg-blue-100",
      },
    ],
  },
  Database: {
    title: "Database Design",
    description:
      "Master database design principles, optimization strategies, and both SQL and NoSQL solutions.",
    iconName: "Database",
    color: "bg-green-50 border-green-200",
    iconColor: "text-green-600",
    topics: [
      {
        name: "SQL Fundamentals",
        description: "Relational databases, normalization, and ACID properties",
        questions: 12,
        iconName: "Database",
        color: "bg-green-100",
      },
      {
        name: "Indexing & Optimization",
        description:
          "Query optimization, indexing strategies, and performance tuning",
        questions: 10,
        iconName: "Zap",
        color: "bg-blue-100",
      },
      {
        name: "NoSQL Databases",
        description: "MongoDB, Redis, Cassandra, and document/column stores",
        questions: 8,
        iconName: "Server",
        color: "bg-purple-100",
      },
      {
        name: "Data Modeling",
        description:
          "Entity relationships, schema design, and data architecture",
        questions: 7,
        iconName: "BookOpen",
        color: "bg-yellow-100",
      },
      {
        name: "Transactions & Concurrency",
        description:
          "ACID properties, isolation levels, and concurrent access patterns",
        questions: 6,
        iconName: "Shield",
        color: "bg-orange-100",
      },
      {
        name: "Data Warehousing",
        description: "OLAP vs OLTP, data lakes, and analytics databases",
        questions: 5,
        iconName: "Cloud",
        color: "bg-indigo-100",
      },
    ],
  },
  DevOps: {
    title: "DevOps & CI/CD",
    description:
      "Learn modern DevOps practices, containerization, and continuous integration/deployment pipelines.",
    iconName: "Server",
    color: "bg-blue-50 border-blue-200",
    iconColor: "text-blue-600",
    topics: [
      {
        name: "Docker & Containers",
        description:
          "Containerization, Dockerfiles, and container orchestration basics",
        questions: 10,
        iconName: "Server",
        color: "bg-blue-100",
      },
      {
        name: "Kubernetes",
        description: "Container orchestration, pods, services, and deployments",
        questions: 8,
        iconName: "Cloud",
        color: "bg-purple-100",
      },
      {
        name: "CI/CD Pipelines",
        description:
          "Jenkins, GitLab CI, GitHub Actions, and automated workflows",
        questions: 9,
        iconName: "Zap",
        color: "bg-green-100",
      },
      {
        name: "Infrastructure as Code",
        description: "Terraform, CloudFormation, and infrastructure automation",
        questions: 6,
        iconName: "Code",
        color: "bg-yellow-100",
      },
      {
        name: "Monitoring & Logging",
        description: "Prometheus, Grafana, ELK stack, and observability",
        questions: 5,
        iconName: "Shield",
        color: "bg-orange-100",
      },
      {
        name: "Security & Compliance",
        description: "DevSecOps, security scanning, and compliance automation",
        questions: 4,
        iconName: "Shield",
        color: "bg-red-100",
      },
    ],
  },
  Snippets: {
    title: "Code Snippets",
    description:
      "Quick reference code examples and implementation patterns for common interview topics and real-world scenarios.",
    iconName: "FileCode",
    color: "bg-indigo-50 border-indigo-200",
    iconColor: "text-indigo-600",
    topics: [
      {
        name: "Authentication",
        description:
          "JWT tokens, OAuth 2.0, session management, and security best practices",
        questions: 8,
        iconName: "Shield",
        color: "bg-blue-100",
      },
      {
        name: "Authorization",
        description:
          "RBAC, ABAC, permission systems, and access control patterns",
        questions: 6,
        iconName: "Shield",
        color: "bg-green-100",
      },
      {
        name: "SQL vs NoSQL",
        description:
          "Database selection criteria, trade-offs, and implementation patterns",
        questions: 10,
        iconName: "Database",
        color: "bg-purple-100",
      },
      {
        name: "Caching Strategies",
        description:
          "Redis, cache-aside patterns, invalidation, and performance optimization",
        questions: 7,
        iconName: "Zap",
        color: "bg-yellow-100",
      },
      {
        name: "API Design",
        description:
          "RESTful APIs, GraphQL, versioning, and documentation best practices",
        questions: 9,
        iconName: "Code",
        color: "bg-indigo-100",
      },
      {
        name: "Microservices",
        description:
          "Service communication, API gateways, and distributed architecture patterns",
        questions: 8,
        iconName: "Server",
        color: "bg-orange-100",
      },
    ],
  },
};

// Static generation functions
export async function getStaticPaths() {
  const components = Object.keys(componentData);

  const paths = components.map((component) => ({
    params: { component },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { component } = params;

  if (!componentData[component]) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      componentData: componentData[component],
      componentName: component,
    },
    revalidate: 3600,
  };
}

export default function ComponentPage({ componentData, componentName }) {
  const router = useRouter();
  const IconComponent = iconMap[componentData.iconName];

  const handleTopicClick = (topic) => {
    if (topic.customLink) {
      router.push(topic.customLink);
    } else {
      // Special routing for Snippets component
      if (componentName === "Snippets") {
        router.push("/snippets");
      } else if (
        componentName === "SystemDesign" &&
        topic.name === "System Design Snippets"
      ) {
        router.push("/snippets");
      } else {
        router.push(
          `/category/${componentName}/${topic.name.replace(/\s+/g, "")}`,
        );
      }
    }
  };

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackClick}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${componentData.color}`}>
                <IconComponent
                  className={`w-6 h-6 ${componentData.iconColor}`}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {componentData.title}
                </h1>
                <p className="text-sm text-gray-600">Major Topics & Concepts</p>
              </div>
            </div>
          </div>
        </div>
      </header> */}

      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "#f3f4f6" }}
                >
                  <BookOpen size={24} style={{ color: "#374151" }} />
                </div>
                <div>
                  <h1 className="hidden lg:block text-xl font-bold text-gray-900">
                    Interview Nerd
                  </h1>
                </div>
              </div>

              {/* Breadcrumb */}
              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-700 transition-colors"
                >
                  {/* <Home size={16} className="inline mr-1" /> */}
                  Home
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {componentData.title}
                </span>
              </nav>
            </div>

            {/* Right side - Actions */}
            {/* <div className="flex items-center space-x-4">
            </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            {componentData.description}
          </p>
        </div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {componentData.topics.map((topic, index) => {
            const TopicIcon = iconMap[topic.iconName];
            return (
              <motion.div
                key={topic.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="h-full cursor-pointer hover:shadow-lg transition-all duration-200 border-0 shadow-sm"
                  onClick={() => handleTopicClick(topic)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-lg ${topic.color}`}>
                        <TopicIcon className="w-5 h-5 text-gray-700" />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {topic.questions} questions
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 mt-3">
                      {topic.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {topic.description}
                    </p>
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Start Learning
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        {/* <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              Component Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {componentData.topics.length}
                </div>
                <div className="text-sm text-gray-600">Major Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {componentData.topics.reduce(
                    (sum, topic) => sum + topic.questions,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(
                    componentData.topics.reduce(
                      (sum, topic) => sum + topic.questions,
                      0
                    ) / componentData.topics.length
                  )}
                </div>
                <div className="text-sm text-gray-600">Avg per Topic</div>
              </div>
            </div>
          </div>
        </div> */}
      </main>
    </div>
  );
}
