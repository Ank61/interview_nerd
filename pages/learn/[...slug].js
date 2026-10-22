// import Box from "@mui/material/Box";
// import * as React from "react";
// import hljs from "highlight.js";
// import "highlight.js/styles/github-dark.css";
// import { Button } from "@/components/ui/button";
// import {
//   BookCheck,
//   ArrowRight,
//   Menu,
//   X,
//   BookOpen,
//   Star,
//   ChevronLeft,
//   ChevronRight,
//   Home,
//   User,
//   Settings,
//   Highlighter,
// } from "lucide-react";
// import { useRouter } from "next/router";
// import { prepareData } from "@/data/prepareData";
// import { darkenTheme } from "@/lib/themeUtils";
// import { linuxPrepareData } from "@/data/linuxPrepareData";
// import { awsServiceCategories } from "@/data/awsServices";
// import { motion } from "framer-motion";
// import { useHighlights } from "@/hooks/useHighlights";
// import HighlightManager from "@/components/learn/HighlightManager";


// export default function Learn({
//   topic,
//   explanation,
//   nextTopic,
//   theme,
//   category,
//   example,
// }) {
//   const router = useRouter();
//   const contentRef = React.useRef(null);
//   const highlightProps = useHighlights(category, topic);

//   const [hydrated, setHydrated] = React.useState(false);

//   const [sidebarOpen, setSidebarOpen] = React.useState(false);
//   const [isLargeScreen, setIsLargeScreen] = React.useState(false);
//   const [isTablet, setIsTablet] = React.useState(false);
//   const [currentPage, setCurrentPage] = React.useState(0);
//   const [allTopics, setAllTopics] = React.useState([]);
//   const [topicsPerPage, setTopicsPerPage] = React.useState(8);

//   React.useEffect(() => {
//     setHydrated(true);

//     // Check screen size and set initial sidebar state
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       const isLarge = width >= 1024; // Desktop
//       const isTabletSize = width >= 768 && width < 1024; // iPad range

//       setIsLargeScreen(isLarge);
//       setIsTablet(isTabletSize);

//       // Calculate topics per page based on available sidebar height
//       const sidebarHeight = height - 64; // Subtract header height (64px)
//       const headerSectionHeight = 100; // Header section with title and close button
//       const paginationSectionHeight = 140; // Pagination and progress section
//       const padding = 32; // Top and bottom padding for topics list

//       const availableHeight =
//         sidebarHeight - headerSectionHeight - paginationSectionHeight - padding;

//       // Topic item height: padding (12px top + 12px bottom) + content height (~46px) = ~70px
//       const topicItemHeight = 70;
//       const maxTopicsFit = Math.max(
//         1,
//         Math.floor(availableHeight / topicItemHeight)
//       );

//       // Set responsive topics per page with height constraints
//       if (width <= 480) {
//         // Mobile
//         setTopicsPerPage(Math.min(4, maxTopicsFit));
//       } else if (width <= 768) {
//         // Large mobile/small tablet
//         setTopicsPerPage(Math.min(5, maxTopicsFit));
//       } else if (width <= 820) {
//         // iPad Air Portrait
//         setTopicsPerPage(Math.min(10, maxTopicsFit));
//       } else if (width <= 834) {
//         // iPad Pro 11 Portrait
//         setTopicsPerPage(Math.min(11, maxTopicsFit));
//       } else if (width <= 1024) {
//         // iPad Pro 12.9 Portrait
//         setTopicsPerPage(Math.min(12, maxTopicsFit));
//       } else if (width <= 1180) {
//         // iPad Air Landscape
//         setTopicsPerPage(Math.min(14, maxTopicsFit));
//       } else if (width <= 1194) {
//         // iPad Pro 11 Landscape
//         setTopicsPerPage(Math.min(15, maxTopicsFit));
//       } else if (width <= 1366) {
//         // iPad Pro 12.9 Landscape
//         setTopicsPerPage(Math.min(16, maxTopicsFit));
//       } else if (width <= 1280) {
//         // Small desktop
//         setTopicsPerPage(Math.min(8, maxTopicsFit));
//       } else {
//         // Large desktop
//         setTopicsPerPage(Math.min(7, maxTopicsFit));
//       }

//       // Auto-close sidebar on mobile/small tablets
//       if (width < 768 && sidebarOpen) {
//         setSidebarOpen(false);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, [sidebarOpen]);

//   React.useEffect(() => {
//     if (hydrated) {
//       try {
//         hljs.highlightAll();
//       } catch (error) {
//         console.error("Highlight.js error:", error);
//       }
//     }
//   }, [hydrated, explanation]);

//   React.useEffect(() => {
//     const categoryData = [...awsServiceCategories, ...prepareData].find(
//       (item) => item.category.toLowerCase() === category?.toLowerCase()
//     );

