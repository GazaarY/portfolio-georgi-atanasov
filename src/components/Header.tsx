// src/components/Header.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Viewport-based active section
  const activeId = useActiveSection(NAV.map((n) => n.id));

  // Hash fallback (keeps aria-current correct on hash navigation / skip link)
  const [hashId, setHashId] = useState<string>("");
  useEffect(() => {
    const update = () => setHashId(window.location.hash.replace("#", ""));
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // Decide which id is "current" (URL hash wins, else observer)
  const currentId = hashId || activeId || "";
  const isCurrent = (href: string) => {
    const id = href.replace("/#", "").replace("#", "");
    return id && id === currentId ? "page" : undefined;
  };

  // Close on Esc + outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(t) &&
        btnRef.current &&
        !btnRef.current.contains(t)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  // Focus trap when mobile menu is open
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const nodes = Array.from(
      panelRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    const onTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || nodes.length === 0) return;
      const activeEl: Element | null = document.activeElement;
      if (e.shiftKey && activeEl === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && activeEl === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onTab);
    first?.focus();
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

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
        <nav className="hidden sm:flex items-center gap-8 text-sm" aria-label="Primary">
          {NAV.map((item) => {
            const current = isCurrent(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`gy-navlink ${focusStyles} ${
                  current ? "font-semibold underline underline-offset-4" : ""
                }`}
                aria-current={current}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button (pixel-perfect icon, clipped) */}
        <button
          ref={btnRef}
          type="button"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-md border border-gy-200 text-gy-700 hover:bg-gy-50 active:translate-y-[1px] transition ${focusStyles} overflow-hidden p-2 relative`}
        >
          {/* Hamburger (22x14, bars at y=3/7/11) */}
          <svg
            width="22"
            height="14"
            viewBox="0 0 22 14"
            aria-hidden="true"
            shapeRendering="geometricPrecision"
            className={`${open ? "opacity-0" : "opacity-100"} transition-opacity duration-150 block`}
          >
            <path
              d="M2 3H20 M2 7H20 M2 11H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* X (matched stroke, centered) */}
          <svg
            width="22"
            height="14"
            viewBox="0 0 22 14"
            aria-hidden="true"
            shapeRendering="geometricPrecision"
            className={`${open ? "opacity-100" : "opacity-0"} transition-opacity duration-150 absolute inset-0 m-auto block`}
          >
            <path
              d="M4 3 L18 11 M18 3 L4 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        id="mobile-menu"
        ref={panelRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        className={`sm:hidden overflow-hidden border-t border-gy-200 transition-[max-height,opacity] duration-200 ${
          open ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="py-3" aria-label="Primary mobile">
          <div className="gy-container flex flex-col gap-3 text-sm">
            {NAV.map((item) => {
              const current = isCurrent(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`gy-navlink ${focusStyles} ${
                    current ? "font-semibold underline underline-offset-4" : ""
                  }`}
                  aria-current={current}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
