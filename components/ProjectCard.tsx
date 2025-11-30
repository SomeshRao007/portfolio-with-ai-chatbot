import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import { CodeBracketIcon, PlayIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Game2048 from './Game2048';

type ProjectCardProps = {
  project: Project;
};

// Modal component for the game
const GameModal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({ children, onClose }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div 
        className="relative bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md md:max-w-lg" 
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 text-white bg-slate-800 rounded-full p-2 z-10 hover:bg-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {children}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};


const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isGameModalOpen, setGameModalOpen] = useState(false);

  return (
    <>
      <div className="group flex flex-col bg-slate-50 dark:bg-slate-800/50 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-slate-700 transition-shadow duration-300 overflow-hidden">
        {project.imageUrl ? (
          <div className="relative aspect-video overflow-hidden bg-slate-200 dark:bg-slate-700">
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {project.interactiveComponent && (
                <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none">
                    PLAYABLE
                </div>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
             <CodeBracketIcon className="w-12 h-12 text-slate-400 dark:text-slate-500" />
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 flex-grow text-sm">
            {project.description}
          </p>
          <div className="mt-6 flex items-center space-x-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-semibold"
              >
                <CodeBracketIcon className="w-5 h-5" />
                <span>Code</span>
              </a>
            )}
            {project.interactiveComponent === 'Game2048' && (
               <button
                  onClick={() => setGameModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors text-sm font-semibold shadow-md hover:shadow-lg"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>Play</span>
                </button>
            )}
          </div>
        </div>
      </div>
      
      {isGameModalOpen && project.interactiveComponent === 'Game2048' && (
        <GameModal onClose={() => setGameModalOpen(false)}>
            <Game2048 isActive={true} />
        </GameModal>
      )}
    </>
  );
};

export default ProjectCard;