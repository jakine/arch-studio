// jest-dom adds custom matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom lacks these browser APIs. Report reduced motion so pages render their
// static versions (no intro, pins or smooth scrolling) and no custom cursor.
window.matchMedia = (query) => ({
  matches: query.includes('prefers-reduced-motion: reduce'),
  media: query,
  onchange: null,
  addEventListener() {},
  removeEventListener() {},
  addListener() {},
  removeListener() {},
  dispatchEvent: () => false,
});

class ObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

window.IntersectionObserver = ObserverMock;
window.ResizeObserver = ObserverMock;
window.scrollTo = () => {};
window.SVGElement.prototype.getBBox = () => ({ x: 0, y: 0, width: 0, height: 0 });

// Image processing is a build-time concern; give tests lightweight stand-ins
vi.mock('./utils/images', () => {
  const getImage = (key) => ({
    sources: { webp: `/${key}.webp 480w` },
    img: { src: `/${key}.webp`, w: 480, h: 600 },
    placeholder: '',
    key,
  });
  // The real folders still decide which pictures each project has
  const keys = Object.keys(import.meta.glob('./assets/project_pictures/*/*.png'))
    .map((path) => path.replace(/^.*project_pictures\//, '').replace(/\.png$/, ''))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return {
    getImage,
    getProjectImages: (folder) => keys.filter((key) => key.startsWith(`${folder}/`)).map(getImage),
  };
});
