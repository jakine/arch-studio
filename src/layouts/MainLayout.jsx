import React, { lazy, Suspense, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import ScrollToTop from '../components/ScrollToTop';
import SmoothScroll from '../components/SmoothScroll';
import { useApp } from '../context/AppContext';
import './MainLayout.css';

// The intro (and GSAP Flip) only matters on a first visit, so it stays out of
// the main bundle; until it arrives, a plain curtain of the same green holds the screen
const Intro = lazy(() => import('../components/Intro'));

function MainLayout() {
  const { isIntroPlaying } = useApp();
  // The header's logo mark is where the intro's mark lands
  const headerLogoRef = useRef(null);

  return (
    <SmoothScroll>
      <div className="main-layout">
        <CustomCursor />
        <ScrollToTop />
        <Header logoRef={headerLogoRef} />
        <main id="main" className="main-content">
          <Outlet />
        </main>
        <Footer />
        {isIntroPlaying && (
          <Suspense fallback={<div className="intro-placeholder" aria-hidden="true" />}>
            <Intro targetRef={headerLogoRef} />
          </Suspense>
        )}
      </div>
    </SmoothScroll>
  );
}

export default MainLayout;
