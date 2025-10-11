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
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:shadow"
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
