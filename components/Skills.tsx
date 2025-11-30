import React, { useState } from 'react';
import { SkillCategory } from '../types';

type SkillsProps = {
  data: SkillCategory[];
};

const Skills: React.FC<SkillsProps> = ({ data }) => {
  // Set initial active category to the first one available, if any.
  const [activeCategory, setActiveCategory] = useState<string | null>(data.length > 0 ? data[0].name : null);

  const categories = data.map(cat => cat.name);
  const filteredSkills = data.find(cat => cat.name === activeCategory)?.skills || [];

  return (
    <section className="py-20 md:py-24 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">Skills</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">Technical Expertise</h2>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">Always ready to try hands-on new and emerging technologies</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg shadow-sm transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-opacity-50 ${
                activeCategory === category
                  ? 'bg-blue-600 dark:bg-blue-500 text-white scale-105 shadow-lg'
                  : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {filteredSkills.map((skill) => {
            return (
              <div
                key={skill.name}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl dark:hover:shadow-slate-700 hover:-translate-y-1 transition-all duration-300"
              >
                {skill.icon ? (
                  <img src={skill.icon} alt={`${skill.name} icon`} className="h-10 w-10 md:h-12 md:w-12 mb-4 object-contain" />
                ) : (
                  <div className="h-10 w-10 md:h-12 md:w-12 mb-4 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                )}
                <span className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-200">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;