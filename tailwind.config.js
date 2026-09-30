const defaultColors = require("tailwindcss/colors");

// ---------------------------------------------------------------------------
// Dark theme palette
//
// The app was originally written against Tailwind's light palette
// (bg-white, bg-gray-50, text-gray-900, bg-green-50 …). Instead of rewriting
// every class, the palette itself is remapped so those classes render in the
// dark "landing page" theme:
//   - gray / slate / zinc are inverted (gray-50 is near-black, gray-900 is
//     near-white). `neutral` is left untouched for code that is written
//     natively against the dark theme.
//   - Chromatic hues keep their mid tones (400–600) and mirror the extremes,
//     so pastel tints (50–200) become dark tints and deep text tones
//     (700–950) become light tints.
// ---------------------------------------------------------------------------

const BASE = "#0a0a0a";

function mix(hex, into, amount) {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(into.slice(1), 16);
  const ch = (v, s) => (v >> s) & 255;
  const out = [16, 8, 0].map((s) =>
    Math.round(ch(a, s) * amount + ch(b, s) * (1 - amount))
  );
  return `#${out.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

const invertedGray = {
  50: "#0f0f11",
  100: "#17171a",
  200: "#232327",
  300: "#303036",
  400: "#5b5b63",
  500: "#8b8b93",
  600: "#a1a1aa",
  700: "#c4c4cb",
  800: "#dddde1",
  900: "#f1f1f3",
  950: "#fafafa",
};

function darkHue(c) {
  return {
    50: mix(c[500], BASE, 0.08),
    100: mix(c[500], BASE, 0.14),
    200: mix(c[500], BASE, 0.26),
    300: mix(c[500], BASE, 0.42),
    400: c[400],
    500: c[500],
    600: c[600],
    700: c[400],
    800: c[300],
    900: c[200],
    950: c[100],
  };
}

const HUES = [
  "red", "orange", "amber", "yellow", "lime", "green", "emerald", "teal",
  "cyan", "sky", "blue", "indigo", "violet", "purple", "fuchsia", "pink", "rose",
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        gray: invertedGray,
        slate: invertedGray,
        zinc: invertedGray,
        ...Object.fromEntries(HUES.map((h) => [h, darkHue(defaultColors[h])])),
        brand: {
          DEFAULT: "#D4FF4F",
          foreground: "#0a0a0a",
        },
        surface: {
          DEFAULT: "#111113",
          raised: "#17171a",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dynamic theme colors are now handled via inline styles
        // using the getThemeColors utility from @/lib/themeUtils
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
