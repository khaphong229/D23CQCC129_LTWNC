'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Footer from '@/app/[locale]/(home)/components/Footer';
import Header from '@/app/[locale]/(home)/components/Header';
import AboutMe from '@/app/[locale]/(home)/components/Sections/AboutMe';
import Contact from '@/app/[locale]/(home)/components/Sections/Contact';
import Experiences from '@/app/[locale]/(home)/components/Sections/Experiences';
import Introduce from '@/app/[locale]/(home)/components/Sections/Introduce';
import LatestBlog from '@/app/[locale]/(home)/components/Sections/LatestBlog';
import Projects from '@/app/[locale]/(home)/components/Sections/Projects';
import TechStack from '@/app/[locale]/(home)/components/Sections/TechStack';
import { Squares } from '@/components/ui/squares-background';
import { useUserDevice } from '@/hooks/useUserDevice';

export default function Page() {
  const { isMobile } = useUserDevice();

  const introduceRef = useRef<HTMLDivElement>(null);
  const [bgHeight, setBgHeight] = useState(700);

  const paddingHeight = isMobile ? -50 : 100;

  useLayoutEffect(() => {
    if (introduceRef.current) {
      setBgHeight(introduceRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 w-full" style={{ height: bgHeight + paddingHeight, zIndex: -10 }}>
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#333"
          hoverFillColor="#222"
        />
      </div>

      <Header />

      <main className="mx-auto px-6 min-h-screen py-8 max-w-7xl">
        <div ref={introduceRef}>
          <Introduce />
        </div>
        <div id="about">
          <AboutMe />
        </div>
      </main>

      <div className="bg-[#1f2937] w-full border-y-2 border-neutral-400/20">
        <div id="stack">
          <TechStack />
        </div>
      </div>

      <div id="blog">
        <LatestBlog />
      </div>

      <div className="bg-[#1f2937] w-full border-y-2 border-neutral-400/20">
        <div id="experience">
          <Experiences />
        </div>
      </div>

      <div id="projects">
        <Projects />
      </div>

      <Contact />

      <Footer />
    </div>
  );
}
