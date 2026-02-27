import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const PromoVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  const titleY = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  // Window 1 Animation (Messy to Snapped)
  const win1Progress = spring({
    frame: frame - 60, // Starts at 2 seconds
    fps,
    config: { damping: 14 },
  });

  const win1Rotate = interpolate(win1Progress, [0, 1], [-5, 0]);
  const win1Top = interpolate(win1Progress, [0, 1], [15, 2]);
  const win1Left = interpolate(win1Progress, [0, 1], [10, 2]);
  const win1Width = interpolate(win1Progress, [0, 1], [35, 47]);
  const win1Height = interpolate(win1Progress, [0, 1], [60, 96]);

  // Window 2 Animation
  const win2Progress = spring({
    frame: frame - 65,
    fps,
    config: { damping: 14 },
  });

  const win2Rotate = interpolate(win2Progress, [0, 1], [8, 0]);
  const win2Top = interpolate(win2Progress, [0, 1], [40, 2]);
  const win2Left = interpolate(win2Progress, [0, 1], [55, 51]);
  const win2Width = interpolate(win2Progress, [0, 1], [40, 47]);
  const win2Height = interpolate(win2Progress, [0, 1], [30, 46]);

  // Window 3 Animation
  const win3Progress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 14 },
  });

  const win3Rotate = interpolate(win3Progress, [0, 1], [-3, 0]);
  const win3Top = interpolate(win3Progress, [0, 1], [70, 52]);
  const win3Left = interpolate(win3Progress, [0, 1], [60, 51]);
  const win3Width = interpolate(win3Progress, [0, 1], [30, 47]);
  const win3Height = interpolate(win3Progress, [0, 1], [25, 46]);

  // CTA Text
  const ctaScale = spring({
    frame: frame - 150,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5F5F7", fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif" }}>
      
      {/* Background gradient */}
      <AbsoluteFill style={{
        background: "radial-gradient(circle at 50% 0%, rgba(0,122,255,0.15) 0%, rgba(0,0,0,0) 70%)"
      }} />

      {/* Main Title */}
      <div style={{
        position: "absolute",
        top: 80,
        width: "100%",
        textAlign: "center",
        opacity: titleOpacity,
        transform: `translateY(${interpolate(titleY, [0, 1], [-20, 0])}px)`
      }}>
        <h1 style={{ fontSize: 80, fontWeight: 700, margin: 0, color: "#1D1D1F" }}>Snapback</h1>
        <p style={{ fontSize: 32, color: "#86868B", marginTop: 10 }}>Your Perfect Workspace, One Click Away</p>
      </div>

      {/* Mock Desktop Environment */}
      <div style={{
        position: "absolute",
        top: 300,
        left: "50%",
        transform: "translateX(-50%)",
        width: 1400,
        height: 700,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        boxShadow: "0 32px 64px rgba(0,0,0,0.15)",
        border: "2px solid rgba(0,0,0,0.05)",
        overflow: "hidden"
      }}>
        
        {/* Window 1 */}
        <div style={{
          position: "absolute",
          top: `${win1Top}%`,
          left: `${win1Left}%`,
          width: `${win1Width}%`,
          height: `${win1Height}%`,
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 16,
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          transform: `rotate(${win1Rotate}deg)`,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ height: 32, borderBottom: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div style={{ flex: 1, padding: 24 }}>
            <div style={{ width: "60%", height: 16, background: "rgba(0,0,0,0.05)", borderRadius: 8, marginBottom: 16 }} />
            <div style={{ width: "90%", height: 12, background: "rgba(0,0,0,0.05)", borderRadius: 6, marginBottom: 12 }} />
            <div style={{ width: "80%", height: 12, background: "rgba(0,0,0,0.05)", borderRadius: 6, marginBottom: 12 }} />
          </div>
        </div>

        {/* Window 2 */}
        <div style={{
          position: "absolute",
          top: `${win2Top}%`,
          left: `${win2Left}%`,
          width: `${win2Width}%`,
          height: `${win2Height}%`,
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 16,
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          transform: `rotate(${win2Rotate}deg)`,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ height: 32, borderBottom: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div style={{ flex: 1, padding: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={{ width: 80, height: 80, background: "rgba(0,0,0,0.05)", borderRadius: 16 }} />
            <div style={{ width: 80, height: 80, background: "rgba(0,0,0,0.05)", borderRadius: 16 }} />
            <div style={{ width: 80, height: 80, background: "rgba(0,122,255,0.1)", borderRadius: 16 }} />
          </div>
        </div>

        {/* Window 3 */}
        <div style={{
          position: "absolute",
          top: `${win3Top}%`,
          left: `${win3Left}%`,
          width: `${win3Width}%`,
          height: `${win3Height}%`,
          backgroundColor: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 16,
          boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
          transform: `rotate(${win3Rotate}deg)`,
          display: "flex",
          flexDirection: "column"
        }}>
          <div style={{ height: 32, borderBottom: "1px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", padding: "0 16px", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F56" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27C93F" }} />
          </div>
          <div style={{ flex: 1, padding: 24 }}>
            <div style={{ width: "100%", height: 12, background: "rgba(0,0,0,0.05)", borderRadius: 6, marginBottom: 12 }} />
            <div style={{ width: "90%", height: 12, background: "rgba(0,0,0,0.05)", borderRadius: 6, marginBottom: 12 }} />
          </div>
        </div>

      </div>

      {/* CTA Overlay */}
      {frame > 150 && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${ctaScale})`,
          backgroundColor: "#007AFF",
          color: "white",
          padding: "24px 48px",
          borderRadius: 100,
          fontSize: 48,
          fontWeight: 700,
          boxShadow: "0 24px 48px rgba(0,122,255,0.4)",
          opacity: interpolate(frame, [270, 290], [1, 0], { extrapolateRight: "clamp" })
        }}>
          Instant Organization
        </div>
      )}

    </AbsoluteFill>
  );
};
