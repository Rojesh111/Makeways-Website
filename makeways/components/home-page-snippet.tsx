'use client';

// ─── Add this import at the top of your home page ────────────────────────────
import { useHashScroll } from '@/components/useHashScroll';
// (adjust the path to wherever you saved useHashScroll.ts)

// ─── Inside your home page component, call the hook ──────────────────────────
export default function HomePage() {

  // One line — this is the entire fix for hash-scroll navigation
  useHashScroll();

  return (
    <>
      {/* Make sure every nav target has the matching id: */}

      <section id="about">
        {/* INTRO section content */}
      </section>

      <section id="services">
        {/* WHAT WE DO section content */}
      </section>

      <section id="portfolio">
        {/* PORTFOLIO section content */}
      </section>
    </>
  );
}
