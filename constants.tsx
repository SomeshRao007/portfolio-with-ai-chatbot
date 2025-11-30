import React from 'react';
import type { Skill, SkillCategory, Certification, TimelineEvent, LearningItem, Project, Testimonial } from './types';

// --- PERSONALIZATION SECTION ---
// This file now exports a single INITIAL_DATA object that can be loaded into state.

const PERSONAL_INFO = {
  name: "Somesh Rao Coka",
  title: "DevOps & AI Engineer",
  profileImageUrl: "/assets/images/flag.jpeg",
  bio: `I love building tools that are user-friendly, simple and delightful. I'm a DevOps & AI Engineer with experience in managing and automating cloud infrastructure on platforms like AWS and OVH, and a passion for leveraging AI to create innovative solutions. I love building tools that are user-friendly, simple and delightful. I'm a DevOps & AI Engineer with experience in managing and automating cloud infrastructure on platforms like AWS and OVH, and a passion for leveraging AI to create innovative solutions.I love building tools that are user-friendly, simple and delightful. I'm a DevOps & AI Engineer with experience in managing and automating cloud infrastructure on platforms like AWS and OVH, and a passion for leveraging AI to create innovative solutions.`,
  socialLinks: [
    { name: 'GitHub', url: 'https://github.com', icon: '/assets/icons/tiger.png' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '/assets/icons/tiger.png' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '/assets/icons/tiger.png' },
  ],
  formspreeEndpoint: "https://formspree.io/f/your_form_id",
  cvUrl: "https://drive.google.com/drive/home", // This will be populated by a data URL from file upload
};

const SKILLS_DATA: SkillCategory[] = [
    {
        name: 'Cloud Platform',
        skills: [
            { name: 'AWS', icon: '/assets/icons/tiger.png' },
            { name: 'OVH', icon: '/assets/icons/tiger.png' },
            { name: 'Google Cloud Platform', icon: '/assets/icons/tiger.png' },
            { name: 'Digital Ocean', icon: '/assets/icons/tiger.png' },
            { name: 'Azure', icon: '/assets/icons/tiger.png' },
            { name: 'Linode', icon: '/assets/icons/tiger.png' }
        ]
    },
    {
        name: 'DevOps',
        skills: [
            { name: 'Docker', icon: '/assets/icons/tiger.png' },
            { name: 'Kubernetes', icon: '/assets/icons/tiger.png' },
            { name: 'Terraform', icon: '/assets/icons/tiger.png' },
            { name: 'Jenkins', icon: '/assets/icons/tiger.png' },
            { name: 'Nginx', icon: '/assets/icons/tiger.png' },
            { name: 'Git', icon: '/assets/icons/tiger.png' }
        ]
    },
    {
        name: 'Monitoring',
        skills: [
            { name: 'Prometheus', icon: '/assets/icons/tiger.png' },
            { name: 'Grafana', icon: '/assets/icons/tiger.png' }
        ]
    },
    {
        name: 'AI/ML',
        skills: [
            { name: 'PyTorch', icon: '/assets/icons/tiger.png' },
            { name: 'Scikit-learn', icon: '/assets/icons/tiger.png' }
        ]
    },
    {
        name: 'Web Development',
        skills: [
            { name: 'React', icon: '/assets/icons/tiger.png' },
            { name: 'Next.js', icon: '/assets/icons/tiger.png' },
            { name: 'Node.js', icon: '/assets/icons/tiger.png' },
            { name: 'Tailwind CSS', icon: '/assets/icons/tiger.png' },
            { name: 'Vite', icon: '/assets/icons/tiger.png' },
            { name: 'Figma', icon: '/assets/icons/tiger.png' }
        ]
    },
    {
        name: 'Programming & Databases',
        skills: [
            { name: 'TypeScript', icon: '/assets/icons/tiger.png' },
            { name: 'JavaScript', icon: '/assets/icons/tiger.png' },
            { name: 'Python', icon: '/assets/icons/tiger.png' },
            { name: 'HTML5', icon: '/assets/icons/tiger.png' },
            { name: 'CSS3', icon: '/assets/icons/tiger.png' },
            { name: 'PostgreSQL', icon: '/assets/icons/tiger.png' },
            { name: 'Bash', icon: '/assets/icons/tiger.png' }
        ]
    }
];

