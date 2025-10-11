import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="min-h-dvh flex flex-col">
          <Header />
          <main className="flex-1 pt-10 md:pt-16">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
