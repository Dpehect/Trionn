import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aura: {
          paper: "#f3efe8",
          ink: "#11100f",
          acid: "#d7ff46",
          clay: "#9e6a4e",
          olive: "#586043"
        }
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      }
    },
  },
  plugins: [],
};

export default config;
