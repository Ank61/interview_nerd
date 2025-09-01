import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, ChevronRight, Menu, X, BookOpen, Star } from 'lucide-react';
import { prepareData } from '@/data/prepareData';

const TopicSidebar = ({ currentTopic, category, theme }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [allTopics, setAllTopics] = useState([]);
  const topicsPerPage = 8;

  useEffect(() => {
    // Find all topics for the current category
    const categoryData = prepareData.find(item => 
      item.category.toLowerCase() === category?.toLowerCase()
    );
    
    if (categoryData) {
      const topics = [];
      categoryData.type.forEach(typeItem => {
        typeItem.concepts.forEach(concept => {
          topics.push({
            topic: concept.topic,
            label: typeItem.label,
            tags: concept.tags || []
          });
        });
      });
      setAllTopics(topics);
      
      // Find current topic page
      const currentIndex = topics.findIndex(t => t.topic === currentTopic);
      if (currentIndex !== -1) {
        setCurrentPage(Math.floor(currentIndex / topicsPerPage));
      }
    }
  }, [category, currentTopic]);

  const totalPages = Math.ceil(allTopics.length / topicsPerPage);
  const startIndex = currentPage * topicsPerPage;
  const currentTopics = allTopics.slice(startIndex, startIndex + topicsPerPage);

  const handleTopicClick = (topic) => {
    router.push(`/learn/${category}/${topic}`);
    setIsOpen(false);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        style={{ 
          backgroundColor: theme?.themeBgColor || '#f3f4f6',
          color: theme?.textColor || '#374151'
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto
        w-80 lg:w-72 xl:w-80
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        bg-white border-r border-gray-200 shadow-lg lg:shadow-none
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme?.lightColor || '#f3f4f6' }}
            >
              <BookOpen 
                size={20} 
                style={{ color: theme?.textColor || '#374151' }}
              />
            </div>
            <div>
              <h3 
                className="font-semibold text-lg"
                style={{ color: theme?.textColor || '#374151' }}
              >
                {category} Topics
              </h3>
              <p className="text-sm text-gray-500">
                {allTopics.length} topics available
              </p>
            </div>
          </div>

          {/* Topics List */}
          <div className="space-y-2 mb-6">
            {currentTopics.map((topicItem, index) => {
              const isActive = topicItem.topic === currentTopic;
              return (
                <div
                  key={index}
                  onClick={() => handleTopicClick(topicItem.topic)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all duration-200
                    hover:scale-[1.02] hover:shadow-md
                    ${isActive 
                      ? 'shadow-md ring-2' 
                      : 'hover:shadow-sm'
                    }
                  `}
                  style={{
                    backgroundColor: isActive 
                      ? theme?.lightColor || '#f3f4f6'
                      : '#f9fafb',
                    borderColor: isActive 
                      ? theme?.themeBgColor || '#e5e7eb'
                      : 'transparent',
                    ringColor: isActive 
                      ? theme?.themeBgColor || '#e5e7eb'
                      : 'transparent'
                  }}
                >
                  <div className="flex items-start gap-3">
                    {isActive && (
                      <Star 
                        size={16} 
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: theme?.textColor || '#374151' }}
                        fill="currentColor"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 
                        className={`text-sm font-medium leading-5 ${
                          isActive ? 'font-semibold' : ''
                        }`}
                        style={{ 
                          color: isActive 
                            ? theme?.textColor || '#374151'
                            : '#4b5563'
                        }}
                      >
                        {topicItem.topic.length > 50 
                          ? `${topicItem.topic.substring(0, 50)}...`
                          : topicItem.topic
                        }
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{
                            backgroundColor: theme?.themeBgColor || '#e5e7eb',
                            color: theme?.textColor || '#374151'
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-105 disabled:hover:scale-100
                `}
                style={{
                  backgroundColor: theme?.lightColor || '#f3f4f6',
                  color: theme?.textColor || '#374151'
                }}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`
                      w-8 h-8 rounded-full text-sm font-medium transition-all duration-200
                      hover:scale-110
                      ${currentPage === i 
                        ? 'shadow-md ring-2' 
                        : 'hover:shadow-sm'
                      }
                    `}
                    style={{
                      backgroundColor: currentPage === i 
                        ? theme?.themeBgColor || '#e5e7eb'
                        : theme?.lightColor || '#f3f4f6',
                      color: theme?.textColor || '#374151',
                      ringColor: currentPage === i 
                        ? theme?.themeBgColor || '#e5e7eb'
                        : 'transparent'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-105 disabled:hover:scale-100
                `}
                style={{
                  backgroundColor: theme?.lightColor || '#f3f4f6',
                  color: theme?.textColor || '#374151'
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Progress</span>
              <span>{startIndex + 1}-{Math.min(startIndex + topicsPerPage, allTopics.length)} of {allTopics.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: theme?.themeBgColor || '#e5e7eb',
                  width: `${((currentPage + 1) / totalPages) * 100}%`
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicSidebar;
