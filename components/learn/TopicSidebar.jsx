import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  BookOpen,
  Star,
} from "lucide-react";
import { prepareData } from "@/data/prepareData";

const TopicSidebar = ({ currentTopic, category, theme }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [allTopics, setAllTopics] = useState([]);
  const [topicsPerPage, setTopicsPerPage] = useState(11);
  const [maxVisible, setMaxVisible] = useState(5);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Set initial state based on screen size and available height
    const updateResponsiveSettings = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Calculate available height for topics
      // Header: ~80px, Footer (pagination + progress): ~120px, Padding: ~40px
      const headerHeight = 80;
      const footerHeight = 120; // Pagination + progress indicator
      const paddingHeight = 40; // Top and bottom padding
      const availableHeight = Math.max(200, height - headerHeight - footerHeight - paddingHeight);
      const topicItemHeight = 70; // Approximate height per topic item
      const maxTopicsFit = Math.max(1, Math.floor(availableHeight / topicItemHeight));

      if (width <= 414) {
        // iPhone (including iPhone 14 Pro Max)
        setMaxVisible(3);
        setTopicsPerPage(Math.min(4, maxTopicsFit));
        setIsOpen(false);
      } else if (width <= 768) {
        // iPad Mini and smaller tablets
        setMaxVisible(4);
        setTopicsPerPage(Math.min(6, maxTopicsFit));
        setIsOpen(false);
      } else if (width <= 1024) {
        // iPad Air/Pro portrait
        setMaxVisible(4);
        setTopicsPerPage(Math.min(8, maxTopicsFit));
        setIsOpen(false);
      } else if (width < 1280) {
        // Laptop
        setMaxVisible(5);
        setTopicsPerPage(Math.min(10, maxTopicsFit));
        setIsOpen(true); // Default open on laptop
      } else {
        // Desktop
        setMaxVisible(6);
        setTopicsPerPage(Math.min(12, maxTopicsFit));
        setIsOpen(true); // Default open on desktop
      }
    };

    updateResponsiveSettings();
    window.addEventListener("resize", updateResponsiveSettings);
    return () => window.removeEventListener("resize", updateResponsiveSettings);
  }, []);

  useEffect(() => {
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
      const currentIndex = topics.findIndex((t) => t.topic === currentTopic);
      if (currentIndex !== -1) {
        setCurrentPage(Math.floor(currentIndex / topicsPerPage));
      }
    }
  }, [category, currentTopic, topicsPerPage]);

  const totalPages = Math.ceil(allTopics.length / topicsPerPage);
  const startIndex = currentPage * topicsPerPage;
  const currentTopics = allTopics.slice(startIndex, startIndex + topicsPerPage);

  const handleTopicClick = (topic) => {
    router.push(`/learn/${category}/${topic}`);
    // Close sidebar on mobile/tablet after selection
    if (window.innerWidth <= 1024) {
      setIsOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(0);

      let half = Math.floor((maxVisible - 2) / 2);
      let start = Math.max(currentPage - half, 1);
      let end = Math.min(currentPage + half, totalPages - 2);

      if (start > 1) pages.push("...");
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < totalPages - 2) pages.push("...");
      pages.push(totalPages - 1);
    }

    return pages;
  };

  // Don't render until mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  const isLargeScreen = typeof window !== 'undefined' && window.innerWidth >= 1024;

  return (
    <>
      {/* Toggle Button - Outside sidebar when closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed z-50 p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation left-3 sm:left-4 top-20"
          style={{
            backgroundColor: theme?.themeBgColor || "#f3f4f6",
            color: theme?.textColor || "#374151",
          }}
        >
          <Menu size={18} className="sm:w-5 sm:h-5" />
        </button>
      )}

      {/* Overlay for mobile and tablet only */}
      {isOpen && !isLargeScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          ${isLargeScreen ? 'sticky' : 'fixed'} top-0 left-0 
          ${isLargeScreen ? 'h-[calc(100vh-80px)]' : 'h-screen'}
          transform transition-all duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          bg-white border-r border-gray-200 shadow-xl
          
          /* Responsive widths for different devices */
          w-[85vw] max-w-[300px]
          sm:w-72 sm:max-w-none
          md:w-80 
          lg:w-72 
          xl:w-80
        `}
        style={{
          paddingTop: isLargeScreen ? '20px' : '80px',
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 p-4 sm:p-6 pb-4 flex-shrink-0">
            <div className="flex items-center gap-2 sm:gap-3">
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

            {/* Close Button - Inside sidebar */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              style={{
                color: theme?.textColor || "#374151",
              }}
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Topics List - No scrolling, fit within available space */}
          <div className="flex-1 px-4 sm:px-6">
            <div className="space-y-1.5 sm:space-y-2">
              {currentTopics.map((topicItem, index) => {
                const isActive = topicItem.topic === currentTopic;
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
                          className={`text-xs sm:text-sm font-medium leading-5 ${isActive ? "font-semibold" : ""
                            }`}
                          style={{
                            color: isActive
                              ? theme?.textColor || "#374151"
                              : "#4b5563",
                          }}
                        >
                          {topicItem.topic.length > (window.innerWidth <= 414 ? 25 : 40)
                            ? `${topicItem.topic.substring(0, window.innerWidth <= 414 ? 25 : 40)}...`
                            : topicItem.topic}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full"
                            style={{
                              backgroundColor: theme?.themeBgColor || "#e5e7eb",
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

          {/* Fixed bottom section */}
          <div className="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 pt-3 sm:pt-4">
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                {renderPageNumbers().map((p, idx) =>
                  p === "..." ? (
                    <span key={idx} className="px-2 text-gray-500 text-sm">
                      ...
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`
                        w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
                        hover:scale-110 active:scale-95 touch-manipulation
                        ${currentPage === p ? "shadow-md ring-2" : "hover:shadow-sm"}
                      `}
                      style={{
                        backgroundColor:
                          currentPage === p
                            ? theme?.themeBgColor || "#e5e7eb"
                            : theme?.lightColor || "#f3f4f6",
                        color: theme?.textColor || "#374151",
                        ringColor:
                          currentPage === p
                            ? theme?.themeBgColor || "#e5e7eb"
                            : "transparent",
                      }}
                    >
                      {p + 1}
                    </button>
                  )
                )}
              </div>
            )}

            {/* Progress Indicator */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <span className="hidden sm:inline">Progress</span>
                <span className="sm:hidden">Topics</span>
                <span className="text-xs">
                  {startIndex + 1}-
                  {Math.min(startIndex + topicsPerPage, allTopics.length)} of{" "}
                  {allTopics.length}
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
        </div>
      </div>
    </>
  );
};

export default TopicSidebar;
