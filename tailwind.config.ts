import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: "#062a1f",
        lime: "#dfff3f",
        cream: "#f4f0e6",
        lavender: "#efe9ff",
        coral: "#f0442e",
        ochre: "#9d7a1e",
        mint: "#c9f7d5",
        sky: "#dbeeff",
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
