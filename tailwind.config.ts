import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ugc: {
          green: "#00a85a",
          dark: "#04100b",
          panel: "#0b0f0d",
          line: "#24342c",
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(0, 168, 90, 0.18)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
