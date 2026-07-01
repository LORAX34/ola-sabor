import animations from "@midudev/tailwind-animations";

export default {
  darkMode: "class",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: {
            DEFAULT: "#1A1A1A",
            50: "#f5f5f5",
            100: "#e6e6e6",
            200: "#cccccc",
            300: "#999999",
            400: "#666666",
            500: "#333333",
            600: "#262626",
            700: "#1a1a1a",
            800: "#0f0f0f",
            900: "#050505",
          },
          gold: {
            DEFAULT: "#C9A84C",
            50: "#fbf7e8",
            100: "#f5edc5",
            200: "#edd98e",
            300: "#e3c45a",
            400: "#d4af37",
            500: "#c9a84c",
            600: "#b8942e",
            700: "#9a7a25",
            800: "#7d621e",
            900: "#5e4816",
          },
          green: {
            DEFAULT: "#4A7C3F",
            50: "#f0f5ed",
            100: "#d9e8d3",
            200: "#b3d1a8",
            300: "#8dba7d",
            400: "#6ba354",
            500: "#4a7c3f",
            600: "#3d6934",
            700: "#2d5a27",
            800: "#1e3d1a",
            900: "#0f200d",
          },
        },
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        name: ["Playfair Display", "serif"],
        desc: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "wave-pattern": "url(\"data:image/svg+xml,%3Csvg width='120' height='20' viewBox='0 0 120 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 15 0 30 10 T 60 10 T 90 10 T 120 10' stroke='%23C9A84C' stroke-width='0.5' fill='none' opacity='0.15'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [animations],
};
