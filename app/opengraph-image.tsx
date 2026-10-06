import { ImageResponse } from "next/og";

export const alt = "HOWL LAB";
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
        <div style={{ fontSize: 28, color: "#6e6e73" }}>howlslab.com</div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 600,
            color: "#1d1d1f",
            letterSpacing: -2,
            marginTop: 12,
          }}
        >
          HOWL LAB
        </div>
      </div>
    ),
    { ...size },
  );
}
