// lib/strapi.ts
import type { 
  SkillCategory, 
  Certification, 
  TimelineEvent, 
  LearningItem, 
  Project, 
  Testimonial 
} from '../types';

const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || '';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN || '';

// Helper to construct full media URLs
const getMediaUrl = (url: string | undefined | null): string => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
};

// Generic fetch wrapper for Strapi API
async function fetchStrapi<T>(endpoint: string): Promise<T | null> {
  if (!STRAPI_URL) {
    console.warn('[Strapi] No STRAPI_URL configured');
    return null;
  }
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (STRAPI_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
  }

  const url = `${STRAPI_URL}/api${endpoint}`;
  console.log('[Strapi] Fetching:', url);

  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    console.error('[Strapi] Error:', response.status, response.statusText, 'for', url);
    return null;
  }
  
  const json = await response.json();
  console.log('[Strapi] Response for', endpoint, ':', json);
  return json;
}


// Transform Strapi Personal Info to frontend format
interface StrapiPersonalInfo {
  data: {
    name: string;
    title: string;
    bio: string;
    profileImage?: { url: string };
    formspreeEndpoint: string;
    cvUrl?: string;
    socialLinks: Array<{
      name: string;
      url: string;
      icon?: { url: string };
    }>;
  };
}

export async function fetchPersonalInfo() {
  const result = await fetchStrapi<StrapiPersonalInfo>(
    '/personal-info?populate[socialLinks][populate]=icon&populate=profileImage'
  );
  
  if (!result?.data) return null;
  
  const d = result.data;
  return {
    name: d.name,
    title: d.title,
    bio: d.bio,
    profileImageUrl: getMediaUrl(d.profileImage?.url),
    formspreeEndpoint: d.formspreeEndpoint,
    cvUrl: d.cvUrl || '',
    socialLinks: d.socialLinks.map(link => ({
      name: link.name,
      url: link.url,
      icon: getMediaUrl(link.icon?.url),
    })),
  };
}

// Transform Strapi Skill Categories
interface StrapiSkillCategories {
  data: Array<{
    name: string;
    order: number;
    skills: Array<{
      name: string;
      icon?: { url: string };
    }>;
  }>;
}

export async function fetchSkillCategories(): Promise<SkillCategory[] | null> {
  const result = await fetchStrapi<StrapiSkillCategories>(
    '/skill-categories?populate[skills][populate]=icon&sort=order:asc'
  );
  
  if (!result?.data) return null;
  
  return result.data.map(cat => ({
    name: cat.name,
    skills: cat.skills.map(skill => ({
      name: skill.name,
      icon: getMediaUrl(skill.icon?.url),
    })),
  }));
}

// Transform Strapi Certifications
interface StrapiCertifications {
  data: Array<{
    title: string;
    issuer: string;
    image?: { url: string };
    link: string;
    order: number;
  }>;
}

export async function fetchCertifications(): Promise<Certification[] | null> {
  const result = await fetchStrapi<StrapiCertifications>(
    '/certifications?populate=image&sort=order:asc'
  );
  
  if (!result?.data) return null;
  
  return result.data.map(cert => ({
    title: cert.title,
    issuer: cert.issuer,
    imageUrl: getMediaUrl(cert.image?.url),
    link: cert.link,
  }));
}

// Transform Strapi Timeline Events
interface StrapiTimelineEvents {
  data: Array<{
    date: string;
    title: string;
    description: string;
    fullDescription: string;
    icon: 'work' | 'education' | 'milestone';
    order: number;
  }>;
}

export async function fetchTimelineEvents(): Promise<TimelineEvent[] | null> {
  const result = await fetchStrapi<StrapiTimelineEvents>(
    '/timeline-events?sort=order:asc'
  );
  
  if (!result?.data) return null;
  
  return result.data.map(event => ({
    date: event.date,
    title: event.title,
    description: event.description,
    fullDescription: event.fullDescription,
    icon: event.icon,
  }));
}

// Transform Strapi Learning Items
interface StrapiLearningItems {
  data: Array<{
    title: string;
    description: string;
    order: number;
  }>;
}

export async function fetchLearningItems(): Promise<LearningItem[] | null> {
  const result = await fetchStrapi<StrapiLearningItems>(
    '/learning-items?sort=order:asc'
  );
  
  if (!result?.data) return null;
  
  return result.data.map(item => ({
    title: item.title,
    description: item.description,
  }));
}

// Transform Strapi Stats
interface StrapiStats {
  data: Array<{
    label: string;
    value: number;
    order: number;
  }>;
}

export async function fetchStats() {
  const result = await fetchStrapi<StrapiStats>('/stats?sort=order:asc');
  
  if (!result?.data) return null;
  
  return result.data.map(stat => ({
    label: stat.label,
    value: stat.value,
  }));
}

// Transform Strapi Projects
interface StrapiProjects {
  data: Array<{
    title: string;
    description: string;
    image?: { url: string };
    githubUrl?: string;
    interactiveComponent?: 'Game2048';
    order: number;
  }>;
}

export async function fetchProjects(): Promise<Project[] | null> {
  const result = await fetchStrapi<StrapiProjects>(
    '/projects?populate=image&sort=order:asc'
  );
  
  if (!result?.data) return null;
  
  return result.data.map(project => ({
    title: project.title,
    description: project.description,
    imageUrl: getMediaUrl(project.image?.url),
    githubUrl: project.githubUrl,
  }));
}

// Transform Strapi Testimonials
interface StrapiTestimonials {
  data: Array<{
    quote: string;
    author: string;
    company: string;
    order: number;
  }>;
}

export async function fetchTestimonials(): Promise<Testimonial[] | null> {
  const result = await fetchStrapi<StrapiTestimonials>(
    '/testimonials?sort=order:asc'
  );
  
  if (!result?.data) return null;
  
  return result.data.map(testimonial => ({
    quote: testimonial.quote,
    author: testimonial.author,
    company: testimonial.company,
  }));
}

// Fetch all portfolio data at once
export async function fetchAllPortfolioData() {
  const [
    personalInfo,
    skills,
    certifications,
    timeline,
    learning,
    stats,
    projects,
    testimonials,
  ] = await Promise.all([
    fetchPersonalInfo(),
    fetchSkillCategories(),
    fetchCertifications(),
    fetchTimelineEvents(),
    fetchLearningItems(),
    fetchStats(),
    fetchProjects(),
    fetchTestimonials(),
  ]);

  return {
    personalInfo,
    skills,
    certifications,
    timeline,
    learning,
    stats,
    projects,
    testimonials,
  };
}