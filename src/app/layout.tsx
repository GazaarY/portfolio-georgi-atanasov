// src/app/layout.tsx
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Skip link for keyboard users */}
        <a
          href="#work"
          className="
            fixed left-4 top-4 z-[100]
            -translate-y-24 focus-visible:translate-y-0
            transition-transform
            rounded-md bg-white px-3 py-2 shadow
            text-gy-900
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400
          "
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
