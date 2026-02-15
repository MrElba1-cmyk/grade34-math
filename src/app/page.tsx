import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24">
      <div className="pt-10 md:pt-14">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Grade 3–4 Math Practice
          </h1>
          <p className="mt-4 text-sm md:text-base opacity-80 max-w-2xl">
            Fast daily practice for multiplication, division, fractions, place value, and word problems.
            Build streaks and earn stars.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/practice"
              className="rounded-2xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              Start Practice
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              Home
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ["Multiplication", "Facts, speed rounds, streaks."],
            ["Division", "Inverse practice + quick checks."],
            ["Fractions", "Equivalent fractions + basics."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-lg font-semibold">{t}</div>
              <div className="mt-2 text-sm opacity-80">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
