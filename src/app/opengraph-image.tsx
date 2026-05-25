import { ImageResponse } from "next/og";

/* --------------------------------------------------------------------------
   Default Open Graph image for the whole site.
   Next.js detects this file (special name `opengraph-image.tsx`) at the
   app-root segment, runs the default export at build time, and serves the
   resulting PNG at /opengraph-image. The metadata block in layout.tsx
   automatically references it as og:image and twitter:image.

   Sized 1200×630 (the standard 1.91:1 ratio Facebook/LinkedIn/WhatsApp
   render at). Brand palette is forest #0E2F23 + paper #F5F1E8 + fern
   #6B8E5A. Fonts: serif system stack for the headline (closest to our
   Fraunces display face without bundling the .ttf), mono for the eyebrow.
-------------------------------------------------------------------------- */

export const alt =
  "Alpha Waste Management — industry waste turned into revenue";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0E2F23",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          color: "#F5F1E8",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* Top row: brand wordmark */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#6B8E5A",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            A Mangalam Alloys Ltd. (MAL) venture · Ahmedabad
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 42,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#F5F1E8",
              display: "flex",
              alignItems: "baseline",
              gap: 14,
            }}
          >
            <span>Alpha</span>
            <span
              style={{
                fontSize: 18,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#A8B89B",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, monospace",
              }}
            >
              Waste Management
            </span>
          </div>
        </div>

        {/* Big headline — mirrors the homepage hero */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: 96,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
          }}
        >
          <div style={{ color: "#F5F1E8", fontStyle: "normal" }}>
            Industry waste
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
            <span style={{ color: "#6B8E5A", fontStyle: "normal" }}>
              turned into
            </span>
            <span
              style={{
                background: "#4A7C4E",
                color: "#F5F1E8",
                padding: "0 22px",
                borderRadius: 18,
                fontStyle: "normal",
              }}
            >
              revenue.
            </span>
          </div>
        </div>

        {/* Bottom row: tagline + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#A8B89B",
            fontSize: 22,
            fontFamily: "Georgia, 'Times New Roman', serif",
          }}
        >
          <div style={{ maxWidth: 720, lineHeight: 1.4 }}>
            Patented zero-residue valorization for industrial steel waste.
          </div>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#6B8E5A",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, monospace",
            }}
          >
            alphawastemanagement.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
