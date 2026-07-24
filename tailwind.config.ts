import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: "#062a1f",
        lime: "#d8ff4f",
        cream: "#f3f1eb",
        lavender: "#e5e1ed",
        coral: "#d85a43",
        ochre: "#8b7442",
        mint: "#c9ddd0",
        sky: "#dbe4e8",
        ink: "#0a2018",
      },
      borderRadius: {
        mega: "2.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
