import Link from "next/link";

export default function CaseNotFound() {
  return (
    <main
      style={{
        minHeight: "100svh",
        display: "grid",
        placeItems: "center",
        padding: "40px",
        background: "#0a0908",
        color: "#eee9df",
        textAlign: "center",
      }}
    >
      <div>
        <p style={{ opacity: 0.55, letterSpacing: "0.14em" }}>
          SOFTBRIDGE SOLUTIONS
        </p>
        <h1 style={{ fontSize: "clamp(48px, 8vw, 120px)", margin: "20px 0" }}>
          Case not found.
        </h1>
        <Link
          href="/#cases"
          style={{
            display: "inline-block",
            paddingBottom: "7px",
            borderBottom: "1px solid currentColor",
          }}
        >
          Return to Selected Cases
        </Link>
      </div>
    </main>
  );
}
