// src/components/SkipLink.tsx
"use client";

export default function SkipLink() {
  return (
    <a
      href="#work"
      className="
        sr-only
        focus:not-sr-only
        focus:fixed focus:top-2 focus:left-2
        focus:z-50
        px-3 py-2 rounded
        bg-gy-900 text-white
        shadow-md
      "
    >
      Skip to content
    </a>
  );
}
