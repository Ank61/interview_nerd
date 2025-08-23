import { prepareData } from '@/data/prepareData';

/**
 * Get theme colors for a specific topic from prepareData
 * @param {string} topic - The topic name (e.g., "Javascript", "React")
 * @returns {Object} Theme colors object with bg, text, topic, and light properties
 */
export function getThemeColors(topic) {
  const topicData = prepareData.find(item => item.category === topic);
  
  if (!topicData) {
    // Return default colors if topic not found
    return {
      bg: '#f3f4f6',
      text: '#374151',
      topic: '#374151',
      light: '#f9fafb',
      border: '#d1d5db'
    };
  }

  return {
    bg: topicData.themeBgColor,
    text: topicData.textColor,
    topic: topicData.topicColor,
    light: topicData.lightColor,
    border: topicData.textColor // Using textColor as border color
  };
}

/**
 * Generate CSS custom properties for a topic's theme
 * @param {string} topic - The topic name
 * @returns {Object} CSS custom properties object
 */
export function getThemeCSSProperties(topic) {
  const colors = getThemeColors(topic);
  
  return {
    '--theme-bg': colors.bg,
    '--theme-text': colors.text,
    '--theme-topic': colors.topic,
    '--theme-light': colors.light,
    '--theme-border': colors.border
  };
}

/**
 * Get Tailwind class names for a topic's theme
 * @param {string} topic - The topic name
 * @returns {Object} Object with Tailwind class names
 */
export function getThemeClasses(topic) {
  const colors = getThemeColors(topic);
  
  return {
    bgClass: `bg-[${colors.bg}]`,
    textClass: `text-[${colors.text}]`,
    topicClass: `text-[${colors.topic}]`,
    lightClass: `bg-[${colors.light}]`,
    borderClass: `border-[${colors.border}]`,
    hoverBgClass: `hover:bg-[${colors.bg}]`,
    lightBorderClass: `border-[${colors.light}]`
  };
}
