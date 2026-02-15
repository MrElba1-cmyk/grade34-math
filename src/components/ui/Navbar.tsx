"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-white/10 transition">
    {label}
  </Link>
);

export default function Navbar() {
  return (
    <div className="sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
              <GraduationCap className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Grade 3–4 Math</div>
              <div className="text-xs opacity-70">Practice • Quiz • Flashcards</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/start" label="Start" />
            <NavLink href="/practice" label="Practice" />
            <NavLink href="/quiz" label="Quiz" />
            <NavLink href="/flashcards" label="Flashcards" />
            <NavLink href="/progress" label="Progress" />
          </div>
        </div>
      </div>
    </div>
  );
}
