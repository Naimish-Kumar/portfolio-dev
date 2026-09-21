const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // If running in browser on dev.acrocoder.com or localhost
    if (window.location.hostname.includes('acrocoder.com')) {
      return 'https://api.acrocoder.com/api';
    }
    if (process.env.NEXT_PUBLIC_API_URL) {
      return process.env.NEXT_PUBLIC_API_URL;
    }
    return 'http://localhost:5005/api';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'https://api.acrocoder.com/api';
};

export const API_BASE = getBaseUrl();

export interface Profile {
  id?: number;
  name?: string;
  full_name?: string;
  title?: string;
  headline?: string;
  bio?: string;
  avatar_url?: string;
  available_for_hire?: boolean;
  email?: string;
  phone?: string;
  location?: string;
  github_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  resume_url?: string;
}

export interface Project {
  id?: number;
  title?: string;
  slug?: string;
  description?: string;
  short_description?: string;
  long_description?: string;
  category?: string;
  technologies?: string;
  tags?: string[];
  image_url?: string;
  demo_url?: string;
  live_url?: string;
  github_url?: string;
  featured?: boolean;
  order_num?: number;
}

export interface Experience {
  id?: number;
  company: string;
  position?: string;
  role?: string;
  duration?: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
  technologies?: string;
  order_num?: number;
}

export interface Education {
  id?: number;
  institution: string;
  degree: string;
  year?: string;
  field_of_study?: string;
  start_year?: number;
  end_year?: number;
  description?: string;
  order_num?: number;
}

