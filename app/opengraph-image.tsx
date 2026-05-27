import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F7F4EE",
          color: "#0B1220",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5B6472",
          }}
        >
          Theotis Mutemi · Legal Practitioners
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            maxWidth: 980,
            color: "#0B1220",
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5B6472",
          }}
        >
          <span>Lusaka, Zambia</span>
          <span style={{ color: "#B08D57" }}>
            theotismutemi.com
          </span>
        </div>
      </div>
    ),
    size,
  );
}
