// src/hooks/useActiveSection.ts
"use client";
import { useEffect, useState } from "react";

/**
 * Scroll-based active section:
 * - Picks the last section whose top is above a pick-line (35% of viewport).
 * - If the user is at the bottom of the document, force the last section.
 * - If the last section's top is inside the viewport by 60%, also force it.
 */
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const picklinePct = 0.35; // where we decide a section is “current”
    const contactId = sectionIds[sectionIds.length - 1];

    const compute = () => {
      const docEl = document.documentElement;
      const vh = window.innerHeight;
      const line = Math.round(vh * picklinePct);

      // 1) Force last section if we're effectively at page bottom.
      const atBottom =
        Math.ceil(window.scrollY + vh) >= docEl.scrollHeight - 1;

      if (atBottom) {
        setActive(contactId);
        return;
      }

      // 2) If the last section has entered 60% of viewport, force it.
      const contactEl = document.getElementById(contactId);
      if (contactEl) {
        const r = contactEl.getBoundingClientRect();
        if (r.top <= vh * 0.6) {
          setActive(contactId);
          return;
        }
      }

      // 3) Otherwise pick the last section whose top is above the pick-line.
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top } = el.getBoundingClientRect();
        if (top <= line) current = id;
      }
      setActive(current);
    };

    // run now + on scroll/resize
    compute();
    const onScroll = () => compute();
    const onResize = () => compute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [sectionIds]);

  return active;
}
