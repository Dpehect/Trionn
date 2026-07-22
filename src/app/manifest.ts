import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trionn Product Operating System",
    short_name: "Trionn",
    description: "One coherent product system from first signal to final release.",
    start_url: "/",
    display: "standalone",
    background_color: "#f2f1eb",
    theme_color: "#dfff38",
  };
}
