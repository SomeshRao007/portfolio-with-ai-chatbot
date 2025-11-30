import React from 'react';

type FooterProps = {
  name: string;
};

const Footer: React.FC<FooterProps> = ({ name }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-800">
      <div className="container mx-auto px-4 md:px-8 py-6 text-center text-slate-500 dark:text-slate-400">
        <p>&copy; {currentYear} {name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;