'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2"
      type="button"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FiSun className="text-primary-dark hover:text-primary-light transition-colors duration-200 ease-in-out" /> : <FiMoon className="text-primary-light hover:text-primary-dark transition-colors duration-200 ease-in-out" />}
      <span className='sr-only'>Toggle theme</span>
    </button>
  );
}
