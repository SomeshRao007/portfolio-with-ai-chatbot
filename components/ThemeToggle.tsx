import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-14 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          theme === 'light' ? 'translate-x-0' : 'translate-x-6'
        }`}
      >
        {theme === 'light' ? (
          <SunIcon className="w-4 h-4 text-yellow-500" />
        ) : (
          <MoonIcon className="w-4 h-4 text-slate-400" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