// Helper to get auth header
export const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('acrocoder_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const defaultPortfolioData = {
  profile: {
    id: 1,
    name: 'Akash Verma',
    full_name: 'Akash Verma',
    title: 'Software Engineer | Java & Mobile Systems Developer',
    headline: 'Software Engineer | Java & Mobile Systems Developer | 7+ Years Exp | IoT, Microservices & Flutter',
    bio: 'Software Engineer with 7+ years of overall experience bridging hardware and software systems, including 3 years of dedicated Java enterprise development. Proven expertise in developing production-ready, cross-platform mobile applications integrated with IoT hardware, microservices, and real-time backend services. Skilled in firmware-to-cloud communication, IoT protocols (MQTT, BLE), and system-level performance optimization.',
    avatar_url: '/naimish_portrait.png',
    available_for_hire: true,
    email: 'akash@spirehubs.com',
    phone: '+91 9536824061',
    location: 'Noida, India',
    github_url: 'https://github.com/akash-verma',
    linkedin_url: 'https://linkedin.com/in/akash-verma',
    twitter_url: 'https://twitter.com/akash_verma',
    resume_url: 'https://acrocoder.com/resume.pdf',
  },
  projects: [
    {
      id: 1,
      title: 'Congo Bon Marché - E-Commerce & Marketplace Ecosystem',
      slug: 'congobonmarche-ecommerce',
      short_description: 'Premier multi-vendor e-commerce marketplace and logistics platform in Central Africa with mobile apps for iOS & Android.',
      long_description: 'End-to-end multi-vendor e-commerce ecosystem designed for DRC and Central Africa. Features high-performance web storefront, native iOS & Android applications built with Flutter, multi-currency wallet support, Mobile Money (Airtel/Orange Money) payment gateways, real-time push order dispatch, and seller analytics dashboard.',
      category: 'Mobile & Web E-Commerce',
      technologies: 'Flutter, iOS, Android, Java Spring Boot, Next.js, Mobile Money, REST API',
      tags: ['Flutter', 'iOS App', 'Android App', 'Java Spring Boot', 'E-Commerce', 'Mobile Money'],
      image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://congobonmarche.com',
      demo_url: 'https://play.google.com/store/apps/details?id=org.congobonmarche&pcampaignid=web_share',
      github_url: 'https://apps.apple.com/in/app/congobonmarch%C3%A9-app/id6443672495',
      featured: true,
      order_num: 1,
    },
    {
      id: 2,
      title: 'DarziDesk - Boutique & Custom Tailoring Management SaaS',
      slug: 'darzidesk-boutique-saas',
      short_description: 'Cloud-based bespoke tailoring ERP & boutique management platform with automated measurement profiles, work orders, and WhatsApp notifications.',
      long_description: 'Comprehensive SaaS platform built for fashion designers, bespoke tailors, and boutique studios. Streamlines client body measurement profiles, custom stitching work orders, fabric inventory tracking, automated invoice generation, and real-time WhatsApp delivery notifications with sub-100ms response times.',
      category: 'Production SaaS',
      technologies: 'Next.js 14, Java Spring Boot, MySQL, Tailwind CSS, REST API, WhatsApp API',
      tags: ['Next.js 14', 'Java Spring Boot', 'MySQL', 'Tailwind CSS', 'SaaS', 'ERP'],
      image_url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://darzidesk.shop',
      featured: true,
      order_num: 2,
    },
    {
      id: 3,
      title: 'Spacebliz - Creative Digital Agency & Software Platform',
      slug: 'spacebliz-digital-agency',
      short_description: 'High-performance digital agency platform featuring 3D interactive interfaces, modern full-stack architectures, and AI cloud engineering.',
      long_description: 'Dynamic high-performance agency portal and software engineering platform showcasing bespoke digital product development, interactive 3D WebGL interfaces, cloud native infrastructure, and enterprise AI integrations with 99+ Lighthouse performance scores.',
      category: 'Creative Tech & Agency',
      technologies: 'React, Next.js, Three.js, Java Spring Boot, Tailwind CSS, AI MCP Tools',
      tags: ['React', 'Next.js', 'Three.js 3D', 'Java Spring Boot', 'Cloud Architecture', 'AI MCP'],
      image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://spacebliz.com',
      featured: true,
      order_num: 3,
    },
    {
      id: 4,
      title: 'HomiQ Real-Estate Marketplace',
      slug: 'homiq-real-estate',
      short_description: 'Direct real estate & rental marketplace connecting owners, buyers, and renters with zero brokerage fees, verified listings, and smart search.',
      long_description: 'Production real-estate marketplace serving thousands of active buyers and renters. Features interactive maps, instant chat, mortgage estimation, and verified identity workflows.',
      category: 'Shipped App',
      technologies: 'Flutter, iOS, Android, Java Spring Boot, Google Maps, REST API',
      tags: ['Flutter', 'iOS', 'Android', 'Java Spring Boot', 'Real Estate', 'Google Maps'],
      image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://apps.apple.com/in/app/homiq-real-estate-marketplace/id6779412636',
      demo_url: 'https://play.google.com/store/apps/details?id=com.homiq.acrocoder&hl=en_IN',
      featured: true,
      order_num: 4,
    },
    {
      id: 5,
      title: 'Healthosyst Healthcare Platform',
      slug: 'healthosyst-telemedicine',
      short_description: 'Comprehensive telemedicine app allowing patients to discover doctors, book appointments, and consult via encrypted video.',
      long_description: 'Enterprise healthcare suite featuring encrypted WebRTC video consultations, electronic health records (EHR), prescription management, and appointment queuing.',
      category: 'Shipped App',
      technologies: 'Flutter, WebRTC, Telemedicine, Java Spring Boot, iOS, Android',
      tags: ['Flutter', 'WebRTC', 'Telemedicine', 'Java Spring Boot', 'iOS', 'Android'],
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://apps.apple.com/in/app/healthosyst/id6702022061',
      demo_url: 'https://play.google.com/store/apps/details?id=com.healthosyst.app',
      featured: true,
      order_num: 5,
    },
    {
      id: 6,
      title: 'Coach-By-App Fitness Suite',
      slug: 'coach-by-app-fitness',
      short_description: 'Live fitness coaching platform featuring automated workout plans, live trainer chat via Socket.IO, and recurring subscriptions.',
      long_description: 'Real-time fitness tracking and coaching app with live trainer messaging via Socket.IO, automated workout routine scheduling, and in-app subscription billing.',
      category: 'Shipped App',
      technologies: 'Flutter, Socket.IO, Stripe, Java Microservices, iOS, Android',
      tags: ['Flutter', 'Socket.IO', 'Stripe', 'Java Microservices', 'iOS', 'Android'],
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://apps.apple.com/in/app/coach-by-app/id6467117400',
      demo_url: 'https://play.google.com/store/apps/details?id=com.coachbyapp.app',
      featured: true,
      order_num: 6,
    },
    {
      id: 7,
      title: 'DoodleJoy - Creative Canvas Web & Mobile App',
      slug: 'doodlejoy-canvas',
      short_description: 'Interactive web & mobile drawing application for kids featuring magic brushes, smooth canvas rendering, and secure sharing.',
      long_description: 'Interactive drawing application for web and mobile featuring sub-16ms custom canvas rendering, glow shaders, multi-touch brush engines, and cloud galleries.',
      category: 'Shipped App',
      technologies: 'Flutter, Canvas 60fps, Web, Android, Clean Architecture',
      tags: ['Flutter', 'Canvas 60fps', 'Web', 'Android', 'Clean Architecture', 'BLoC'],
      image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://doodlejoy.fun/',
      demo_url: 'https://play.google.com/store/apps/details?id=com.acrocoder.doodlejoy&hl=en_IN',
      featured: true,
      order_num: 7,
    },
  ],
  experience: [
    {
      id: 1,
      company: 'SpireHub Softwares Pvt Ltd, Noida',
      position: 'Senior Software Engineer',
      role: 'Senior Software Engineer',
      duration: 'JUN 2023 – PRESENT',
      start_date: '2023-06-01',
      is_current: true,
      description: 'Lead mobile and backend engineering initiatives, overseeing Clean Architecture implementations, conducting code reviews, and mentoring cross-functional engineering teams. Architect scalable real-time integrations using WebSockets and Socket.IO while streamlining CI/CD automation pipelines for mobile and cloud deployments. Drive mobile performance optimization (<16ms frame render target), cloud services integration, and payment gateway infrastructure across client products.',
      technologies: 'Flutter, Android, Clean Architecture, WebSockets, Socket.IO, Node.js, Express.js, CI/CD, Payment Gateways',
      order_num: 1,
    },
    {
      id: 2,
      company: 'Enterprise Software Solutions, Noida',
      position: 'Java Enterprise Developer',
      role: 'Java Enterprise Developer',
      duration: 'MAY 2020 – MAY 2023',
      start_date: '2020-05-01',
      end_date: '2023-05-01',
      is_current: false,
      description: 'Spent 3 years designing and deploying mission-critical Java enterprise backends using Java 17, Spring Boot, Spring Cloud microservices, and PostgreSQL. Engineered high-throughput event-streaming telemetry pipelines using Apache Kafka, managing real-time data ingestion for large-scale IoT system deployments. Implemented enterprise OAuth2/JWT security filters, Redis caching, and dynamic thread pool optimizations to sustain 99.99% system availability.',
      technologies: 'Java 17, Spring Boot, Spring Cloud, PostgreSQL, Apache Kafka, Redis, OAuth2/JWT, Microservices',
      order_num: 2,
    },
    {
      id: 3,
      company: 'TechSmart Mobile Systems, Noida',
      position: 'Associate Software Engineer — Mobile & Systems',
      role: 'Associate Software Engineer — Mobile & Systems',
      duration: 'JUN 2017 – APR 2020',
      start_date: '2017-06-01',
      end_date: '2020-04-01',
      is_current: false,
      description: 'Developed cross-platform mobile applications and Android native software utilizing Java, RESTful APIs, and local databases. Collaborated on hardware-software integration for IoT-enabled mobile accessories and Bluetooth Low Energy (BLE) device communication protocols.',
      technologies: 'Java, Android Native, RESTful APIs, BLE (Bluetooth Low Energy), IoT Integration, SQLite',
      order_num: 3,
    },
  ],
  education: [
    {
      id: 1,
      institution: 'Galgotias University',
      degree: 'B.Tech in Computer Science & Engineering',
      year: '2013 – 2017',
      field_of_study: 'Computer Science & Engineering',
      description: 'Comprehensive study of Software Engineering, Operating Systems, Computer Networks, Database Systems, and Distributed Computing.',
      order_num: 1,
    },
  ],
};

