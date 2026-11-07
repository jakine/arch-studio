// Application constants
export const APP_NAME = 'Arch Studio';
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Route paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PROJECTS: '/projects',
  PROJECTS_DETAIL: '/projects/:id',
  SERVICES: '/services',
};

// Main navigation, shared by the header and the footer sitemap
export const NAV_ITEMS = [
  { route: ROUTES.PROJECTS, key: 'projects' },
  { route: ROUTES.SERVICES, key: 'services' },
  { route: ROUTES.ABOUT, key: 'about' },
  { route: ROUTES.CONTACT, key: 'contact' },
];

// Helper function to get route path without leading slash (for nested routes)
export const getRoutePath = (route) => route.replace(/^\//, '');


// Studio contact details, shared by the footer and the contact page
export const STUDIO_CONTACT = {
  email: 'info@archstudio.com',
  phone: '+1 (234) 567-890',
  phoneHref: 'tel:+1234567890',
  addressLines: ['123 Design Street', 'Architecture District, City 12345'],
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
};