//     if (categoryData) {
//       const topics = [];
//       categoryData.type.forEach((typeItem) => {
//         typeItem.concepts.forEach((concept) => {
//           topics.push({
//             topic: concept.topic,
//             label: typeItem.label,
//             tags: concept.tags || [],
//           });
//         });
//       });
//       setAllTopics(topics);
//       const currentIndex = topics.findIndex((t) => t.topic === topic);
//       if (currentIndex !== -1) {
//         setCurrentPage(Math.floor(currentIndex / topicsPerPage));
//       }
//     }
//   }, [category, topic, topicsPerPage]);

//   const totalPages = Math.ceil(allTopics.length / topicsPerPage);
//   const startIndex = currentPage * topicsPerPage;
//   const currentTopics = allTopics.slice(startIndex, startIndex + topicsPerPage);

//   const handleTopicClick = (selectedTopic) => {
//     router.push(`/learn/${category}/${encodeURIComponent(selectedTopic)}`);
//     // Close sidebar on mobile after selection
//     if (!isLargeScreen) {
//       setSidebarOpen(false);
//     }
//   };

//   const toggleSidebar = () => {
//     console.log("Toggle sidebar called, current state:", sidebarOpen);
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     console.log("Closing sidebar");
//     setSidebarOpen(false);
//   };

//   React.useEffect(() => {
//     if (sidebarOpen && !isLargeScreen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, [sidebarOpen, isLargeScreen]);

//   if (router.isFallback) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* New Custom Header */}
//       <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-50">
//         <div className="w-full px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             {/* Left side - Logo and Navigation */}
//             <div className="flex items-center space-x-8">
//               <div
//                 className="flex items-center space-x-3 cursor-pointer"
//                 onClick={() => router.push("/")}
//               >
//                 <div
//                   className="p-2 rounded-lg"
//                   style={{ backgroundColor: theme?.lightColor || "#17171a" }}
//                 >
//                   <BookOpen
//                     size={24}
//                     style={{ color: theme?.textColor || "#dddde1" }}
//                   />
//                 </div>
//                 <div>
//                   <h1 className="hidden lg:block text-xl font-bold text-gray-900">
//                     Interview Nerd
//                   </h1>
//                 </div>
//               </div>

//               {/* Breadcrumb */}
//               <nav className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
//                 <button
//                   onClick={() => router.push("/")}
//                   className="hover:text-gray-700 transition-colors"
//                 >
//                   Home
//                 </button>
//                 <span>/</span>
//                 <button
//                   onClick={() => router.push(`/category/${category}`)}
//                   className="hover:text-gray-700 transition-colors"
//                 >
//                   {category[0]?.toUpperCase() + category?.slice(1)}
//                 </button>
//                 <span>/</span>
//                 <span className="text-gray-900 font-medium">{topic}</span>
//               </nav>
//             </div>

//             {/* Right side - Actions */}
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <button
//                 onClick={() => highlightProps.setIsEditMode(!highlightProps.isEditMode)}
//                 className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium ${
//                   highlightProps.isEditMode
//                     ? "bg-brand text-neutral-950 shadow-md ring-2 ring-indigo-300"
//                     : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
//                 }`}
//                 title="Toggle Highlight Pen Mode"
//               >
//                 <Highlighter size={16} />
//                 <span className="hidden sm:inline">
//                   {highlightProps.isEditMode ? "Edit Mode ON" : "Highlight Pen"}
//                 </span>
//               </button>

//               <Button
//                 onClick={() => router.push(`/test/${topic}`)}
//                 style={{
//                   backgroundColor: theme?.themeBgColor,
//                   color: theme?.textColor,
//                 }}
//                 className="hidden sm:flex items-center space-x-2 px-4 py-2 text-sm hover:shadow-md transition-all duration-200"
//               >
//                 <BookCheck size={16} />
//                 <span>Practice</span>
//               </Button>

//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <User size={20} className="text-gray-600" />
//               </button>

//               <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                 <Settings size={20} className="text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="relative">
//         {/* Sidebar Toggle Button - Fixed z-index and improved touch handling */}
//         {!sidebarOpen && (
//           <button
//             onClick={toggleSidebar}
//             onTouchStart={(e) => {
//               // Prevent default to avoid any interference
//               e.preventDefault();
//               console.log("Touch start on menu button");
//             }}
//             onTouchEnd={(e) => {
//               e.preventDefault();
//               e.stopPropagation();
//               console.log("Touch end on menu button, calling toggle");
//               toggleSidebar();
//             }}
//             className="fixed z-[60] p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 touch-manipulation left-4 top-20"
//             style={{
//               backgroundColor: theme?.themeBgColor || "#17171a",
//               color: theme?.textColor || "#dddde1",
//               WebkitTapHighlightColor: "transparent", // Remove tap highlight on iOS
//               userSelect: "none", // Prevent text selection
//             }}
//           >
//             <Menu size={20} />
//           </button>
//         )}

