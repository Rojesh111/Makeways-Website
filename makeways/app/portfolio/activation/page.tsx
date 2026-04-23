'use client';

import React, { Suspense } from 'react';
import PortfolioCategory from '@/components/PortfolioCategory';

// 1. Keep your items data outside the component to prevent unnecessary re-renders
const items = [
  {
    id: 3,
    title: 'JCB 220LC Launching Ceremony',
    images: '/images/activation/JCB.webp',
  },
  {
    id: 5,
    title: 'Digo Paila Walkathon',
    images: '/images/activation/Nabil.webp',
  },
  {
    id: 6,
    title: 'Hero MotoCorp × CG Motors Launch',
    images: '/images/activation/Hero.webp',
  },
  {
    id: 8,
    title: 'Yamaha FZ Street Fighter Ride Out',
    images: '/images/activation/Yamaha.webp',
  },
  {
    id: 9,
    title: 'Miss Nepal — Face of Fascino',
    images: '/images/activation/fiat.webp',
  },
];

/**
 * SUB-COMPONENT: ActivationContent
 * This component contains the logic that might trigger useSearchParams().
 */
function ActivationContent() {
  return (
    <PortfolioCategory
      title="ACTIVATION"
      subtitle="Brand Activation & Experiential"
      accent="#f47c20"
      items={items}
    />
  );
}

/**
 * MAIN PAGE COMPONENT: ActivationPage
 * This wraps the content in a Suspense boundary to prevent the Next.js build error.
 */
export default function ActivationPage() {
  return (
    // The Suspense boundary is required by Next.js for any component using useSearchParams()
    // The fallback is what appears during the split-second hydration process.
    <Suspense fallback={
      <div style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontFamily: 'sans-serif'
      }}>
        Loading Activation...
      </div>
    }>
      <ActivationContent />
    </Suspense>
  );
}