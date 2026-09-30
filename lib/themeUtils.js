import { prepareData } from '@/data/prepareData';
import { linuxPrepareData } from '@/data/linuxPrepareData';
import { awsServiceCategories } from '@/data/awsServices';

// ---------------------------------------------------------------------------
// Dark theme adaptation
//
// Topic colors in /data are authored for a light UI (pastel backgrounds with
// deep text). These helpers keep each topic's hue but move backgrounds to
// dark tints and text to light tones so they sit on the dark theme.
// ---------------------------------------------------------------------------

function hexToHsl(hex) {
  let h = String(hex || "").trim().replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (!/^[0-9a-f]{6}$/i.test(h)) return null;
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h2;
  if (max === r) h2 = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h2 = (b - r) / d + 2;
  else h2 = (r - g) / d + 4;
  return [h2 * 60, s, l];
}

function hsl(h, s, l) {
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

/** Dark tinted surface in the color's hue. `depth` is the target lightness. */
export function toDarkSurface(color, depth = 0.11) {
  const c = hexToHsl(color);
  if (!c) return color;
  return hsl(c[0], Math.min(c[1], 0.45), depth);
}

/** Light, readable tone of the color's hue for text on the dark theme. */
export function toLightText(color, minLightness = 0.74) {
  const c = hexToHsl(color);
  if (!c) return color;
  return hsl(c[0], Math.min(c[1], 0.85), Math.max(c[2], minLightness));
}

/** Adapt a raw topic theme ({ themeBgColor, textColor, topicColor, lightColor }). */
export function darkenTheme(theme) {
  if (!theme) return theme;
  return {
    ...theme,
    themeBgColor: toDarkSurface(theme.themeBgColor, 0.14),
    lightColor: toDarkSurface(theme.lightColor || theme.themeBgColor, 0.085),
    textColor: toLightText(theme.textColor),
    topicColor: toLightText(theme.topicColor, 0.68),
  };
}

/**
 * Get theme colors for a specific topic from prepareData
 * @param {string} topic - The topic name (e.g., "Javascript", "React", "linux")
 * @returns {Object} Theme colors object with bg, text, topic, and light properties
 */
export function getThemeColors(topic) {
  // Check main prepareData first
  let topicData = prepareData.find(item => item.category === topic);

  // Fall back to linuxPrepareData for linux topics
  if (!topicData && (topic === 'linux' || topic === linuxPrepareData.category)) {
    topicData = linuxPrepareData;
  }

  // Fall back to the per-service AWS data files
  if (!topicData) {
    topicData = awsServiceCategories.find(item => item.category === topic);
  }
  
  if (!topicData) {
    // Return default colors if topic not found
    return {
      bg: '#17171a',
      text: '#dddde1',
      topic: '#dddde1',
      light: '#111113',
      border: '#303036'
    };
  }

  const dark = darkenTheme(topicData);
  return {
    bg: dark.themeBgColor,
    text: dark.textColor,
    topic: dark.topicColor,
    light: dark.lightColor,
    border: toDarkSurface(topicData.textColor, 0.3) // Dark tone of the text color
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