//         {/* Mobile Overlay - Improved z-index */}
//         {sidebarOpen && !isLargeScreen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-[45]"
//             onClick={() => setSidebarOpen(false)}
//             onTouchStart={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Layout Container */}
//         <div className="flex" style={{ minHeight: "calc(100vh - 64px)" }}>
//           {/* Sidebar - Improved z-index and positioning */}
//           <div
//             className={`
//               fixed left-0 top-16 transform transition-all duration-300 ease-in-out z-[50]
//               ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//               ${
//                 isLargeScreen && sidebarOpen
//                   ? "block"
//                   : isLargeScreen
//                   ? "hidden"
//                   : ""
//               }
//               bg-surface border-r border-gray-200 shadow-xl
              
//               /* Responsive widths */
//               w-80 sm:w-80 md:w-80 lg:w-80 xl:w-80
              
//               /* Mobile specific adjustments - Improved for iPhone */
//               ${
//                 typeof window !== "undefined" && window.innerWidth <= 480
//                   ? "w-[85vw] max-w-[320px]"
//                   : ""
//               }
              
//               /* Tablet specific adjustments */
//               ${isTablet ? "w-80" : ""}
//             `}
//             style={{
//               height: "calc(100vh - 64px)", // Full height minus header
//               WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
//             }}
//           >
//             <div className="h-full flex flex-col">
//               {/* Header Section - Fixed height */}
//               <div
//                 className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-100"
//                 style={{ minHeight: "100px" }}
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div className="flex-1 min-w-0">
//                     <h3
//                       className="font-semibold text-base sm:text-lg leading-tight mb-1"
//                       style={{ color: theme?.textColor || "#dddde1" }}
//                     >
//                       {category} Topics
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-500">
//                       {allTopics.length} topics available
//                     </p>
//                   </div>

//                   {/* Close Button - Improved touch handling */}
//                   <button
//                     onClick={closeSidebar}
//                     onTouchStart={(e) => e.preventDefault()}
//                     onTouchEnd={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       closeSidebar();
//                     }}
//                     className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors touch-manipulation"
//                     style={{
//                       color: theme?.textColor || "#dddde1",
//                       WebkitTapHighlightColor: "transparent",
//                       userSelect: "none",
//                     }}
//                   >
//                     <X size={18} className="sm:w-5 sm:h-5" />
//                   </button>
//                 </div>
//               </div>

//               {/* Topics List - Flexible height with exact topic count */}
//               <div className="flex-1 min-h-0 px-4 sm:px-6 py-4 overflow-y-auto">
//                 <div className="h-full">
//                   {currentTopics.length > 0 ? (
//                     <div className="space-y-3">
//                       {currentTopics.map((topicItem, index) => {
//                         const isActive = topicItem.topic === topic;
//                         return (
//                           <div
//                             key={index}
//                             onClick={() => handleTopicClick(topicItem.topic)}
//                             onTouchStart={(e) => e.preventDefault()}
//                             onTouchEnd={(e) => {
//                               e.preventDefault();
//                               e.stopPropagation();
//                               handleTopicClick(topicItem.topic);
//                             }}
//                             className={`
//                               p-3 rounded-lg cursor-pointer transition-all duration-200
//                               hover:scale-[1.02] hover:shadow-md active:scale-[0.98]
//                               ${
//                                 isActive
//                                   ? "shadow-md ring-2"
//                                   : "hover:shadow-sm"
//                               }
//                               touch-manipulation
//                             `}
//                             style={{
//                               backgroundColor: isActive
//                                 ? theme?.lightColor || "#17171a"
//                                 : "#111113",
//                               borderColor: isActive
//                                 ? theme?.themeBgColor || "#232327"
//                                 : "transparent",
//                               ringColor: isActive
//                                 ? theme?.themeBgColor || "#232327"
//                                 : "transparent",
//                               WebkitTapHighlightColor: "transparent",
//                               userSelect: "none",
//                             }}
//                           >
//                             <div className="flex items-start gap-3">
//                               {isActive && (
//                                 <Star
//                                   size={16}
//                                   className="mt-0.5 flex-shrink-0"
//                                   style={{
//                                     color: theme?.textColor || "#dddde1",
//                                   }}
//                                   fill="currentColor"
//                                 />
//                               )}
//                               <div className="flex-1 min-w-0">
//                                 <h4
//                                   className={`text-sm font-medium leading-5 mb-1 ${
//                                     isActive ? "font-semibold" : ""
//                                   }`}
//                                   style={{
//                                     color: isActive
//                                       ? theme?.textColor || "#dddde1"
//                                       : "#4b5563",
//                                   }}
//                                   title={topicItem.topic}
//                                 >
//                                   {topicItem.topic.length > 40
//                                     ? `${topicItem.topic.substring(0, 40)}...`
//                                     : topicItem.topic}
//                                 </h4>
//                                 <div className="flex items-center gap-2">
//                                   <span
//                                     className="text-xs px-2 py-1 rounded-full font-medium"
//                                     style={{
//                                       backgroundColor:
//                                         theme?.themeBgColor || "#232327",
//                                       color: theme?.textColor || "#dddde1",
//                                     }}
//                                   >
//                                     {topicItem.label}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ) : (
//                     <div className="flex items-center justify-center h-32 text-gray-500">
//                       <p className="text-sm">No topics available</p>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Pagination Section - Fixed height */}
//               {totalPages > 1 && (
//                 <div
//                   className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-6"
//                   style={{ minHeight: "140px" }}
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <button
//                       onClick={() =>
//                         setCurrentPage(Math.max(0, currentPage - 1))
//                       }
//                       disabled={currentPage === 0}
//                       className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors touch-manipulation"
//                       style={{
//                         color: theme?.textColor || "#dddde1",
//                         WebkitTapHighlightColor: "transparent",
//                       }}
//                     >
//                       <ChevronLeft size={18} />
//                     </button>

