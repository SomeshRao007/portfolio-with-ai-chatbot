import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';

type ProjectsProps = {
  data: Project[];
};

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  return (
    <section className="py-20 md:py-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-50">My Projects</h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">A selection of projects I've built.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;