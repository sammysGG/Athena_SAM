"use client";
import { useEffect } from "react";

export default function VisitorTracker() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("vt")) return; // fire once per tab

    const fp = {
      canvas: (() => {
        try {
          const c = document.createElement("canvas");
          const ctx = c.getContext("2d");
          if (!ctx) return null;
          ctx.textBaseline = "top";
          ctx.font = "14px Arial";
          ctx.fillText("athena", 2, 2);
          return c.toDataURL().slice(0, 64);
        } catch {
          return null;
        }
      })(),
      webgl: (() => {
        try {
          const c = document.createElement("canvas");
          const gl = c.getContext("webgl") as any;
          return gl ? gl.getParameter(gl.VERSION) : null;
        } catch {
          return null;
        }
      })(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      languages: navigator.languages?.join(","),
      screen: `${screen.width}x${screen.height}`,
      cores: navigator.hardwareConcurrency,
      platform: navigator.platform,
    };

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fingerprint: JSON.stringify(fp) }),
      keepalive: true,
    }).finally(() => sessionStorage.setItem("vt", "1"));
  }, []);

  return null;
}
