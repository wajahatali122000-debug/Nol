import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

// One OG image template for every page: /og?title=...

export function GET(req: Request) {
  const title = (new URL(req.url).searchParams.get("title") || SITE_NAME).slice(0, 110);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0b3d4a 0%, #12606f 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#f4b740",
              color: "#0b3d4a",
              fontSize: 44,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            n
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>{SITE_NAME}</div>
        </div>
        <div style={{ fontSize: title.length > 60 ? 58 : 72, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
        <div style={{ fontSize: 26, opacity: 0.8 }}>Independent guide · Dubai nol card</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
