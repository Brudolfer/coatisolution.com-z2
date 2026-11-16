import { ImageResponse } from "next/og"

export const alt = "BI-Ratio – Liquidität, Rechnungen und Dashboards"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b1220 0%, #16356a 58%, #0b1220 100%)",
          color: "#f8fafc",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#7dd3fc" }}>
          DATA. SCIENCE. BUSINESS.
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, marginTop: 18 }}>BI-Ratio</div>
        <div style={{ display: "flex", fontSize: 36, marginTop: 16, color: "#dbeafe" }}>
          Liquidität, Rechnungen und Dashboards
        </div>
      </div>
    ),
    size,
  )
}
