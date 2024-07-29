'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiSun } from '@react-icons/all-files/fi/FiSun';
import { FiMoon } from '@react-icons/all-files/fi/FiMoon';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDarkTheme = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="p-2"
      type="button"
      aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
    >
      {isDarkTheme ? (
        <FiSun className="text-primary-dark hover:text-primary-light transition-colors duration-200 ease-in-out" />
      ) : (
        <FiMoon className="text-primary-light hover:text-primary-dark transition-colors duration-200 ease-in-out" />
      )}
      <span className='sr-only'>Toggle theme</span>
    </button>
  );
}
