
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
