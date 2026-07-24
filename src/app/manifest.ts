import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Softbridge",
    short_name: "Softbridge",
    description: "Senior product engineering from Helsinki and Türkiye.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f0e6",
    theme_color: "#062a1f",
    icons: [{ src: "/logo-mark.svg", sizes: "128x128", type: "image/svg+xml" }],
  };
}
