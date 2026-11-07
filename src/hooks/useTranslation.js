import { useApp } from '../context/AppContext';
import { translations } from '../utils/translations';

/**
 * Custom hook to access translations based on current language
 * @param {string} key - Dot-separated path to the translation (e.g., 'nav.home', 'about.title')
 * @returns {string|object} - The translation value or object
 */
export const useTranslation = () => {
  const { language } = useApp();
  const t = translations[language] || translations.en;

  const translate = (key) => {
    const keys = key.split('.');
    let value = t;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        // Try to get English fallback
        const enValue = translations.en;
        for (const enKey of keys) {
          value = enValue?.[enKey];
          if (value === undefined) break;
        }
        break;
      }
    }
    
    return value;
  };

  return { t, translate };
};
