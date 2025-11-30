import React from 'react';
import type { Project } from '../types';
import GalleryHoverCarousel, { GalleryItem } from './ui/GalleryHoverCarousel.tsx';

type ProjectsProps = {
  data: Project[];
};

const Projects: React.FC<ProjectsProps> = ({ data }) => {
  // Transform your Project data to match the Carousel's expected format
  const carouselItems: GalleryItem[] = data.map((project, index) => ({
    id: `project-${index}`,
    title: project.title,
    summary: project.description,
    // Use githubUrl as the link, fallback to '#' if not present
    url: project.githubUrl || '#', 
    image: project.imageUrl || '', 
  }));

  return (
    <GalleryHoverCarousel 
      heading="My Projects" 
      items={carouselItems} 
    />
  );
};

export default Projects;