//                     <span className="text-sm text-gray-600 font-medium">
//                       Page {currentPage + 1} of {totalPages}
//                     </span>

//                     <button
//                       onClick={() =>
//                         setCurrentPage(
//                           Math.min(totalPages - 1, currentPage + 1)
//                         )
//                       }
//                       disabled={currentPage === totalPages - 1}
//                       className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors touch-manipulation"
//                       style={{
//                         color: theme?.textColor || "#dddde1",
//                         WebkitTapHighlightColor: "transparent",
//                       }}
//                     >
//                       <ChevronRight size={18} />
//                     </button>
//                   </div>

//                   {/* Progress Indicator */}
//                   <div>
//                     <div className="flex justify-between text-xs text-gray-500 mb-2">
//                       <span>Showing</span>
//                       <span>
//                         {startIndex + 1}-
//                         {Math.min(startIndex + topicsPerPage, allTopics.length)}{" "}
//                         of {allTopics.length}
//                       </span>
//                     </div>
//                     <div className="w-full bg-gray-200 rounded-full h-2">
//                       <div
//                         className="h-2 rounded-full transition-all duration-300"
//                         style={{
//                           backgroundColor: theme?.themeBgColor || "#232327",
//                           width: `${((currentPage + 1) / totalPages) * 100}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Show topics count when no pagination */}
//               {totalPages <= 1 && allTopics.length > 0 && (
//                 <div className="flex-shrink-0 border-t border-gray-100 p-4 sm:p-6">
//                   <div className="text-center">
//                     <span className="text-sm text-gray-500">
//                       Showing all {allTopics.length} topics
//                     </span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="flex-1 overflow-x-hidden">
//             <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6">
//               {/* Highlight Toolbar & Manager */}
//               <HighlightManager containerRef={contentRef} {...highlightProps} />

//               <motion.article
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-surface rounded-xl shadow-sm border border-gray-200/50 overflow-hidden"
//               >
//                 <div className="p-6 sm:p-8" ref={contentRef}>
//                   <h1
//                     className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
//                     style={{ color: theme.textColor }}
//                   >
//                     {topic}
//                   </h1>

//                   {hydrated && explanation ? (
//                     <div
//                       className="prose prose-sm sm:prose-base lg:prose-lg max-w-none w-full prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:overflow-x-auto"
//                       style={{
//                         maxWidth: "100%",
//                         overflowWrap: "break-word",
//                         wordWrap: "break-word",
//                         wordBreak: "break-word",
//                         overflowX: "hidden",
//                       }}
//                       dangerouslySetInnerHTML={{ __html: explanation }}
//                     />
//                   ) : (
//                     <div className="flex items-center justify-center py-16">
//                       <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
//                       <p className="ml-3 text-gray-600">Loading content...</p>
//                     </div>
//                   )}
//                 </div>

//                 {category === "redis" && example?.length > 0 && (
//                   <div className="p-6 sm:p-8">
//                     <h2 className="text-xl font-bold mb-4">Example</h2>
//                     {example.map((item, index) => (
//                       <div
//                         key={index}
//                         className="prose prose-sm sm:prose-base lg:prose-lg max-w-none w-full prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-gray-800 prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200 prose-pre:overflow-x-auto"
//                         style={{
//                           maxWidth: "100%",
//                           overflowWrap: "break-word",
//                           wordWrap: "break-word",
//                           wordBreak: "break-word",
//                           overflowX: "hidden",
//                         }}
//                         dangerouslySetInnerHTML={{ __html: item }}
//                       />
//                     ))}
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="px-6 pb-6 sm:px-8">
//                   <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
//                     <Button
//                       onClick={() => router.push(`/test/${topic}`)}
//                       style={{
//                         backgroundColor: theme?.themeBgColor,
//                         color: theme?.textColor,
//                       }}
//                       className="text-md w-full py-3 px-6 hover:shadow-md transition-all duration-200"
//                     >
//                       Practice Questions{" "}
//                       <BookCheck size={20} className="ml-2" />
//                     </Button>

