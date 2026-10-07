import { ImageResponse } from "next/og";

export const alt = "Fitting Lab by HOWLSLAB";
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
          justifyContent: "flex-end",
          background: "#f5f5f7",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#6e6e73" }}>HOWLSLAB</div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 600,
            color: "#1d1d1f",
            letterSpacing: -2,
            marginTop: 12,
          }}
        >
          Fitting Lab
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#6e6e73", marginTop: 16 }}>
          AI virtual try-on for fashion brands
        </div>
      </div>
    ),
    { ...size },
  );
}
