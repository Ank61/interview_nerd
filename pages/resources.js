import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/router";
import {
  FileText,
  Terminal,
  Code2,
  Database,
  Cpu,
  GitBranch,
  Server,
  Cloud,
  Lock,
  Network,
  ArrowRight,
  BookOpen,
  User,

  Settings,
} from "lucide-react";

export default function Resources() {
  const router = useRouter();

  const resources = [
    {
      title: "Linux Fundamentals",
      description:
        "Essential Linux commands and concepts for developers and system administrators.",
      icon: <Terminal className="w-6 h-6 text-blue-600" />,
      color: "blue",
      slug: "linux-fundamentals",
    },
    {
      title: "Docker Cheat Sheet",
      description:
        "Quick reference for the most common Docker commands and best practices.",
      icon: <Cpu className="w-6 h-6 text-emerald-600" />,
      color: "emerald",
      slug: "docker-cheat-sheet",
    },
    {
      title: "Git Commands",
      description:
        "Comprehensive list of Git commands for version control workflow.",
      icon: <GitBranch className="w-6 h-6 text-orange-600" />,
      color: "orange",
      slug: "git-commands",
    },
    {
      title: "AWS CLI Reference",
      description:
        "Essential AWS CLI commands for cloud infrastructure management.",
      icon: <Cloud className="w-6 h-6 text-amber-600" />,
      color: "amber",
      slug: "aws-cli-reference",
    },
    {
      title: "REST API Best Practices",
      description: "Guidelines and patterns for designing RESTful APIs.",
      icon: <Server className="w-6 h-6 text-purple-600" />,
      color: "purple",
      slug: "rest-api-best-practices",
    },
    {
      title: "Security Guidelines",
      description: "Web application security best practices and OWASP top 10.",
      icon: <Lock className="w-6 h-6 text-red-600" />,
      color: "red",
      slug: "security-guidelines",
    },
    {
      title: "System Design Primer",
      description: "Key concepts and patterns for system design interviews.",
      icon: <Network className="w-6 h-6 text-green-600" />,
      color: "green",
      slug: "system-design-primer",
    },
    {
      title: "SQL Query Patterns",
      description: "Common SQL patterns and optimization techniques.",
      icon: <Database className="w-6 h-6 text-indigo-600" />,
      color: "indigo",
      slug: "sql-query-patterns",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header matching category page style */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => router.push("/")}
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  <BookOpen size={24} className="text-gray-700" />
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
                  Home
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">Resources</span>
              </nav>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <User size={20} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white pt-16 pb-12 sm:pt-20 sm:pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Developer Resources
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Curated collection of cheatsheets, guides, and references to boost
              your development workflow.
            </p>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resources.map((resource, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-blue-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-${resource.color}-50`}>
                        {resource.icon}
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {resource.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      {resource.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors"
                      onClick={() => router.push(`/resources/${resource.slug}`)}
                    >
                      View Resource
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </div>
  );
}
