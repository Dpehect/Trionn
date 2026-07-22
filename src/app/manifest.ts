import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "TRIONN Boutique", short_name: "TRIONN", description: "Independent clothing and footwear objects.", start_url: "/", display: "standalone", background_color: "#f1eee7", theme_color: "#dfff38", icons: [] };
}
