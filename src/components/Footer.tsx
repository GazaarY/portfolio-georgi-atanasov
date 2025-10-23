// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-inherit">
      {/* Full-bleed grid so the center stays truly centered and the left can hug the viewport edge */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 items-center gap-3 py-6 sm:py-8 text-sm">
        {/* LEFT (desktop) / MIDDLE (mobile) — legal links */}
        <div className="order-2 sm:order-1 pl-4 md:pl-6">
          <nav className="flex gap-5 sm:gap-4">
            <Link href="/impressum" className="gy-navlink">
              Impressum
            </Link>
            <Link href="/privacy" className="gy-navlink">
              Datenschutz
            </Link>
          </nav>
        </div>

        {/* CENTER (always) — copyright */}
        <div className="order-1 sm:order-2 justify-self-center text-gy-700">
          © {new Date().getFullYear()} GazaarY
        </div>

        {/* RIGHT spacer (desktop) */}
        <div className="order-3 sm:order-3" />
      </div>
    </footer>
  );
}
