import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Code,
  Copy,
  Check,
  Shield,
  Database,
  Zap,
  Server,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { snippetsData } from "@/data/snippetsData";
import { darkenTheme } from "@/lib/themeUtils";
import { useState } from "react";

const iconMap = {
  Shield,
  Database,
  Zap,
  Server,
  Cloud,
  Code,
};

export default function SnippetsPage() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = async (code, index) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(index);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleBackClick = () => {
    if (selectedTopic) {
      setSelectedTopic(null);
    } else {
      router.push("/");
    }
  };

  if (selectedTopic) {
    // Find the selected topic data
    let topicData = null;
    let categoryData = null;

    for (const category of snippetsData) {
      for (const type of category.type) {
        const concept = type.concepts.find((c) => c.topic === selectedTopic);
        if (concept) {
          topicData = concept;
          categoryData = darkenTheme(category);
          break;
        }
      }
      if (topicData) break;
    }

    const iconName = {
      "System Design": "Database",
      "Security": "Shield",
    }[categoryData?.category] || "Code";
    const HeaderIcon = iconMap[iconName] || Code;

    if (!topicData) {
      setSelectedTopic(null);
      return null;
    }
    return (
      <div className="min-h-screen bg-surface">
        {/* Header */}
        <header className="border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push("/")}
                  className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">Interview Nerd</span>
                </button>
                <span className="text-gray-300">/</span>
                <button
                  onClick={() => setSelectedTopic(null)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Code Snippets
                </button>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium">
                  {topicData.title}
                </span>
              </div>
              <button
                onClick={handleBackClick}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg`}
                style={{
                  backgroundColor: categoryData?.lightColor || "#17171a",
                }}
              >
                <HeaderIcon
                  className={`w-6 h-6`}
                  style={{ color: categoryData?.textColor || "#dddde1" }}
                />
              </div>
              <div>
                <h1 className="text-3xl font-light text-gray-900">
                  {topicData.topic}
                </h1>
                <p className="text-gray-600 mt-1">
                  {categoryData?.category || "System Design"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="prose prose-gray max-w-none">
                <div
                  dangerouslySetInnerHTML={{ __html: topicData.explanation }}
                />
              </div>
            </div>
          </motion.div>

          <div className="space-y-12">
            <h2 className="text-2xl font-light text-gray-900">Code Examples</h2>

            {topicData.examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Example {index + 1}
                    </h3>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                      Code
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(example, index)}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {copiedCode === index ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <pre className="bg-neutral-900 text-neutral-100 p-6 rounded-lg overflow-x-auto text-sm leading-relaxed">
                    <code>{example}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>

          {topicData.questions && topicData.questions.length > 0 && (
            <div className="mt-20">
              <h2 className="text-2xl font-light text-gray-900 mb-8">
                Interview Questions
              </h2>
              <div className="space-y-6">
                {topicData.questions.map((q, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-6"
                  >
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      {q.question}
                    </h3>
                    <div className="prose prose-gray max-w-none">
                      <div dangerouslySetInnerHTML={{ __html: q.solution }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/")}
                className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Interview Nerd</span>
              </button>
              <span className="text-gray-300">/</span>
              <span className="text-gray-900 font-medium">Code Snippets</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-6">
            <Code className="w-6 h-6 text-gray-700" />
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">
            Code Snippets
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Practical code examples and implementation patterns for senior-level
            system design interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippetsData.map((category, categoryIndex) =>
            category.type.map((type, typeIndex) =>
              type.concepts.map((concept, conceptIndex) => {
                const overallIndex =
                  categoryIndex * 100 + typeIndex * 10 + conceptIndex;
                const iconName = {
                  "System Design": "Database",
                  "Security": "Shield",
                }[category.category] || "Database";
                const IconComponent = iconMap[iconName];
                return (
                  <motion.div
                    key={concept.topic}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: overallIndex * 0.05 }}
                  >
                    <button
                      onClick={() => setSelectedTopic(concept.topic)}
                      className="w-full text-left group"
                    >
                      <div className="p-8 border border-gray-200 rounded-lg hover:border-gray-300 transition-all duration-200">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg`}
                            style={{ backgroundColor: darkenTheme(category).lightColor }}
                          >
                            <IconComponent
                              className={`w-5 h-5`}
                              style={{ color: darkenTheme(category).textColor }}
                            />
                          </div>
                          <span className="text-sm text-gray-500">
                            {concept.examples.length} examples
                          </span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                          {concept.topic}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {category.category} - {type.label}
                        </p>
                        <div className="mt-4 flex items-center text-gray-700 text-sm font-medium">
                          <span>View examples</span>
                          <svg
                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              }),
            ),
          )}
        </div>
      </main>
    </div>
  );
}
