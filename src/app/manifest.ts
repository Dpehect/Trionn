import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "Softbridge Solutions", short_name: "Softbridge", description: "Finland-focused digital product, web and AI agency.", start_url: "/", display: "standalone", background_color: "#f4f5ef", theme_color: "#0c1412", icons: [{ src: "/softbridge-mark.svg", sizes: "any", type: "image/svg+xml" }] };
}
