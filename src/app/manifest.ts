import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "YEG — Creative Developer",
    short_name: "YEG",
    description: "A cinematic creative developer portfolio.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f1ec",
    theme_color: "#f3f1ec",
  };
}
