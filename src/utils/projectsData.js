// Centralized projects data
import { getProjectImages } from './images';
import { translations } from './translations';

// Every project runs through the same five monitored phases
export const PROJECT_PHASES = ['concept', 'permits', 'structural', 'construction', 'handover'];

// Services the studio provides, end to end
export const SERVICES = ['design', 'structural', 'monitoring'];

export const projectsData = [
  {
    id: 'tower',
    title: 'RESIDENTIAL',
    name: 'TOWER',
    category: 'residential',
    description: 'A modern residential tower featuring innovative design and sustainable living spaces.',
    longDescription: 'Tower represents the pinnacle of modern residential architecture. This stunning development combines luxury living with sustainable design principles, creating a harmonious environment for residents. The project features state-of-the-art amenities, breathtaking views, and thoughtfully designed spaces that enhance daily living.',
    images: getProjectImages('tower'),
    year: '2024',
    location: 'Downtown District',
    area: '15,000 sq ft',
    link: '/projects/tower',
    featured: true,
    tint: 'light',
    status: 'construction',
    services: ['design', 'structural', 'monitoring'],
    progress: 68,
    timeline: [
      { phase: 'concept', date: '2023-02', done: true },
      { phase: 'permits', date: '2023-07', done: true },
      { phase: 'structural', date: '2023-11', done: true },
      { phase: 'construction', date: '2024-04', done: false },
      { phase: 'handover', date: '2025-09', done: false },
    ],
  },
  {
    id: 'modern-house',
    title: 'RESIDENTIAL',
    name: 'MODERN HOUSE',
    category: 'residential',
    description: 'A beautiful modern house featuring clean lines and contemporary design.',
    longDescription: 'This modern house project embodies the essence of contemporary residential design. With its clean architectural lines, open floor plans, and seamless indoor-outdoor connections, this home creates a perfect balance between modern aesthetics and comfortable living. The design prioritizes natural light, sustainable materials, and functional spaces.',
    images: getProjectImages('house'),
    year: '2023',
    location: 'Suburban Area',
    area: '3,500 sq ft',
    link: '/projects/modern-house',
    featured: true,
    tint: 'light',
    status: 'completed',
    services: ['design', 'structural', 'monitoring'],
    progress: 100,
    timeline: [
      { phase: 'concept', date: '2021-09', done: true },
      { phase: 'permits', date: '2022-01', done: true },
      { phase: 'structural', date: '2022-03', done: true },
      { phase: 'construction', date: '2022-06', done: true },
      { phase: 'handover', date: '2023-05', done: true },
    ],
  },
  {
    id: 'luxury-villa',
    title: 'RESIDENTIAL',
    name: 'LUXURY VILLA',
    category: 'residential',
    description: 'An exquisite luxury villa with premium finishes and expansive living spaces.',
    longDescription: 'The Luxury Villa project represents the ultimate in residential design and craftsmanship. This stunning property features expansive living spaces, premium finishes, and meticulous attention to detail throughout. The villa seamlessly blends indoor and outdoor living, creating a serene and luxurious environment for its residents.',
    images: getProjectImages('villa'),
    year: '2024',
    location: 'Exclusive Estate',
    area: '6,500 sq ft',
    link: '/projects/luxury-villa',
    featured: true,
    tint: 'light',
    status: 'construction',
    services: ['design', 'structural', 'monitoring'],
    progress: 42,
    timeline: [
      { phase: 'concept', date: '2023-08', done: true },
      { phase: 'permits', date: '2024-01', done: true },
      { phase: 'structural', date: '2024-03', done: false },
      { phase: 'construction', date: '2024-09', done: false },
      { phase: 'handover', date: '2025-12', done: false },
    ],
  },
  {
    id: 'object',
    title: 'PRODUCT',
    name: 'OBJECT DESIGN',
    category: 'commercial',
    description: 'Thoughtfully crafted object designs that blend artistry with functionality.',
    longDescription: 'Our object design project focuses on creating beautiful, functional pieces that enhance living spaces. Each object is meticulously designed with attention to detail, material selection, and user experience. The collection represents a fusion of traditional craftsmanship and modern design principles.',
    images: getProjectImages('object'),
    year: '2024',
    location: 'Studio',
    area: 'N/A',
    link: '/projects/object',
    featured: true,
    tint: 'light',
    status: 'design',
    services: ['design', 'structural'],
    progress: 25,
    timeline: [
      { phase: 'concept', date: '2024-03', done: true },
      { phase: 'permits', date: '2024-07', done: false },
      { phase: 'structural', date: '2024-10', done: false },
      { phase: 'construction', date: '2025-03', done: false },
      { phase: 'handover', date: '2026-01', done: false },
    ],
  },
]
  // A project only shows up once its folder has photos
  .filter((project) => project.images.length)
  .map((project) => ({ ...project, featuredImage: project.images[0] }));

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projectsData.find(project => project.id === id);
};

// Helper function to get the project after this one, wrapping around
export const getNextProject = (id) => {
  const index = projectsData.findIndex(project => project.id === id);
  return projectsData[(index + 1) % projectsData.length];
};

// Helper function to get projects by category
export const getProjectsByCategory = (category) => {
  return projectsData.filter(project => project.category === category);
};

// Helper function to get all categories
export const getAllCategories = () => {
  return [...new Set(projectsData.map(project => project.category))];
};

// Helper function to count projects per category, plus 'all'
export const getCategoryCounts = () => {
  return projectsData.reduce(
    (counts, project) => ({ ...counts, [project.category]: (counts[project.category] || 0) + 1 }),
    { all: projectsData.length }
  );
};

// Helper function to get translated project data
export const getTranslatedProject = (project, language = 'en') => {
  const projectTranslations = translations[language]?.projectsData;

  if (!projectTranslations || !projectTranslations[project.id]) {
    return project; // Return original if translation not found
  }

  const translated = projectTranslations[project.id];
  return {
    ...project,
    title: translated.title,
    name: translated.name,
    description: translated.description,
    longDescription: translated.longDescription,
  };
};
