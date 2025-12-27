// Type definitions for CV website data structures

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  phone?: string;
  avatar?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Skill {
  name: string;
  category: 'development' | 'platforms' | 'nocode' | 'design' | 'other';
  level: number; // 0-100
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: 'mobile' | 'web' | 'other';
  technologies: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // undefined means current
  description: string;
  achievements: string[];
  logo?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface CVData {
  personal: PersonalInfo;
  social: SocialLink[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certificates: Certificate[];
}

