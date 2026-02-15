"use client";

import Navbar from "./Navbar";
import PageTransition from "./PageTransition";
import SmoothScroll from "./SmoothScroll";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Navbar />
      <PageTransition>{children}</PageTransition>
    </SmoothScroll>
  );
}
