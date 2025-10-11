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

  // Active section from viewport (IntersectionObserver)
  const activeId = useActiveSection(NAV.map((n) => n.id));

  // Close on Esc + outside click
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
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
    }
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
    const nodes = panelRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])',
    );
    const first = nodes[0];
    const last = nodes[nodes.length - 1];

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || nodes.length === 0) return;
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    document.addEventListener("keydown", onTab);
    first?.focus();
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  // Common focus styles for all links & buttons
  const focusStyles =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 rounded-md";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur">
      <div className="gy-container flex h-16 items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className={`gy-brand ${focusStyles}`}
          aria-label="Go to homepage"
        >
          GazaarY
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden sm:flex items-center gap-8 text-sm"
          aria-label="Primary"
        >
          {NAV.map((item) => {
            const isActive = activeId === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`gy-navlink ${focusStyles} ${
                  isActive ? "font-semibold underline underline-offset-4" : ""
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu button */}
        <button
          ref={btnRef}
          type="button"
          aria-label="Toggle menu"
          aria-controls="mobile-menu"
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
            {NAV.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`gy-navlink ${focusStyles}`}
                aria-current={activeId === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
