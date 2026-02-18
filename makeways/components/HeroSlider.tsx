'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  image: string;
  alt: string;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // 👇 REPLACE THESE PATHS WITH YOUR ACTUAL IMAGE PATHS
  const slides: Slide[] = [
     {
      image: '/images/Hero2.jpeg',  // Put your second image in public/images/slide2.jpg
      alt: 'MAKEWAYS Creative Work 2'
    },
    {
      image: '/images/Hero1.jpeg',  // Put your first image in public/images/slide1.jpg
      alt: 'MAKEWAYS Creative Work 1'
    }
   
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <>
      <section className="hero">
        <div className="hero-slider">
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className={`slide ${index === currentSlide ? 'active' : ''}`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={100}
                style={{ objectFit: 'contain' }}
                className="slide-image"
              />
              <div className="overlay"></div>
            </div>
          ))}
        </div>
        
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          margin-top: 55px;
        }

        .hero-slider {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 80vh;
          margin: 0 auto;
        }

        .slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          pointer-events: none;
        }

        .slide.active {
          opacity: 1;
          pointer-events: all;
        }

        :global(.slide-image) {
          object-position: center;
          width: 100%;
          height: 100%;
        }
        :global(body) {
          margin: 0;
          padding: 0;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.1) 50%,
            rgba(0, 0, 0, 0.4) 100%
          );
          pointer-events: none;
        }

        .slide-indicators {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 15px;
          z-index: 10;
        }

        .indicator {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: rgba(255,255,255,0.5);
          border: 2px solid white;
          transition: all 0.3s ease;
          padding: 0;
          cursor: pointer;
        }

        .indicator:hover {
          background: rgba(255,255,255,0.8);
          transform: scale(1.1);
        }

        .indicator.active {
          background: var(--orange);
          border-color: var(--orange);
          transform: scale(1.3);
        }

        @media (max-width: 768px) {
          .hero {
            margin-top: 70px;
          }
          
          .hero-slider {
            height: auto;
            aspect-ratio: 4 / 3;
          }
          
          .slide-indicators {
            bottom: 20px;
          }
        }
      `}</style>
    </>
  );
}