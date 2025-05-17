
import type { LucideIcon } from 'lucide-react';

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  technologies: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  longDescription: string; // Added for detailed page content
  imageUrl: string;
  imageHint: string;
  projectUrl?: string;
  githubUrl?: string;
  technologiesUsed: string[]; // Added for detailed page
}

export interface NavItem {
  href: string;
  label: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO date string e.g., '2024-05-18'
  author?: string;
  summary: string;
  contentHtml: string; // Changed from content to contentHtml
  imageUrl: string;
  imageHint: string;
  tags?: string[];
}
