import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { ROUTES, getRoutePath } from './utils/constants';
import './App.css';

// Home stays in the main bundle (it holds the LCP image); every other page is code-split
const lazyPage = (load) => () => load().then((module) => ({ Component: module.default }));

// Exported so tests can mount any page in a memory router
export const routes = [
  {
    path: ROUTES.HOME,
    element: <MainLayout />,
    hydrateFallbackElement: <div className="route-fallback" />,
    children: [
      { index: true, element: <Home /> },
      { path: getRoutePath(ROUTES.PROJECTS), lazy: lazyPage(() => import('./pages/Projects')) },
      { path: getRoutePath(ROUTES.PROJECTS_DETAIL), lazy: lazyPage(() => import('./pages/ProjectDetail')) },
      { path: getRoutePath(ROUTES.ABOUT), lazy: lazyPage(() => import('./pages/About')) },
      { path: getRoutePath(ROUTES.CONTACT), lazy: lazyPage(() => import('./pages/Contact')) },
      { path: getRoutePath(ROUTES.SERVICES), lazy: lazyPage(() => import('./pages/Services')) },
      { path: '*', lazy: lazyPage(() => import('./pages/NotFound')) },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