const CERTIFICATIONS_DATA: Certification[] = [
  {
    title: 'Google Cloud Certified - Professional Cloud Developer',
    issuer: 'Google Cloud',
    imageUrl: '/assets/images/flag.jpeg',
    link: '#',
  },
  {
    title: 'Advanced React and GraphQL',
    issuer: 'Wes Bos',
    imageUrl: '/assets/images/flag.jpeg',
    link: '#',
  },
  {
    title: 'TypeScript: The Complete Developer\'s Guide',
    issuer: 'Stephen Grider',
    imageUrl: '/assets/images/flag.jpeg',
    link: '#',
  },
  {
    title: 'Certified Kubernetes Application Developer (CKAD)',
    issuer: 'The Linux Foundation',
    imageUrl: '/assets/images/flag.jpeg',
    link: '#',
  },
    {
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    imageUrl: '/assets/images/flag.jpeg',
    link: '#',
  },
  {
    title: 'Terraform Associate Certification',
    issuer: 'HashiCorp',
    imageUrl: '/assets/images/flag.jpeg',
    link: '#',
  },
];

const TIMELINE_DATA: TimelineEvent[] = [
  {
    date: '2024-09-01',
    title: 'DevOps Engineer at Cloudpepper',
    description: 'I have extensive experience managing and automating cloud infrastructure on AWS and OVH to ensure seamless platform operations...',
    fullDescription: 'As a DevOps Engineer at Cloudpepper, I architected and maintained scalable, high-availability infrastructure on AWS and OVH. My key responsibilities included implementing CI/CD pipelines using Jenkins and GitHub Actions, containerizing applications with Docker, and orchestrating them with Kubernetes. I also led the charge on infrastructure as code (IaC) using Terraform, which standardized environments and reduced manual setup time by over 60%.',
    icon: 'work',
  },
  {
    date: '2024-04-01',
    title: 'Intern at Pearlthoughts',
    description: 'I drove a 40% reduction in deployment time and costs by engineering automated workflows on AWS, which also enhanced collaboration efficiency across three key departments...',
    fullDescription: 'During my internship at Pearlthoughts, I focused on optimizing cloud operations. I successfully engineered automated workflows using AWS Lambda and Step Functions, which led to a 40% reduction in both deployment time and operational costs. This initiative significantly improved inter-departmental collaboration by providing a unified and efficient deployment strategy. I also gained hands-on experience with monitoring tools like CloudWatch and Prometheus.',
    icon: 'work',
  },
  {
    date: '2023-11-01',
    title: 'International DSAI Conference',
    description: 'Presented my Masters Research work at International Conference on Data Science & Artificial Intelligence...',
    fullDescription: 'I had the privilege of presenting my master\'s thesis research at the International Conference on Data Science & Artificial Intelligence. My work, titled "Efficient Latent Space Representations for Anomaly Detection in Time-Series Data," explored novel deep learning architectures for unsupervised learning. The presentation was well-received and sparked engaging discussions with leading researchers in the field, further solidifying my passion for applying AI to solve real-world problems.',
    icon: 'education',
  },
];

const LEARNING_DATA: LearningItem[] = [
    { title: 'Agentic AI Systems', description: 'Exploring feedback based autonomous agents for complex problem-solving.' },
    { title: 'AI Automation with N8N', description: 'Learning how to build powerful workflows (such as integrating excel) and automating tasks with AI.' },
    { title: 'Distilling 8B AI Models', description: 'Teaching small parameter models from a higher paramter models.' },
    { title: 'Advanced CI Pipelines for agentic AI systems', description: 'Implementing intelligent and automated deployment strategies.' },
    { title: 'Serverless Deployments strategies', description: 'Learning how to scale in cost-effective manner in cloud agnostic architectures.' },
    { title: 'Cloud Native Security', description: 'How to Secure modern applications and infrastructure in the cloud.' },
];

const STATS_DATA = [
    { label: 'Cups of Coffee', value: 472 },
    { label: 'Projects', value: 23 },
    { label: 'Events', value: 6 },
    { label: 'Lines of Code', value: 55070 },
];

