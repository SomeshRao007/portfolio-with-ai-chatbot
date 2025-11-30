import React, { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import ThemeToggle from './ThemeToggle';

type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#skills', label: 'Skills' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#learning', label: 'Learning' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'bg-white/80 backdrop-blur-sm shadow-md dark:bg-slate-900/80' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#home" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {name}
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <ThemeToggle />
            </nav>
            <div className="md:hidden flex items-center space-x-4">
                <ThemeToggle />
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
            className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-slate-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="pt-20"> {/* Offset for header */}
                <nav className="flex flex-col items-center justify-center h-full space-y-8 p-8">
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-2xl text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                </nav>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;