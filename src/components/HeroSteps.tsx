// src/components/HeroSteps.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type HeroStepsProps = {
  steps: string[];
  dwellMs?: number;
  wipeMs?: number;
};

export default function HeroSteps({
  steps,
  dwellMs = 2200,
  wipeMs = 700,
}: HeroStepsProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [wiping, setWiping] = useState(false);

  const nextIndex = (index + 1) % steps.length;

  // Timeline: dwell → wipe → swap
  useEffect(() => {
    if (reduceMotion) return;
    const dwell = window.setTimeout(() => setWiping(true), dwellMs);
    const swap = window.setTimeout(() => {
      setIndex((i) => (i + 1) % steps.length);
      setWiping(false);
    }, dwellMs + wipeMs + 60);
    return () => {
      window.clearTimeout(dwell);
      window.clearTimeout(swap);
    };
  }, [index, reduceMotion, steps.length, dwellMs, wipeMs]);

  const textToShow = useMemo(
    () => (reduceMotion ? steps[steps.length - 1] : steps[index]),
    [reduceMotion, steps, index]
  );

  return (
    <section aria-label="Intro" className="gy-container pt-16 md:pt-24 pb-8 md:pb-12">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Background A — Imagination */}
        <Image
          src="/images/hero-imagination.jpg" /* place file in public/images */
          alt=""
          fill
          priority={false}
          className={`object-cover transition-opacity duration-700 ${
            wiping ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Background B — Knowledge */}
        <Image
          src="/images/hero-knowledge.jpg" /* place file in public/images */
          alt=""
          fill
          priority={false}
          className={`object-cover transition-opacity duration-700 ${
            wiping ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Optional veil for readability */}
        <div className="pointer-events-none absolute inset-0 bg-gy-canvas/35" />

        {/* TEXT + EFFECT LAYER */}
        <div className="relative z-10">
          {/* Current line (top-right, exact color #032834) */}
          <h1
            className={[
              "text-3xl md:text-5xl font-semibold tracking-tight",
              "motion-safe:transition-opacity motion-safe:duration-500",
              "ml-auto text-right pr-3 md:pr-8",
              "text-[#032834]",
              wiping ? "opacity-0" : "opacity-100",
            ].join(" ")}
          >
            {textToShow}
          </h1>

          {/* Next line fades in while wipe runs (right-aligned for continuity) */}
          {!reduceMotion && (
            <div
              className={[
                "absolute inset-0 flex items-start justify-end pr-3 md:pr-8",
                "motion-safe:transition-opacity motion-safe:duration-500",
                wiping ? "opacity-100 delay-150" : "opacity-0",
              ].join(" ")}
              aria-hidden="true"
            >
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-gy-900 text-right">
                {steps[nextIndex]}
              </h2>
            </div>
          )}

          {/* Wash overlay (same color as canvas) */}
          {!reduceMotion && (
            <div
              aria-hidden="true"
              className={[
                "pointer-events-none absolute inset-0 bg-gy-canvas transform -translate-x-full",
                "motion-safe:transition-transform",
              ].join(" ")}
              style={{
                transitionDuration: `${wipeMs}ms`,
                transform: wiping ? "translateX(0)" : "translateX(-100%)",
              }}
            />
          )}
        </div>
      </div>

      <p className="mt-4 max-w-2xl text-gy-700">
        The next step replaces the last—clean, quick, and measurable.
      </p>
    </section>
  );
}

/** Detect prefers-reduced-motion (no ts-expect-error, proper cleanup) */
function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  const mq = useRef<MediaQueryList | null>(null);

  // Type guard for legacy MediaQueryList API
  type LegacyMQL = MediaQueryList & {
    addListener: (listener: (e: MediaQueryListEvent) => void) => void;
    removeListener: (listener: (e: MediaQueryListEvent) => void) => void;
  };
  const isLegacy = (m: MediaQueryList): m is LegacyMQL =>
    // @ts-ignore - TS 5.x doesn’t narrow on "in" for DOM mixins reliably
    "addListener" in m && typeof (m as any).addListener === "function";

  useEffect(() => {
    if (typeof window === "undefined") return;

    mq.current = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mql = mq.current;

    const update = (e?: MediaQueryListEvent) => {
      setPrefers(typeof e?.matches === "boolean" ? e.matches : mql.matches);
    };

    // init
    update();

    // Modern listener
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", update);
      return () => mql.removeEventListener("change", update);
    }

    // Legacy listener (Safari < 14)
    if (isLegacy(mql)) {
      mql.addListener(update);
      return () => mql.removeListener(update);
    }
  }, []);

  return prefers;
}
