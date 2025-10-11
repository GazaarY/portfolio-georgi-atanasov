// src/components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hash, setHash] = useState<string>("");

  // Track the current hash to set aria-current="page" on the matching link
  useEffect(() => {
    const update = () => setHash(window.location.hash || "");
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Helper: return aria-current if href hash matches current hash
  const isCurrent = (href: string) =>
    (href.startsWith("/#") ? href.slice(1) : href) === hash ? "page" : undefined;

  // Common focus styles for all links & buttons
  const focusStyles =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-md";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur">
      <div className="gy-container flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className={`gy-brand ${focusStyles}`} aria-label="Go to homepage">
          GazaarY
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8 text-sm">
          <Link
            href="/#work"
            className={`gy-navlink ${focusStyles}`}
            aria-current={isCurrent("/#work")}
          >
            Work
          </Link>
          <Link
            href="/#about"
            className={`gy-navlink ${focusStyles}`}
            aria-current={isCurrent("/#about")}
          >
            About
          </Link>
          <Link
            href="/#contact"
            className={`gy-navlink ${focusStyles}`}
            aria-current={isCurrent("/#contact")}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-gy-200 text-gy-700 hover:bg-gy-50 active:translate-y-[1px] transition ${focusStyles}`}
        >
          {/* simple hamburger / X */}
          <span className="relative block w-4">
            <span
              className={`absolute inset-x-0 block h-0.5 bg-gy-900 transition-transform ${
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute inset-x-0 block h-0.5 bg-gy-900 transition-opacity ${
                open ? "opacity-0" : "opacity-100"
              }`}
              style={{ top: "7px" }}
            />
            <span
              className={`absolute inset-x-0 block h-0.5 bg-gy-900 transition-transform ${
                open ? "translate-y-0 -rotate-45" : "translate-y-1.5"
              }`}
              style={{ top: "14px" }}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`sm:hidden overflow-hidden border-t border-gy-200 transition-[max-height,opacity] duration-200 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="py-3">
          <div className="gy-container flex flex-col gap-3 text-sm">
            <Link
              href="/#work"
              className={`gy-navlink ${focusStyles}`}
              aria-current={isCurrent("/#work")}
              onClick={() => setOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/#about"
              className={`gy-navlink ${focusStyles}`}
              aria-current={isCurrent("/#about")}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/#contact"
              className={`gy-navlink ${focusStyles}`}
              aria-current={isCurrent("/#contact")}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
