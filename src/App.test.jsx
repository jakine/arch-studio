import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { routes } from './App';

const renderRoute = (path) => render(
  <AppProvider>
    <RouterProvider router={createMemoryRouter(routes, { initialEntries: [path] })} />
  </AppProvider>
);

test.each([
  ['/', 2, /selected work/i],
  ['/projects', 1, /^projects$/i],
  ['/projects/tower', 1, /^tower$/i],
  ['/services', 1, /hand-crafted, custom design/i],
  ['/about', 1, /crafting spaces that inspire/i],
  ['/contact', 1, /contact us/i],
  ['/projects/does-not-exist', 1, /page not found/i],
  ['/no-such-page', 1, /page not found/i],
])('renders %s', async (path, level, name) => {
  renderRoute(path);
  expect(await screen.findByRole('heading', { level, name })).toBeInTheDocument();
});

test('projects filter comes from the URL', async () => {
  renderRoute('/projects?category=commercial');
  const commercialFilter = await screen.findByRole('button', { name: /^commercial/i });
  expect(commercialFilter).toHaveAttribute('aria-pressed', 'true');
});