//                     {nextTopic && (
//                       <Button
//                         onClick={() =>
//                           router.push(`/learn/${category}/${encodeURIComponent(nextTopic)}`)
//                         }
//                         variant="outline"
//                         className="text-md w-full py-3 px-6 border-gray-300 hover:bg-gray-50 transition-colors duration-200"
//                       >
//                         Next Topic
//                         <ArrowRight size={20} className="ml-2" />
//                       </Button>
//                     )}
//                   </div>
//                 </div>
//               </motion.article>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export async function getStaticPaths() {
//   const dbPaths = prepareData.reduce((acc, item) => {
//     // Guard against missing or malformed data
//     if (!item || !item.type) return acc;
//     const paths = item.type.flatMap((typeItem) =>
//       (typeItem.concepts || [])
//         .map((conceptItem) => {
//           const category = item.category || "";
//           const topic = conceptItem && conceptItem.topic ? String(conceptItem.topic) : "";
//           if (!category || !topic) return null;
//           return { params: { slug: [category, encodeURIComponent(topic)] } };
//         })
//         .filter(Boolean)
//     );
//     return [...acc, ...paths];
//   }, []);

//   // Add linux paths from separate data file
//   const linuxPaths = (linuxPrepareData && linuxPrepareData.type)
//     ? linuxPrepareData.type.flatMap((typeItem) =>
//         (typeItem.concepts || [])
//           .map((conceptItem) => {
//             const category = linuxPrepareData.category || "";
//             const topic = conceptItem && conceptItem.topic ? String(conceptItem.topic) : "";
//             if (!category || !topic) return null;
//             return { params: { slug: [category, encodeURIComponent(topic)] } };
//           })
//           .filter(Boolean)
//       )
//     : [];

//   // Add AWS service paths from the per-service data files
//   const awsPaths = awsServiceCategories.flatMap((item) =>
//     (item.type || []).flatMap((typeItem) =>
//       (typeItem.concepts || [])
//         .map((conceptItem) => {
//           const category = item.category || "";
//           const topic = conceptItem && conceptItem.topic ? String(conceptItem.topic) : "";
//           if (!category || !topic) return null;
//           return { params: { slug: [category, encodeURIComponent(topic)] } };
//         })
//         .filter(Boolean)
//     )
//   );

//   const allPaths = [...dbPaths, ...linuxPaths, ...awsPaths];
//   const uniquePaths = allPaths.filter(
//     (path, index, self) =>
//       index ===
//       self.findIndex(
//         (p) =>
//           p.params.slug[0] === path.params.slug[0] &&
//           p.params.slug[1] === path.params.slug[1]
//       )
//   );

//   return {
//     paths: uniquePaths,
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }) {
//   const slug = params.slug;
//   const selected = decodeURIComponent(slug[slug.length - 1]);
//   const categorySlug = slug[0];
//   let themeColor = darkenTheme({});
//   let nextTopic = null;
//   let explanation = "";
//   let category = "";
//   let example = "";

//   // linux and the AWS services live in separate data files; check those first
//   const separateData =
//     categorySlug === "linux"
//       ? linuxPrepareData
//       : awsServiceCategories.find((item) => item.category === categorySlug) ||
//         null;
//   if (separateData) {
//     separateData.type.forEach((typeItem) => {
//       typeItem.concepts.forEach((conceptItem, index) => {
//         if (conceptItem.topic === selected) {
//           category = separateData.category;
//           themeColor = darkenTheme({
//             category: separateData.category,
//             themeBgColor: separateData.themeBgColor,
//             textColor: separateData.textColor,
//             topicColor: separateData.topicColor,
//             lightColor: separateData.lightColor,
//           });
//           explanation = conceptItem.explanation || "";
//           const next = typeItem.concepts[index + 1];
//           if (next) nextTopic = next.topic;
//           example = conceptItem.examples || "";
//         }
//       });
//     });
//   } else {
//     prepareData.forEach((item) => {
//       if (item.type) {
//         item.type.forEach((typeItem) => {
//           typeItem.concepts.forEach((conceptItem, index) => {
//             if (conceptItem.topic === selected) {
//               category = item?.category || selected;
//               themeColor = darkenTheme({
//                 category: item.category,
//                 themeBgColor: item.themeBgColor,
//                 textColor: item.textColor,
//                 topicColor: item.topicColor,
//                 lightColor: item.lightColor || item.themeBgColor,
//               });
//               explanation = conceptItem.explanation || "";
//               const next = typeItem.concepts[index + 1];
//               if (next) nextTopic = next.topic;
//               example = conceptItem.examples || "";
//             }
//           });
//         });
//       }
//     });
//   }

//   return {
//     props: {
//       topic: selected,
//       explanation: explanation || "<p>No explanation available.</p>",
//       nextTopic: nextTopic || "",
//       theme: themeColor,
//       category: category,
//       example,
//     },
//   };
// }

import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  ArrowRight,
  BookCheck,
  Highlighter,
  Menu,
  Search,
  X,
} from "lucide-react";
import { prepareData } from "@/data/prepareData";
import { darkenTheme } from "@/lib/themeUtils";
import { darkenTheme } from "@/lib/themeUtils";
import { linuxPrepareData } from "@/data/linuxPrepareData";
import { awsServiceCategories } from "@/data/awsServices";
import { useHighlights } from "@/hooks/useHighlights";
import HighlightManager from "@/components/learn/HighlightManager";
import {
  PageShell,
  SiteNav,
  SplitTitle,
  Magnetic,
  mono,
  useIsoLayoutEffect,
  usePageMotion,
  useModalBehavior,
} from "@/components/landing/shared";

