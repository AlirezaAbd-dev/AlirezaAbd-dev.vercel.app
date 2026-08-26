import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #18181b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #18181b 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "#ffffff",
          padding: "60px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow Spheres */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "rgba(16, 185, 129, 0.25)",
            borderRadius: "9999px",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            background: "rgba(139, 92, 246, 0.25)",
            borderRadius: "9999px",
            filter: "blur(120px)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: "9999px",
            padding: "8px 24px",
            color: "#10b981",
            fontSize: 20,
            fontWeight: 800,
            marginBottom: 24,
          }}
        >
          <span>🚀 Featured Engineering Projects</span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            textAlign: "center",
            letterSpacing: "-0.02em",
            backgroundImage: "linear-gradient(to right, #ffffff, #a1a1aa)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Portfolio & Projects — Alireza Abedi
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 24,
            color: "#a1a1aa",
            textAlign: "center",
            maxWidth: 900,
            marginBottom: 36,
            lineHeight: 1.4,
          }}
        >
          Frontend Team Lead & Full-Stack Engineer • Next.js, React, NestJS, ASP.NET Core & Microservices
        </div>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          {["Next.js 16", "React 19", "TypeScript", "NestJS", "C# .NET Core", "Clean Architecture", "Docker", "WebRTC"].map((tech) => (
            <div
              key={tech}
              style={{
                backgroundColor: "rgba(24, 24, 27, 0.9)",
                border: "1px solid rgba(63, 63, 70, 0.6)",
                borderRadius: "12px",
                padding: "8px 18px",
                fontSize: 16,
                fontWeight: 700,
                color: "#e4e4e7",
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Domain Footer */}
        <div
          style={{
            position: "absolute",
            bottom: 30,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#71717a",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          <span>portfolio.alireza-abedi.ir</span>
          <span>•</span>
          <span>github.com/AlirezaAbd-dev</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
