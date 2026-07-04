'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { siteConfig } from '@/data/site-config';
import type { Property } from '@/types/property';

const PLACEHOLDER_IMAGE = '/KBR1.png';
const ROTATION_MS = 5000;
const HERO_MIN_HEIGHT = 'min-h-[calc(100dvh-5rem)]';

const BRAND_HEADLINE = 'Building Communities. Creating Value.';
const BRAND_SUBHEADLINE =
  'A diversified real estate holdings company focused on residential and commercial properties, long-term ownership, and sustainable growth.';

function HeroBrandContent() {
  return (
    <div className="relative z-20 mx-auto flex min-h-full flex-1 max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
      <p className="heading-overline">{siteConfig.brand.tagline}</p>
      <h1 className="mt-3 max-w-3xl text-balance font-serif text-3xl font-bold leading-tight tracking-tight text-brand-blue sm:text-5xl lg:text-6xl">
        {BRAND_HEADLINE}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-dark/80 sm:text-xl">
        {BRAND_SUBHEADLINE}
      </p>
      <div className="mt-8 flex flex-wrap gap-4 sm:mt-10">
        <Link href="/properties" className="btn-primary">
          View Properties
        </Link>
        <Link href="/contact#contact-form" className="btn-outline">
          Get in Touch
        </Link>
      </div>
    </div>
  );
}

function DefaultHero() {
  return (
    <section className={`relative flex w-full flex-1 flex-col overflow-hidden ${HERO_MIN_HEIGHT}`}>
      <Image
        src={PLACEHOLDER_IMAGE}
        alt="Commercial property entrance"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 z-0 h-full w-full object-cover"
        unoptimized
      />
      <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[2px]" />
      <HeroBrandContent />
    </section>
  );
}

type HeroSliderProps = {
  slides: Property[];
};

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideCountRef = useRef(0);

  const rawFilteredSlides = Array.isArray(slides)
    ? slides.filter((slide) => slide?.imageUrl && slide.imageUrl.trim() !== '')
    : [];

  const slideDeck = [...rawFilteredSlides].sort((a, b) => {
    const stateA = (a?.state || '').toUpperCase().trim();
    const stateB = (b?.state || '').toUpperCase().trim();

    const isOK_A = stateA === 'OK' || stateA === 'OKLAHOMA';
    const isOK_B = stateB === 'OK' || stateB === 'OKLAHOMA';
    const isAR_A = stateA === 'AR' || stateA === 'ARKANSAS';
    const isAR_B = stateB === 'AR' || stateB === 'ARKANSAS';

    if (isOK_A && !isOK_B) return -1;
    if (isOK_B && !isOK_A) return 1;
    if (isAR_A && !isAR_B) return -1;
    if (isAR_B && !isAR_A) return 1;
    return 0;
  });

  slideCountRef.current = slideDeck.length;

  useEffect(() => {
    if (slideDeck.length <= 1) {
      return;
    }

    setCurrentSlideIndex(0);

    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => {
        const count = slideCountRef.current;
        if (count <= 1) {
          return prevIndex;
        }
        return (prevIndex + 1) % count;
      });
    }, ROTATION_MS);

    return () => clearInterval(timer);
  }, [slideDeck.length]);

  if (slideDeck.length === 0) {
    return <DefaultHero />;
  }

  const activeIndex = currentSlideIndex % slideDeck.length;
  const activeSlide = slideDeck[activeIndex];

  return (
    <section className={`relative flex w-full flex-1 flex-col overflow-hidden ${HERO_MIN_HEIGHT}`}>
      {slideDeck.map((slide, index) => {
        const isActive = index === activeIndex;
        const backgroundSrc =
          slide?.imageUrl && slide.imageUrl.trim() !== ''
            ? slide.imageUrl
            : PLACEHOLDER_IMAGE;

        return (
          <div
            key={slide.id || `slide-${index}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={backgroundSrc}
              alt={slide.title || 'Commercial property'}
              fill
              priority={index === 0}
              sizes="100vw"
              className="absolute inset-0 h-full w-full object-cover"
              unoptimized
            />
          </div>
        );
      })}

      <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[2px]" />

      <HeroBrandContent />

      <div className="absolute bottom-4 left-4 right-4 z-20 min-h-[90px] rounded-none border-l-2 border-amber-500/80 bg-zinc-950/70 p-4 text-left shadow-2xl backdrop-blur-md sm:bottom-8 sm:left-auto sm:right-8 sm:min-w-[260px] sm:max-w-sm sm:p-5">
        {activeSlide ? (
          <div key={activeIndex} className="opacity-100 transition-opacity duration-500">
            <h4 className="mb-1 font-serif text-lg font-bold leading-snug tracking-tight text-white sm:text-xl md:text-2xl">
              {activeSlide.title || 'KBR Holding'}
            </h4>
            <p className="text-sm font-medium leading-relaxed text-gray-300">
              {activeSlide.type || 'Asset'} · {activeSlide.city || ''},{' '}
              {activeSlide.state || ''}
            </p>
          </div>
        ) : (
          <div className="text-sm text-gray-400">Loading portfolio…</div>
        )}
      </div>
    </section>
  );
}
