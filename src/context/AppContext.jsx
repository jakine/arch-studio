import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

// The splash plays on every full page load that lands on the home page.
// Navigating back to Home inside the site doesn't replay it: this is only
// read once, when the app starts.
const shouldPlayIntro = () => window.location.pathname === '/' && !prefersReducedMotion();

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Provider component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });
  // Splash intro: decided once at load, the cursor and hero wait for it
  const [isIntroPlaying, setIsIntroPlaying] = useState(shouldPlayIntro);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  useEffect(() => {
    // Initialize theme and language on mount
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLanguage = localStorage.getItem('language') || 'en';
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('lang', savedLanguage);
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  const finishIntro = useCallback(() => {
    setIsIntroPlaying(false);
  }, []);

  const value = {
    user,
    setUser,
    loading,
    setLoading,
    theme,
    toggleTheme,
    language,
    changeLanguage,
    isIntroPlaying,
    finishIntro,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

