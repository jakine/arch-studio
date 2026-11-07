import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from './SmoothScroll';
import { resetPageTheme } from '../lib/pageTheme';

function ScrollToTop() {
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();

  // Disable browser's automatic scroll restoration on mount
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Scroll to top and fall back to the default paper color whenever the route changes
  // (including back navigation). This is a layout effect and renders before <Outlet />,
  // so it lands before the new page's sections measure their scroll triggers.
  useLayoutEffect(() => {
    scrollTo(0, { immediate: true, force: true });
    resetPageTheme();
  }, [pathname, scrollTo]);

  return null;
}

export default ScrollToTop;
