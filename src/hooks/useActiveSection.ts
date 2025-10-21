"use client";
import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.01, root: null, rootMargin },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionIds, rootMargin]);

  return active;
}
