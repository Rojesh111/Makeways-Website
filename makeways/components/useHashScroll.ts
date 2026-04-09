'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function useHashScroll() {
  const pathname = usePathname();
  const searchParams = useSearchParams(); // Hook into searchParams to catch route changes

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    // Small delay to ensure the DOM is fully rendered
    const timeoutId = setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]); // Re-fire on pathname or searchParams change
}