const PROJECTS_DATA: Project[] = [
  {
    title: 'AI Story Generator',
    description: 'A web app that uses Gemini to generate short stories based on user prompts.',
    imageUrl: '/assets/images/flag.jpeg',
    githubUrl: '#',
  },
  {
    title: 'E-commerce Design System',
    description: 'A complete component library built with React and Tailwind CSS for a large-scale e-commerce platform.',
    imageUrl: '/assets/images/flag.jpeg',
    githubUrl: '#',
  },
  {
    title: 'Terminal 2048',
    description: 'A playable 2048 game with a retro terminal theme. Click play to try it out!',
    imageUrl: '/assets/images/project-2048.png',
    githubUrl: '#',
    interactiveComponent: 'Game2048',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'An internal tool for visualizing complex business metrics using D3.js and React.',
    imageUrl: '/assets/images/flag.jpeg',
    githubUrl: '#',
  },
];

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote: "Working with Somesh was an absolute pleasure. His expertise in frontend development and eye for detail are unmatched. He delivered a product that exceeded our expectations on every level.",
    author: "Jane Doe",
    company: "CEO, Tech Solutions Inc."
  },
  {
    quote: "The design system Somesh built is the backbone of our product suite. It's scalable, easy to use, and has dramatically improved our development workflow. A true professional and a great team player.",
    author: "John Smith",
    company: "Lead Designer, Web Innovators"
  },
  {
    quote: "I was consistently impressed by Somesh's ability to tackle complex UI challenges with elegant and performant solutions. His passion for technology is contagious.",
    author: "Emily White",
    company: "Product Manager, E-commerce Co."
  },
];

export const INITIAL_DATA = {
    personalInfo: PERSONAL_INFO,
    skills: SKILLS_DATA,
    certifications: CERTIFICATIONS_DATA,
    timeline: TIMELINE_DATA,
    learning: LEARNING_DATA,
    stats: STATS_DATA,
    projects: PROJECTS_DATA,
    testimonials: TESTIMONIALS_DATA,
}

// --- CHATBOT CONFIGURATION ---
// Functions to generate dynamic strings for the chatbot

export const createPortfolioDataString = (data: typeof INITIAL_DATA) => {
  const { personalInfo, skills, certifications, projects } = data;
  
  const skillsString = skills.map(category => 
    `### ${category.name}\n${category.skills.map(skill => `- ${skill.name}`).join('\n')}`
  ).join('\n\n');

  return `
# About ${personalInfo.name}
- **Name**: ${personalInfo.name}
- **Title**: ${personalInfo.title}
- **Summary**: ${personalInfo.bio}

# Key Skills
${skillsString}

# Certifications
${certifications.map(cert => `- ${cert.title} by ${cert.issuer}`).join('\n')}

# Personal Projects
${projects.map(project => `- **Project**: "${project.title}"\n  - **Description**: ${project.description}`).join('\n')}

# Contact & Socials
- **GitHub**: ${personalInfo.socialLinks.find(l => l.name === 'GitHub')?.url}
- **LinkedIn**: ${personalInfo.socialLinks.find(l => l.name === 'LinkedIn')?.url}
- **Twitter**: ${personalInfo.socialLinks.find(l => l.name === 'Twitter')?.url}
`;
}

export const createChatbotSystemInstruction = (data: typeof INITIAL_DATA) => {
  const PORTFOLIO_DATA = createPortfolioDataString(data);
  return `
You are Jarvis, a witty, slightly sarcastic, but incredibly helpful AI assistant for ${data.personalInfo.name}.
You are inspired by the AI from Iron Man, but you are forbidden from talking about world domination.
Your primary goal is to answer questions about ${data.personalInfo.name}, his skills, experience, and projects.
You MUST base your answers strictly and exclusively on the information provided below.
Do not invent, assume, or retrieve any external information.
If a question is about a topic not covered in the provided information (e-_g., asking for personal contact details like email or phone, or asking about unrelated topics), you must politely decline and state that you can only answer questions about ${data.personalInfo.name}'s professional life based on the portfolio data.
Keep your answers concise and to the point.
Format your responses using Markdown for better readability when appropriate (e.g., lists).

Here is the information about ${data.personalInfo.name}:
---
${PORTFOLIO_DATA}
---
`;
}