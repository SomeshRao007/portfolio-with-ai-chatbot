// hooks/usePortfolioData.ts
import { useQuery } from '@tanstack/react-query';
import { fetchAllPortfolioData } from '../lib/strapi';
import { INITIAL_DATA } from '../constants';

export function usePortfolioData() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['portfolio-data'],
    queryFn: fetchAllPortfolioData,
    staleTime: 0, // Always refetch on mount (refresh)
    gcTime: 1000 * 60 * 5, // Cache for 5 minutes
    refetchOnWindowFocus: false,
  });

//   Merge fetched data with fallback to INITIAL_DATA
  const portfolioData = {
    personalInfo: data?.personalInfo || INITIAL_DATA.personalInfo,
    skills: data?.skills || INITIAL_DATA.skills,
    certifications: data?.certifications || INITIAL_DATA.certifications,
    timeline: data?.timeline || INITIAL_DATA.timeline,
    learning: data?.learning || INITIAL_DATA.learning,
    stats: data?.stats || INITIAL_DATA.stats,
    projects: data?.projects || INITIAL_DATA.projects,
    testimonials: data?.testimonials || INITIAL_DATA.testimonials,
  };

// cant use this i dont have money for strapi server fees
//    const portfolioData = {
//     personalInfo: data?.personalInfo,
//     skills: data?.skills,
//     certifications: data?.certifications,
//     timeline: data?.timeline,
//     learning: data?.learning,
//     stats: data?.stats,
//     projects: data?.projects,
//     testimonials: data?.testimonials,
//   };

  return {
    data: portfolioData,
    isLoading,
    error,
    isUsingFallback: !data?.personalInfo, // Check if using static data
  };
}