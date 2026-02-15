// Type Definitions for MAKEWAYS Website

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface CoreValue {
  icon: any; // Lucide React icon component
  title: string;
  description: string;
}

export interface Service {
  id: number;
  icon: any; // Lucide React icon component
  title: string;
  description: string;
  features: string[];
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'TVC' | 'PRINT' | 'DIGITAL' | 'EVENT' | 'JINGLE';
  image: string;
}

export interface Client {
  id: number;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  quote: string;
  image: string;
}

export type PortfolioCategory = 'ALL' | 'TVC' | 'PRINT' | 'DIGITAL' | 'EVENT' | 'JINGLE';