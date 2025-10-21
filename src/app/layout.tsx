// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Robust, no-Tailwind-variant skip link visibility
  const [showSkip, setShowSkip] = useState(false);

  // Base visual styles for the link; we toggle only the transform
  const skipBase: React.CSSProperties = {
    position: "fixed",
    left: 16, // 1rem (px to avoid Tailwind dep)
    top: 16,
    zIndex: 100,
    padding: "0.5rem 0.75rem",
    borderRadius: 6,
    background: "#fff",
    color: "#0f172a", // slate-900-ish
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
    outline: showSkip ? "2px solid #34d399" : "none", // accent ring on focus
    outlineOffset: 2,
    transition: "transform 150ms ease",
    transform: showSkip ? "translateY(0)" : "translateY(-200%)",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Skip link for keyboard users (self-contained, no extra CSS needed) */}
        <a
          href="#work"
          onFocus={() => setShowSkip(true)}
          onBlur={() => setShowSkip(false)}
          style={skipBase}
        >
          Skip to content
        </a>

        <div className="min-h-dvh flex flex-col">
          <Header />
          <main className="flex-1 pt-10 md:pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
