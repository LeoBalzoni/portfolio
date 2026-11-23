import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = siteConfig.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f3f4ee";
const INK = "#1b1c1a";
const LAKE = "#cde2ef";
const ROUTE = "#d3301f";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 150,
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
            }}
          >
            <span>Leonardo</span>
            <span>Balzoni</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 36, fontSize: 34 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                border: `8px solid ${ROUTE}`,
                background: "#fff",
                marginRight: 20,
              }}
            />
            Software engineer in Lausanne. Writing and work, drawn as a map.
          </div>
        </div>
        <div
          style={{
            height: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 72px",
            background: LAKE,
            borderTop: "3px solid #3f7fa8",
            color: "#1c577c",
            fontSize: 26,
          }}
        >
          <span style={{ letterSpacing: "0.5em", fontStyle: "italic" }}>LAC LÉMAN</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
