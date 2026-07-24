import type { Config } from "tailwindcss";
export default {
  content:["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme:{extend:{
    colors:{ink:"#133634",rose:"#dc0d49",paper:"#f8f6fb",lav:"#f0efff",blue:"#dfeefe",mint:"#e9f5ef"},
    fontFamily:{sans:["Arial","Helvetica","sans-serif"]},
    boxShadow:{soft:"0 24px 70px rgba(19,54,52,.12)"}
  }},
  plugins:[]
} satisfies Config;
