import Box from "@mui/material/Box";
import * as React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import {
  BookCheck,
  ArrowRight,
  Menu,
  X,
  BookOpen,
  Star,
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Settings,
} from "lucide-react";
import { useRouter } from "next/router";
import { prepareData } from "@/data/prepareData";
import { motion } from "framer-motion";

export default function Learn({
  topic,
  explanation,
  nextTopic,
  theme,
  category,
}) {
  const router = useRouter();
  const [hydrated, setHydrated] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [allTopics, setAllTopics] = React.useState([]);
  const [topicsPerPage, setTopicsPerPage] = React.useState(8);

  React.useEffect(() => {
    setHydrated(true);

    // Check screen size and set initial sidebar state
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isLarge = width >= 1024; // Desktop
      const isTabletSize = width >= 768 && width < 1024; // iPad range

      setIsLargeScreen(isLarge);
      setIsTablet(isTabletSize);

      // Auto-close sidebar on mobile/small tablets
      if (width < 768 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  React.useEffect(() => {
    if (hydrated) {
      try {
        hljs.highlightAll();
      } catch (error) {
        console.error("Highlight.js error:", error);
      }
    }
  }, [hydrated, explanation]);

  // Load topics for sidebar
  React.useEffect(() => {
    const categoryData = prepareData.find(
      (item) => item.category.toLowerCase() === category?.toLowerCase()
    );

    if (categoryData) {
      const topics = [];
      categoryData.type.forEach((typeItem) => {
        typeItem.concepts.forEach((concept) => {
          topics.push({
            topic: concept.topic,
            label: typeItem.label,
            tags: concept.tags || [],
          });
        });
      });
      setAllTopics(topics);
      const currentIndex = topics.findIndex((t) => t.topic === topic);
      if (currentIndex !== -1) {
        setCurrentPage(Math.floor(currentIndex / topicsPerPage));
      }
    }
  }, [category, topic, topicsPerPage]);

  const totalPages = Math.ceil(allTopics.length / topicsPerPage);
  const startIndex = currentPage * topicsPerPage;
  const currentTopics = allTopics.slice(startIndex, startIndex + topicsPerPage);

  const handleTopicClick = (selectedTopic) => {
    router.push(`/learn/${category}/${selectedTopic}`);
    // Close sidebar on mobile after selection
    if (!isLargeScreen) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    console.log("Closing sidebar");
    setSidebarOpen(false);
  };

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* New Custom Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: theme?.lightColor || "#f3f4f6" }}
                >
                  <BookOpen
                    size={24}
                    style={{ color: theme?.textColor || "#374151" }}
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    Interview Nerd
                  </h1>
                  <p className="text-sm text-gray-500">{category} Learning</p>
                </div>
              </div>

              {/* Breadcrumb */}
              <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <button
                  onClick={() => router.push("/")}
                  className="hover:text-gray-700 transition-colors"
                >
                  <Home size={16} className="inline mr-1" />
                  Home
                </button>
                <span>/</span>
                <button
                  onClick={() => router.push(`/category/${category}`)}
                  className="hover:text-gray-700 transition-colors"
                >
                  {category}
                </button>
                <span>/</span>
                <span className="text-gray-900 font-medium">{topic}</span>
              </nav>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push(`/test/${topic}`)}
                style={{
                  backgroundColor: theme?.themeBgColor,
                  color: theme?.textColor,
                }}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm hover:shadow-md transition-all duration-200"
              >
                <BookCheck size={16} />
                <span>Practice</span>
              </Button>

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

      <div className="relative">
        {/* Sidebar Toggle Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Button clicked, sidebarOpen:", sidebarOpen);
            if (sidebarOpen) {
              closeSidebar();
            } else {
              toggleSidebar();
            }
          }}
          className={`
            fixed z-50 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95
            touch-manipulation
            ${
              sidebarOpen && isLargeScreen
                ? "top-20 left-[280px] sm:left-[320px]"
                : sidebarOpen && isTablet
                ? "top-20 left-[260px] sm:left-[280px]"
                : "left-3 sm:left-4 top-20"
            }
          `}
          style={{
            backgroundColor: theme?.themeBgColor || "#f3f4f6",
            color: theme?.textColor || "#374151",
          }}
        >
          {sidebarOpen ? (
            <X size={18} className="sm:w-5 sm:h-5" />
          ) : (
            <Menu size={18} className="sm:w-5 sm:h-5" />
          )}
        </button>

        {/* Mobile Overlay */}
        {sidebarOpen && !isLargeScreen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Layout Container */}
        <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
          {/* Sidebar */}
          <div
            className={`
              fixed left-0 transform transition-all duration-300 ease-in-out z-40
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
              ${
                isLargeScreen && sidebarOpen
                  ? "block"
                  : isLargeScreen
                  ? "hidden"
                  : ""
              }
              bg-white border-r border-gray-200 shadow-xl
              
              /* Responsive widths */
              w-80 sm:w-72 md:w-80 lg:w-72
              
              /* iPhone specific adjustments */
              ${
                typeof window !== "undefined" && window.innerWidth <= 414
                  ? "w-[85vw] max-w-[300px]"
                  : ""
              }
              
              /* iPad specific adjustments */
              ${isTablet ? "w-80" : ""}
            `}
            style={{
              top: "64px", // Start below header (h-16 = 64px)
              height: "calc(100vh - 64px)", // Full height minus header
            }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6 flex-shrink-0 p-4 sm:p-6 pb-0">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: theme?.lightColor || "#f3f4f6" }}
                >
                  <BookOpen
                    size={20}
                    style={{ color: theme?.textColor || "#374151" }}
                  />
                </div>
                <div>
                  <h3
                    className="font-semibold text-base sm:text-lg"
                    style={{ color: theme?.textColor || "#374151" }}
                  >
                    {category} Topics
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {allTopics.length} topics available
                  </p>
                </div>
              </div>

              {/* Topics List - Scrollable */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                <div className="space-y-2 pb-6">
                  {currentTopics.map((topicItem, index) => {
                    const isActive = topicItem.topic === topic;
                    return (
                      <div
                        key={index}
                        onClick={() => handleTopicClick(topicItem.topic)}
                        className={`
                          p-2.5 sm:p-3 rounded-lg cursor-pointer transition-all duration-200
                          hover:scale-[1.02] hover:shadow-md active:scale-[0.98]
                          ${isActive ? "shadow-md ring-2" : "hover:shadow-sm"}
                          touch-manipulation
                        `}
                        style={{
                          backgroundColor: isActive
                            ? theme?.lightColor || "#f3f4f6"
                            : "#f9fafb",
                          borderColor: isActive
                            ? theme?.themeBgColor || "#e5e7eb"
                            : "transparent",
                          ringColor: isActive
                            ? theme?.themeBgColor || "#e5e7eb"
                            : "transparent",
                        }}
                      >
                        <div className="flex items-start gap-3">
                          {isActive && (
                            <Star
                              size={16}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: theme?.textColor || "#374151" }}
                              fill="currentColor"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-xs sm:text-sm font-medium leading-5 ${
                                isActive ? "font-semibold" : ""
                              }`}
                              style={{
                                color: isActive
                                  ? theme?.textColor || "#374151"
                                  : "#4b5563",
                              }}
                            >
                              {topicItem.topic.length > 35
                                ? `${topicItem.topic.substring(0, 35)}...`
                                : topicItem.topic}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span
                                className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                                style={{
                                  backgroundColor:
                                    theme?.themeBgColor || "#e5e7eb",
                                  color: theme?.textColor || "#374151",
                                }}
                              >
                                {topicItem.label}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex-shrink-0 border-t border-gray-200 pt-3 sm:pt-4 px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(0, currentPage - 1))
                      }
                      disabled={currentPage === 0}
                      className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    <span className="text-xs sm:text-sm text-gray-600">
                      Page {currentPage + 1} of {totalPages}
                    </span>

                    <button
                      onClick={() =>
                        setCurrentPage(
                          Math.min(totalPages - 1, currentPage + 1)
                        )
                      }
                      disabled={currentPage === totalPages - 1}
                      className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  {/* Progress Indicator */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span className="hidden sm:inline">Progress</span>
                      <span className="sm:hidden">Topics</span>
                      <span className="text-xs">
                        {startIndex + 1}-
                        {Math.min(startIndex + topicsPerPage, allTopics.length)}{" "}
                        of {allTopics.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: theme?.themeBgColor || "#e5e7eb",
                          width: `${((currentPage + 1) / totalPages) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div
            className={`
              flex-1 flex justify-center transition-all duration-300
              ${sidebarOpen && isLargeScreen ? "ml-72" : "ml-0"}
            `}
          >
            <div
              // className={`
              //   w-full px-4 sm:px-6 lg:px-8 py-6
              //   ${sidebarOpen && isLargeScreen ? "max-w-4xl" : "max-w-5xl"}
              // `}
              className={`
                w-full 
                px-4 sm:px-6 md:px-8 lg:px-10
                py-6
                ${sidebarOpen && isLargeScreen ? "max-w-4xl" : "max-w-5xl"}
                md:max-w-3xl      // iPad Air (820px ~ md) gets a narrower max width
              `}
            >
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200/50 overflow-hidden mx-auto"
              >
                <div className="p-6 sm:p-8">
                  <h1
                    className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
                    style={{ color: theme.textColor }}
                  >
                    {topic}
                  </h1>

                  {hydrated && explanation ? (
                    <div
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: explanation }}
                    />
                  ) : (
                    <div className="flex items-center justify-center py-16">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                      <p className="ml-3 text-gray-600">Loading content...</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 sm:px-8">
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                    <Button
                      onClick={() => router.push(`/test/${topic}`)}
                      style={{
                        backgroundColor: theme?.themeBgColor,
                        color: theme?.textColor,
                      }}
                      className="text-md w-full py-3 px-6 hover:shadow-md transition-all duration-200"
                    >
                      Practice Questions{" "}
                      <BookCheck size={20} className="ml-2" />
                    </Button>

                    {nextTopic && (
                      <Button
                        onClick={() =>
                          router.push(`/learn/${category}/${nextTopic}`)
                        }
                        variant="outline"
                        className="text-md w-full py-3 px-6 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Next Topic
                        <ArrowRight size={20} className="ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const dbPaths = prepareData.reduce((acc, item) => {
    return [
      ...acc,
      ...item.type.flatMap((typeItem) =>
        typeItem.concepts.map((conceptItem) => ({
          params: { slug: [item.category, conceptItem.topic] },
        }))
      ),
    ];
  }, []);

  const allPaths = [...dbPaths];
  const uniquePaths = allPaths.filter(
    (path, index, self) =>
      index ===
      self.findIndex(
        (p) =>
          p.params.slug[0] === path.params.slug[0] &&
          p.params.slug[1] === path.params.slug[1]
      )
  );

  return {
    paths: uniquePaths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const selected = slug[slug.length - 1];
  let themeColor = {};
  let nextTopic = null;
  let explanation = "";
  let category = "";

  prepareData.forEach((item) => {
    if (item.type) {
      item.type.forEach((typeItem) => {
        typeItem.concepts.forEach((conceptItem, index) => {
          if (conceptItem.topic === selected) {
            console.log("catogory 2", item?.category, selected);
            category = item?.category || selected;
            themeColor = {
              category: item.category,
              themeBgColor: item.themeBgColor,
              textColor: item.textColor,
              topicColor: item.topicColor,
              lightColor: item.lightColor || item.themeBgColor,
            };
            explanation = conceptItem.explanation || "";
            const next = typeItem.concepts[index + 1];
            if (next) {
              nextTopic = next.topic;
            }
          }
        });
      });
    }
  });
  console.log("catogory 3", category);
  return {
    props: {
      topic: selected,
      explanation: explanation || "<p>No explanation available.</p>",
      nextTopic: nextTopic || "",
      theme: themeColor,
      category: category,
    },
  };
}
