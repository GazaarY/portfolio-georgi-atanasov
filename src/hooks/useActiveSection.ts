// src/hooks/useActiveSection.ts
"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: string[],
  rootMargin = "-40% 0px -55% 0px"
) {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const visible = new Map<string, IntersectionObserverEntry>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).id;
          if (e.isIntersecting) {
            visible.set(id, e);
          } else {
            visible.delete(id);
          }
        });

        if (visible.size) {
          const top = [...visible.values()].sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio ||
              sectionIds.indexOf((a.target as HTMLElement).id) -
                sectionIds.indexOf((b.target as HTMLElement).id)
          )[0];
          const topId = (top.target as HTMLElement).id;
          if (topId && topId !== active) setActive(topId);
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], root: null, rootMargin }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
}
