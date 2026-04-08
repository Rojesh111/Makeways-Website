'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function useHashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Wait a tick so the page fully paints before we try to scroll
    const init = setTimeout(() => {
      const hash = window.location.hash;
      if (!hash) return;

      let attempts = 0;
      const MAX = 15;

      const tryScroll = () => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
        if (++attempts < MAX) setTimeout(tryScroll, 100);
      };

      tryScroll();
    }, 50);

    return () => clearTimeout(init);
  }, [pathname]); // ← re-fires every time the route changes
}