// Fetch full portfolio
export async function fetchPortfolio() {
  try {
    const res = await fetch(`${API_BASE}/portfolio`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch portfolio data');
    const data = await res.json();
    if (data.data && data.data.projects && data.data.projects.length > 0) {
      return data.data;
    }
    return defaultPortfolioData;
  } catch (error) {
    console.warn('Fetch portfolio error, loading default portfolio data:', error);
    return defaultPortfolioData;
  }
}

// Send contact message
export async function sendContactMessage(payload: { name: string; email: string; message: string; subject?: string }) {
  const res = await fetch(`${API_BASE}/portfolio/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      subject: payload.subject || '2026 Portfolio Contact Memo',
      message: payload.message,
    }),
  });
  return res.json();
}

export const submitContact = sendContactMessage;

// Admin Auth
export async function adminLogin(credentials: { usernameOrEmail: string; password: string }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function checkAdminSession() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function changeAdminPassword(payload: { currentPassword: string; newPassword: string }) {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return res.json();
}

// Admin CRUD Helpers
export async function adminUpdateProfile(data: any) {
  const res = await fetch(`${API_BASE}/admin/profile`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminUpdateHero(data: any) {
  const res = await fetch(`${API_BASE}/admin/hero`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function adminSaveProject(project: any, isEdit = false, id?: number) {
  const url = isEdit ? `${API_BASE}/admin/projects/${id}` : `${API_BASE}/admin/projects`;
  const method = isEdit ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function adminDeleteProject(id: number) {
  const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function adminSaveSkill(skill: any, isEdit = false, id?: number) {
  const url = isEdit ? `${API_BASE}/admin/skills/${id}` : `${API_BASE}/admin/skills`;
  const method = isEdit ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(skill),
  });
  return res.json();
}

export async function adminDeleteSkill(id: number) {
  const res = await fetch(`${API_BASE}/admin/skills/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function adminSaveExperience(exp: any, isEdit = false, id?: number) {
  const url = isEdit ? `${API_BASE}/admin/experience/${id}` : `${API_BASE}/admin/experience`;
  const method = isEdit ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(exp),
  });
  return res.json();
}

export async function adminDeleteExperience(id: number) {
  const res = await fetch(`${API_BASE}/admin/experience/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function adminSaveEducation(edu: any, isEdit = false, id?: number) {
  const url = isEdit ? `${API_BASE}/admin/education/${id}` : `${API_BASE}/admin/education`;
  const method = isEdit ? 'PUT' : 'POST';
  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(),
    body: JSON.stringify(edu),
  });
  return res.json();
}

export async function adminDeleteEducation(id: number) {
  const res = await fetch(`${API_BASE}/admin/education/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function adminGetMessages() {
  const res = await fetch(`${API_BASE}/admin/messages`, {
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function adminMarkMessageRead(id: number, is_read: boolean) {
  const res = await fetch(`${API_BASE}/admin/messages/${id}/read`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ is_read }),
  });
  return res.json();
}

export async function adminDeleteMessage(id: number) {
  const res = await fetch(`${API_BASE}/admin/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.json();
}

export async function adminUpdateSettings(settings: Record<string, string>) {
  const res = await fetch(`${API_BASE}/admin/settings`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(settings),
  });
  return res.json();
}
