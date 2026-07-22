import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#080908",
        color: "#eeeade",
        padding: "64px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 34,
          fontWeight: 700,
        }}
      >
        ATELIER/X
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 112,
          lineHeight: 0.82,
          fontWeight: 700,
          letterSpacing: "-7px",
        }}
      >
        <div style={{ display: "flex" }}>DIGITAL</div>
        <div style={{ display: "flex", color: "#d8ff61" }}>
          FEELS ALIVE.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 20,
          color: "#aaa69b",
        }}
      >
        Strategy · Motion · Creative Technology
      </div>
    </div>,
    size
  );
}
