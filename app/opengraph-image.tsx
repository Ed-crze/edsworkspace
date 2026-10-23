import { ImageResponse } from "next/og";

export const alt = "Edwin Safo, Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const bars = Array.from({ length: 120 }, (_, i) => 30 + Math.round(((Math.sin(i * 0.37) + Math.sin(i * 0.11 + 2) + 2) / 4) * 150));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 90px", background: "#f3f2ef", position: "relative", fontFamily: "Georgia, serif" }}>
        <div style={{ display: "flex", width: 90, height: 8, background: "#e3a13a", borderRadius: 4, marginBottom: 36 }} />
        <div style={{ fontSize: 132, color: "#111111", letterSpacing: -4, lineHeight: 1 }}>Edwin Safo</div>
        <div style={{ fontSize: 44, color: "#66645f", marginTop: 24, fontFamily: "Arial, sans-serif" }}>Software Developer</div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 190, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 6, overflow: "hidden" }}>
          {bars.map((h, i) => (
            <div key={i} style={{ width: 2, height: h, background: "#3a3a38", opacity: 0.35 + (h / 180) * 0.6, flexShrink: 0 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
