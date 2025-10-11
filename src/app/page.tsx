export default function Home() {
  return (
    <main className="flex-1 pt-10 md:pt-16">
      {/* WORK */}
      <section id="work" className="gy-container mt-8 scroll-mt-24">
        <div className="gy-card p-6">
          <p className="text-gy-800">
            If this text looks slate-ish (not pure black), your `gy` palette is
            active.
          </p>
          <div className="mt-3 flex gap-3">
            <button className="gy-btn">Primary</button>
            <button className="gy-btn gy-btn--ghost">Ghost</button>
            <a className="gy-link" href="#work">
              Link sample
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="gy-container py-20 md:py-28 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gy-900">
          About
        </h2>
        <p className="mt-3 text-gy-700 max-w-2xl">
          Short section placeholder. Replace with your story when ready.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="gy-container py-20 md:py-28 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gy-900">
          Contact
        </h2>
        <p className="mt-3 text-gy-700 max-w-2xl">
          Short section placeholder. Add your preferred contact method here.
        </p>
      </section>
    </main>
  );
}
