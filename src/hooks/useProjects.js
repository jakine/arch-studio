import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { projectsData, getTranslatedProject } from '../utils/projectsData';

/**
 * Custom hook returning all projects translated into the current language
 * @returns {Array<object>} - Translated projects, in data order
 */
export function useProjects() {
  const { language } = useApp();
  return useMemo(
    () => projectsData.map((project) => getTranslatedProject(project, language)),
    [language]
  );
}
