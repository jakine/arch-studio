import {
  projectsData,
  PROJECT_PHASES,
  getProjectById,
  getNextProject,
  getCategoryCounts,
  getTranslatedProject,
} from './projectsData';
import { translations } from './translations';

test('finds a project by id', () => {
  expect(getProjectById('tower').name).toBe('TOWER');
  expect(getProjectById('nope')).toBeUndefined();
});

test('next project wraps around to the first', () => {
  const last = projectsData[projectsData.length - 1];
  expect(getNextProject(last.id).id).toBe(projectsData[0].id);
});

test('category counts add up to all projects', () => {
  const { all, ...categories } = getCategoryCounts();
  expect(all).toBe(projectsData.length);
  expect(Object.values(categories).reduce((sum, count) => sum + count, 0)).toBe(all);
});

test('there are featured projects for the home hero', () => {
  expect(projectsData.filter((project) => project.featured).length).toBeGreaterThan(1);
});

test('every project timeline follows the five phases', () => {
  projectsData.forEach((project) => {
    expect(project.timeline.map((step) => step.phase)).toEqual(PROJECT_PHASES);
    expect(project.progress).toBeGreaterThanOrEqual(0);
    expect(project.progress).toBeLessThanOrEqual(100);
  });
});

test('translation keeps monitoring data and swaps copy', () => {
  const tower = getProjectById('tower');
  const translated = getTranslatedProject(tower, 'shq');
  expect(translated.description).toBe(translations.shq.projectsData.tower.description);
  expect(translated.timeline).toBe(tower.timeline);
  expect(translated.status).toBe(tower.status);
});

test('every status, service and phase has a label in both languages', () => {
  ['en', 'shq'].forEach((language) => {
    const t = translations[language];
    projectsData.forEach((project) => {
      expect(t.status[project.status]).toBeTruthy();
      project.services.forEach((service) => expect(t.serviceNames[service]).toBeTruthy());
    });
    PROJECT_PHASES.forEach((phase) => expect(t.projectDetail.phases[phase]).toBeTruthy());
  });
});
