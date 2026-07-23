import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F1EA",
        paper: "#FBFAF6",
        ink: "#161713",
        muted: "#62645D",
        line: "#D8D4CA",
        violet: "#7057D9",
        lime: "#C8E85B"
      },
      fontFamily: {
        sans: ["var(--font-geist)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-manrope)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        quiet: "0 24px 80px rgba(22,23,19,.08)"
      }
    }
  },
  plugins: []
};
export default config;
