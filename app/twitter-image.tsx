import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "SoftBridge Solutions — software and AI development in Finland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px",
          color: "white",
          background:
            "radial-gradient(circle at 80% 10%, #51319f 0%, transparent 38%), radial-gradient(circle at 10% 90%, #164c60 0%, transparent 34%), #050505",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3 }}>
          SOFTBRIDGE SOLUTIONS · FINLAND
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 82, lineHeight: 1 }}>
            Software, AI and digital products.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#c8c8c8" }}>
            Custom software development for Finland, the Nordics and Europe.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
