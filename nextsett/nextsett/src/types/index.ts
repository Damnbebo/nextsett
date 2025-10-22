// Database Models
export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryItem {
  _id: string;
  imageUrl: string;
  category: 'gelx' | 'structured' | 'presson';
  title: string;
  description: string;
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InstagramPost {
  _id: string;
  url: string;
  thumbnail: string;
  caption?: string;
  visible: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentBlock {
  _id: string;
  key: string;
  title: string;
  content: string;
  language: 'en' | 'es';
  updatedAt: Date;
}

export interface Settings {
  _id: string;
  key: string;
  value: string | boolean | number;
  updatedAt: Date;
}

// UI Types
export interface Language {
  code: 'en' | 'es';
  name: string;
  flag: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  features: string[];
  imageUrl?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  preferredContact: 'email' | 'phone' | 'instagram';
}

// 3D Customizer Types
export interface NailShape {
  id: string;
  name: string;
  value: string;
}

export interface NailColor {
  id: string;
  name: string;
  hex: string;
  category: 'nude' | 'bold' | 'pastel' | 'metallic';
}

export interface NailLength {
  id: string;
  name: string;
  value: number; // in mm
}

export interface NailDesign {
  id: string;
  name: string;
  type: 'accent' | 'glitter' | 'pattern' | 'french';
  imageUrl: string;
}

export interface CustomNailConfig {
  shape: NailShape;
  length: NailLength;
  color: NailColor;
  design?: NailDesign;
  accentColor?: NailColor;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Admin Panel Types
export interface AdminStats {
  totalGalleryItems: number;
  totalInstagramPosts: number;
  totalContacts: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'gallery' | 'instagram' | 'contact' | 'content';
  action: 'created' | 'updated' | 'deleted';
  description: string;
  timestamp: Date;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'tiktok' | 'email';
  url: string;
  icon: string;
}

// Form Types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
}

// Gallery Filter Types
export interface GalleryFilter {
  category?: string;
  search?: string;
  sortBy?: 'newest' | 'oldest' | 'name';
}

// Language Content Types
export interface LanguageContent {
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  about: {
    title: string;
    content: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
      submit: string;
    };
  };
  navigation: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    customizer: string;
    contact: string;
  };
}
