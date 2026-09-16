import { ImageResponse } from "next/og";

export const alt = "YEENKSLUXE campaign";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const hero = "https://yeenksluxe.com/images/ynl-hero-duo.svg";

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-end",
          background: "#0c0c0b",
          display: "flex",
          height: "100%",
          position: "relative",
          width: "100%",
        }}
      >
        <img
          alt=""
          src={hero}
          style={{
            height: "100%",
            inset: 0,
            objectFit: "cover",
            objectPosition: "50% 46%",
            position: "absolute",
            width: "100%",
          }}
        />
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(7,7,6,0.92) 0%, rgba(7,7,6,0.58) 40%, rgba(7,7,6,0.06) 76%)",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            color: "#f7f4ee",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            padding: "0 72px 64px",
            position: "relative",
          }}
        >
          <div style={{ fontFamily: "Arial", fontSize: 23, fontWeight: 700, letterSpacing: 6 }}>
            YEENKSLUXE
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Georgia", fontSize: 76, lineHeight: 0.98 }}>
            <span>Made for the</span>
            <span>everyday statement.</span>
          </div>
          <div style={{ fontFamily: "Arial", fontSize: 20, letterSpacing: 1.5 }}>
            Lagos born streetwear
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
