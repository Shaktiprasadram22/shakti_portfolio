import { ImageResponse } from "next/og";

export const alt = "Shakti Prasad Ram — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "58px 70px",
          color: "#2b2b2b",
          background: "#f3ece1",
          fontFamily: "sans-serif",
          borderTop: "26px solid #181816",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}>
          <span style={{ fontWeight: 700 }}>SHAKTI PRASAD RAM</span>
          <span style={{ color: "#a73228", fontWeight: 700 }}>SOFTWARE ENGINEER</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, maxWidth: 960, letterSpacing: "-3px" }}>
            Useful software should hold up.
          </div>
          <div style={{ color: "#66645f", fontSize: 28 }}>
            Public products · distributed systems · practical AI
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22 }}>
          <span style={{ width: 16, height: 16, background: "#d4af37", transform: "rotate(45deg)" }} />
          Accenture · Associate Developer · Bhubaneswar
        </div>
      </div>
    ),
    size,
  );
}
