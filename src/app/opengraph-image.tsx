import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Approximated from --primary oklch(0.45 0.12 155) — the brand green.
const PRIMARY = "#1f6f4a";
const BG = "#0c100e";
const FG = "#f5f7f6";
const MUTED = "#9aa39e";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${BG} 0%, #0e1612 100%)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          color: FG,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: PRIMARY,
            }}
          />
          <span
            style={{
              fontSize: "22px",
              color: MUTED,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            leonardo.
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "120px",
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: "-0.03em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Leonardo</span>
            <span
              style={{
                background: `linear-gradient(135deg, ${FG} 0%, ${PRIMARY} 100%)`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Balzoni
            </span>
          </div>
          <div style={{ fontSize: "32px", color: MUTED, maxWidth: "900px" }}>
            {siteConfig.description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "22px",
            color: MUTED,
          }}
        >
          <span>Software Engineer</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