const proseClasses =
  "rich prose prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none w-full";
const proseStyle = {
  maxWidth: "100%",
  overflowWrap: "break-word",
  wordWrap: "break-word",
  wordBreak: "break-word",
  overflowX: "hidden",
};

export default function Learn({
  topic,
  explanation,
  nextTopic,
  category,
  example,
  sidebarTopics = [],
}) {
  const router = useRouter();
  const rootRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const proseRef = React.useRef(null);
  const sidebarListRef = React.useRef(null);
  const highlightProps = useHighlights(category, topic);

  const [hydrated, setHydrated] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  const categoryLabel = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";
  const encCategory = encodeURIComponent(category || "");

  const currentIndex = sidebarTopics.findIndex((t) => t.topic === topic);
  const currentLabel = sidebarTopics[currentIndex]?.label;

  const visibleTopics = React.useMemo(() => {
    const q = filter.trim().toLowerCase();
    return sidebarTopics
      .map((t, i) => ({ ...t, index: i }))
      .filter((t) => !q || t.topic.toLowerCase().includes(q));
  }, [sidebarTopics, filter]);

  const closeSidebar = React.useCallback(() => setSidebarOpen(false), []);

  // ----- effects ----------------------------------------------------------

  React.useEffect(() => {
    setHydrated(true);
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

  // Escape closes the drawer; page behind stops scrolling while it is open.
  useModalBehavior(sidebarOpen, closeSidebar);

  // Bring the active topic into the middle of the drawer when it opens.
  React.useEffect(() => {
    if (!sidebarOpen) return;
    const list = sidebarListRef.current;
    const active = list?.querySelector("[aria-current='page']");
    if (list && active) {
      list.scrollTop = active.offsetTop - list.clientHeight / 2 + active.clientHeight / 2;
    }
  }, [sidebarOpen]);

  // ----- motion -----------------------------------------------------------

  // Landing-page entrance (hero words + fades). Re-runs for each topic.
  usePageMotion(rootRef, [topic]);

  // Reading progress bar, scrubbed to the page scroll.
  useIsoLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        ".read-progress",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.2 },
        }
      );
    });
    return () => mm.revert();
  }, []);

  // Each block of the explanation rises in as it enters the viewport.
  useIsoLayoutEffect(() => {
    const prose = proseRef.current;
    if (!hydrated || !prose) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const blocks = Array.from(prose.children);
      if (!blocks.length) return;
      gsap.set(blocks, { y: 24, opacity: 0 });
      ScrollTrigger.batch(blocks, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
            clearProps: "transform,opacity",
          }),
      });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  }, [hydrated, explanation]);

  // ----- render -----------------------------------------------------------

  if (router.isFallback) {
    return (
      <PageShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-[#D4FF4F]" />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell ref={rootRef}>
      <Head>
        <title>{`${topic} | Interview Nerd`}</title>
      </Head>

      {/* Reading progress */}
      <div
        aria-hidden="true"
        className="read-progress fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-[#D4FF4F]"
        style={{ transform: "scaleX(0)" }}
      />

      <SiteNav
        crumbs={[
          { label: categoryLabel, href: `/category/${encCategory}` },
          { label: topic },
        ]}
        actions={[
          {
            key: "highlight",
            label: highlightProps.isEditMode ? "Highlighting on" : "Highlight pen",
            icon: Highlighter,
            active: highlightProps.isEditMode,
            onClick: () => highlightProps.setIsEditMode(!highlightProps.isEditMode),
          },
          {
            key: "practice",
            label: "Practice",
            icon: BookCheck,
            href: `/test/${encodeURIComponent(topic)}`,
            primary: true,
          },
        ]}
      />

      {/* ------------------------------------------------------------------ */}
      {/* Topic drawer                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div
        aria-hidden={!sidebarOpen}
        onClick={closeSidebar}
        className={`fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label={`${categoryLabel} topics`}
        // `inert` keeps the closed drawer out of the tab order.
        inert={!sidebarOpen ? "" : undefined}
        className={`fixed inset-y-0 left-0 z-[80] flex w-[88vw] max-w-sm flex-col border-r border-white/10 bg-neutral-950/95 shadow-2xl shadow-black/60 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/[0.08] p-5">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight text-neutral-50">
              {categoryLabel} topics
            </h2>
            <p className={`${mono.className} mt-1 text-xs text-neutral-500`}>
              {sidebarTopics.length} in total
            </p>
          </div>
          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close topics"
            className="shrink-0 rounded-full border border-white/10 p-2 text-neutral-400 transition-colors hover:border-white/30 hover:text-neutral-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-b border-white/[0.08] p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
            <input
              type="search"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter topics"
              aria-label="Filter topics"
              className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-neutral-100 placeholder:text-neutral-600 transition-colors focus:border-[#D4FF4F]/60 focus:outline-none"
            />
          </div>
        </div>

        <ul
          ref={sidebarListRef}
          className="thin-scroll relative flex-1 overflow-y-auto p-3"
        >
          {visibleTopics.length > 0 ? (
            visibleTopics.map((t) => {
              const isActive = t.topic === topic;
              return (
                <li key={`${t.topic}-${t.index}`}>
                  <Link
                    href={`/learn/${encCategory}/${encodeURIComponent(t.topic)}`}
                    prefetch={false}
                    onClick={closeSidebar}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-start gap-3 rounded-xl px-3 py-3 transition-colors ${
                      isActive ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-[#D4FF4F]" />
                    )}
                    <span
                      className={`${mono.className} mt-0.5 w-7 shrink-0 text-xs ${
                        isActive
                          ? "text-[#D4FF4F]"
                          : "text-neutral-600 group-hover:text-neutral-400"
                      }`}
                    >
                      {String(t.index + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-sm leading-snug ${
                          isActive
                            ? "font-semibold text-neutral-50"
                            : "text-neutral-400 group-hover:text-neutral-100"
                        }`}
                      >
                        {t.topic}
                      </span>
                      {t.label && (
                        <span className="mt-1 block text-xs text-neutral-600">
                          {t.label}
                        </span>
                      )}
                    </span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="py-12 text-center text-sm text-neutral-500">
              No topics match “{filter.trim()}”.
            </li>
          )}
        </ul>
      </aside>

      {/* Open-drawer button */}
      {!sidebarOpen && sidebarTopics.length > 0 && (
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="fixed bottom-5 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#D4FF4F] px-4 py-3 text-sm font-semibold text-neutral-950 shadow-lg shadow-black/40 transition-shadow hover:shadow-[0_0_40px_-6px_rgba(212,255,79,0.6)]"
        >
          <Menu className="h-4 w-4" />
          Topics
        </button>
      )}

      <main>
        {/* ------------------------------------------------------------------ */}
        {/* Intro                                                               */}
        {/* ------------------------------------------------------------------ */}
        <section className="relative overflow-hidden pb-8 pt-32 md:pt-40">
          <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
          <div className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6">
            <div className="hero-fade flex flex-wrap items-center gap-3 text-xs text-neutral-400">
              <Link
                href={`/category/${encCategory}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur transition-colors hover:border-white/20 hover:text-neutral-200"
              >
                {categoryLabel}
              </Link>
              {currentLabel && (
                <span className="rounded-full bg-[#D4FF4F] px-3 py-1.5 font-medium text-neutral-950">
                  {currentLabel}
                </span>
              )}
              {currentIndex !== -1 && (
                <span className={mono.className}>
                  {currentIndex + 1} of {sidebarTopics.length}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* Article                                                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="mx-auto w-full max-w-4xl px-4 pb-24 sm:px-6">
          {/* Highlight toolbar & manager */}
          <HighlightManager containerRef={contentRef} {...highlightProps} />

          <article className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            {/* The title stays inside this container: saved highlights are
                positioned relative to it, so its content order must not change. */}
            <div className="p-6 sm:p-10" ref={contentRef}>
              <h1 className="mb-8 text-[clamp(1.75rem,4.2vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-neutral-50">
                <SplitTitle text={topic} />
              </h1>

              {hydrated && explanation ? (
                <div
                  ref={proseRef}
                  className={proseClasses}
                  style={proseStyle}
                  dangerouslySetInnerHTML={{ __html: explanation }}
                />
              ) : (
                <div className="flex items-center justify-center py-16">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#D4FF4F]" />
                  <p className="ml-3 text-neutral-500">Loading content…</p>
                </div>
              )}
            </div>

            {category === "redis" && example?.length > 0 && (
              <div className="border-t border-white/[0.06] p-6 sm:p-10">
                <h2 className="mb-6 text-xl font-semibold tracking-tight text-neutral-50">
                  Example
                </h2>
                {example.map((item, index) => (
                  <div
                    key={index}
                    className={proseClasses}
                    style={proseStyle}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </div>
            )}

            {/* Actions */}
            <div className="border-t border-white/[0.06] px-6 py-6 sm:px-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic>
                  <Link
                    href={`/test/${encodeURIComponent(topic)}`}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4FF4F] px-6 py-3.5 text-sm font-semibold text-neutral-950 transition-shadow hover:shadow-[0_0_40px_-6px_rgba(212,255,79,0.6)] sm:w-auto"
                  >
                    Practice questions
                    <BookCheck className="h-4 w-4" />
                  </Link>
                </Magnetic>

                {nextTopic && (
                  <Link
                    href={`/learn/${encCategory}/${encodeURIComponent(nextTopic)}`}
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-neutral-200 transition-colors hover:border-white/30 hover:bg-white/5"
                  >
                    Next topic
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
    </PageShell>
  );
}

export async function getStaticPaths() {
  const dbPaths = prepareData.reduce((acc, item) => {
    // Guard against missing or malformed data
    if (!item || !item.type) return acc;
    const paths = item.type.flatMap((typeItem) =>
      (typeItem.concepts || [])
        .map((conceptItem) => {
          const category = item.category || "";
          const topic = conceptItem && conceptItem.topic ? String(conceptItem.topic) : "";
          if (!category || !topic) return null;
          return { params: { slug: [category, encodeURIComponent(topic)] } };
        })
        .filter(Boolean)
    );
    return [...acc, ...paths];
  }, []);

  // Add linux paths from separate data file
  const linuxPaths = (linuxPrepareData && linuxPrepareData.type)
    ? linuxPrepareData.type.flatMap((typeItem) =>
        (typeItem.concepts || [])
          .map((conceptItem) => {
            const category = linuxPrepareData.category || "";
            const topic = conceptItem && conceptItem.topic ? String(conceptItem.topic) : "";
            if (!category || !topic) return null;
            return { params: { slug: [category, encodeURIComponent(topic)] } };
          })
          .filter(Boolean)
      )
    : [];

  // Add AWS service paths from the per-service data files
  const awsPaths = awsServiceCategories.flatMap((item) =>
    (item.type || []).flatMap((typeItem) =>
      (typeItem.concepts || [])
        .map((conceptItem) => {
          const category = item.category || "";
          const topic = conceptItem && conceptItem.topic ? String(conceptItem.topic) : "";
          if (!category || !topic) return null;
          return { params: { slug: [category, encodeURIComponent(topic)] } };
        })
        .filter(Boolean)
    )
  );

  const allPaths = [...dbPaths, ...linuxPaths, ...awsPaths];
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
  const selected = decodeURIComponent(slug[slug.length - 1]);
  const categorySlug = slug[0];
  let themeColor = darkenTheme({});
  let themeColor = darkenTheme({});
  let nextTopic = null;
  let explanation = "";
  let category = "";
  let example = "";

  // linux and the AWS services live in separate data files; check those first
  const separateData =
    categorySlug === "linux"
      ? linuxPrepareData
      : awsServiceCategories.find((item) => item.category === categorySlug) ||
        null;
  if (separateData) {
    separateData.type.forEach((typeItem) => {
      typeItem.concepts.forEach((conceptItem, index) => {
        if (conceptItem.topic === selected) {
          category = separateData.category;
          themeColor = darkenTheme({
          themeColor = darkenTheme({
            category: separateData.category,
            themeBgColor: separateData.themeBgColor,
            textColor: separateData.textColor,
            topicColor: separateData.topicColor,
            lightColor: separateData.lightColor,
          });
          });
          explanation = conceptItem.explanation || "";
          const next = typeItem.concepts[index + 1];
          if (next) nextTopic = next.topic;
          example = conceptItem.examples || "";
        }
      });
    });
  } else {
    prepareData.forEach((item) => {
      if (item.type) {
        item.type.forEach((typeItem) => {
          typeItem.concepts.forEach((conceptItem, index) => {
            if (conceptItem.topic === selected) {
              category = item?.category || selected;
              themeColor = darkenTheme({
              themeColor = darkenTheme({
                category: item.category,
                themeBgColor: item.themeBgColor,
                textColor: item.textColor,
                topicColor: item.topicColor,
                lightColor: item.lightColor || item.themeBgColor,
              });
              });
              explanation = conceptItem.explanation || "";
              const next = typeItem.concepts[index + 1];
              if (next) nextTopic = next.topic;
              example = conceptItem.examples || "";
            }
          });
        });
      }
    });
  }

  // Sidebar topic list is built here (server side) so the huge prepareData
  // bundle is not shipped to the browser just to render the drawer.
  const sidebarSource = [
    ...awsServiceCategories,
    ...prepareData,
    linuxPrepareData,
  ].find(
    (item) =>
      item?.category && item.category.toLowerCase() === category.toLowerCase()
  );
  const sidebarTopics = [];
  (sidebarSource?.type || []).forEach((typeItem) => {
    (typeItem.concepts || []).forEach((concept) => {
      sidebarTopics.push({
        topic: String(concept.topic),
        label: typeItem.label || "",
      });
    });
  });

  return {
    props: {
      topic: selected,
      explanation: explanation || "<p>No explanation available.</p>",
      nextTopic: nextTopic || "",
      theme: themeColor,
      category: category,
      example,
      sidebarTopics,
    },
  };
}