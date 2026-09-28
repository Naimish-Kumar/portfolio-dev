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
    name: 'Naimish Kumar Verma',
    full_name: 'Naimish Kumar Verma',
    title: 'Flutter Developer | Mobile & Full-Stack Engineer',
    headline: 'Flutter Developer | Mobile & Full-Stack Engineer | 2+ Years Exp | Open-Source Contributor',
    bio: 'Results-driven Flutter Developer with 2+ years of professional experience designing and shipping scalable cross-platform mobile applications for Android and iOS. Proficient in Flutter, Dart, Firebase, REST APIs, real-time systems (Socket.IO), and payment gateway integration (PayPal, Authorize.net). Published 5+ production applications on Google Play Store and Apple App Store. Hands-on open-source contributor with 4 published pub.dev packages.',
    avatar_url: '/akash_portrait_bw.jpg',
    available_for_hire: true,
    email: 'vnaimishkumar@gmail.com',
    phone: '+91-9536824061',
    location: 'Noida, India',
    github_url: 'https://github.com/vnaimishkumar',
    linkedin_url: 'https://linkedin.com/in/vnaimishkumar',
    twitter_url: '',
    resume_url: 'https://acrocoder.com/resume.pdf',
  },
  projects: [
    {
      id: 1,
      title: 'Healthosyst — Healthcare Appointment Booking Platform',
      slug: 'healthosyst-telemedicine',
      short_description: 'Full-featured healthcare appointment booking platform with doctor discovery, real-time slot availability, and appointment management for patients and providers.',
      long_description: 'Architected and built a full-featured healthcare appointment booking platform with doctor discovery, real-time slot availability, and appointment management for patients and providers. Integrated Google Maps SDK for hospital/clinic location search, distance calculation, and turn-by-turn directions via deep linking. Implemented Firebase FCM push notifications for appointment reminders, cancellations, and real-time status updates. Developed multi-role authentication (patient, doctor, admin) with JWT-secured API calls and token refresh handling.',
      category: 'Shipped Mobile App',
      technologies: 'Flutter, Dart, Firebase (Auth, Firestore, FCM), Google Maps API, Node.js REST API, BLoC',
      tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Node.js', 'BLoC', 'Healthcare'],
      image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://play.google.com/store/apps/details?id=com.healthosyst.app',
      demo_url: 'https://play.google.com/store/apps/details?id=com.healthosyst.app',
      github_url: 'https://apps.apple.com/in/app/healthosyst/id6702022061',
      featured: true,
      order_num: 1,
    },
    {
      id: 2,
      title: 'Coach-By-App — Real-Time Fitness Coaching Platform',
      slug: 'coach-by-app-fitness',
      short_description: 'Live fitness coaching app enabling real-time coach-client communication via Socket.IO chat, video tutorials, and Authorize.net subscription billing.',
      long_description: 'Developed a live fitness coaching app enabling real-time coach-client communication via Socket.IO-powered chat and session tracking. Built a workout library with video tutorials (Chewie/VideoPlayer), animated exercise demonstrations, and progress logging with chart visualizations (fl_chart). Implemented personalized workout plan generation with schedule management, rest-day tracking, and push notification reminders. Integrated Authorize.net for subscription billing with plan upgrade/downgrade flows and payment history screens.',
      category: 'Shipped Mobile App',
      technologies: 'Flutter, Dart, Socket.IO, Firebase, Authorize.net, Node.js, VideoPlayer, fl_chart',
      tags: ['Flutter', 'Dart', 'Socket.IO', 'Firebase', 'Authorize.net', 'Node.js', 'VideoPlayer', 'fl_chart'],
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://play.google.com/store/apps/details?id=com.coachbyapp.app',
      demo_url: 'https://play.google.com/store/apps/details?id=com.coachbyapp.app',
      github_url: 'https://apps.apple.com/in/app/coach-by-app/id6467117400',
      featured: true,
      order_num: 2,
    },
    {
      id: 3,
      title: 'Smyline — Business Management Platform',
      slug: 'smyline-business-platform',
      short_description: 'Dental aligner treatment companion app enabling patients to track orthodontic progress, manage treatment stages, and monitor smile transformation digitally.',
      long_description: 'Developed a dental aligner treatment companion app enabling patients to track orthodontic progress, manage treatment stages, and monitor smile transformation digitally. Built appointment scheduling and clinic management features allowing users to book consultations, receive reminders, and stay connected with dental professionals. Implemented treatment timeline tracking with aligner change notifications, progress monitoring, and patient engagement workflows.',
      category: 'Shipped Mobile App',
      technologies: 'Flutter, Firebase (Auth, Firestore, Storage), REST APIs, Hive, Clean Architecture',
      tags: ['Flutter', 'Firebase', 'REST APIs', 'Hive', 'Clean Architecture', 'Dental App'],
      image_url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://play.google.com/store/apps/details?id=com.smyline.app',
      demo_url: 'https://play.google.com/store/apps/details?id=com.smyline.app',
      github_url: 'https://apps.apple.com/in/app/smyline/id6470000000',
      featured: true,
      order_num: 3,
    },
    {
      id: 4,
      title: 'Ancient Mystic Music — Music Streaming Application',
      slug: 'ancient-mystic-music',
      short_description: 'Full-featured music streaming app with playlist management, background audio playback (just_audio, audio_service), and equalizer controls.',
      long_description: 'Developed a full-featured music streaming app with playlist management, background audio playback (just_audio, audio_service), and equalizer controls. Implemented subscription-based access with PayPal payment integration, entitlement management, and graceful paywall flows. Built offline listening with local caching of purchased tracks and download progress tracking UI.',
      category: 'Shipped Mobile App',
      technologies: 'Flutter, just_audio, audio_service, PayPal SDK, Firebase, Provider',
      tags: ['Flutter', 'just_audio', 'audio_service', 'PayPal SDK', 'Firebase', 'Provider'],
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://play.google.com/store/apps/details?id=com.ancientmysticmusic.app',
      demo_url: 'https://play.google.com/store/apps/details?id=com.ancientmysticmusic.app',
      github_url: 'https://apps.apple.com/in/app/ancient-mystic-music/id6480000000',
      featured: true,
      order_num: 4,
    },
    {
      id: 5,
      title: 'CongoBonMarché — E-Commerce Shopping Platform',
      slug: 'congobonmarche-ecommerce',
      short_description: 'Built a full-featured e-commerce shopping app for the Congolese market, enabling product discovery, cart management, and order tracking.',
      long_description: 'Built a full-featured e-commerce shopping app for the Congolese market, enabling product discovery, cart management, and order tracking for both Android and iOS users. Implemented multi-language support, secure user authentication, and real-time inventory updates with Firebase Firestore synchronization. Published and maintained on both Google Play Store and Apple App Store with production-level performance optimization.',
      category: 'Shipped Mobile App',
      technologies: 'Flutter, Dart, Firebase (Auth, Firestore, Storage), REST APIs, BLoC, Clean Architecture',
      tags: ['Flutter', 'Dart', 'Firebase', 'REST APIs', 'BLoC', 'Clean Architecture', 'E-Commerce'],
      image_url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://play.google.com/store/apps/details?id=org.congobonmarche',
      demo_url: 'https://play.google.com/store/apps/details?id=org.congobonmarche',
      github_url: 'https://apps.apple.com/in/app/congobonmarch%C3%A9-app/id6443672495',
      featured: true,
      order_num: 5,
    },
    {
      id: 6,
      title: 'audio_waveform_recorder',
      slug: 'audio-waveform-recorder',
      short_description: 'Real-time audio recording with animated waveform visualization package for Flutter apps.',
      long_description: 'Published pub.dev open-source Flutter package for real-time audio recording with animated waveform visualization. Supports MP3/WAV/AAC output, customizable wave colors/amplitude, and platform channels for native audio access.',
      category: 'Pub.dev Open Source Package',
      technologies: 'Flutter, Dart, Native Platform Channels, Audio Recording, Waveform UI',
      tags: ['Open Source', 'Pub.dev', 'Flutter Package', 'Audio', 'Dart'],
      image_url: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://pub.dev/packages/audio_waveform_recorder',
      demo_url: 'https://pub.dev/packages/audio_waveform_recorder',
      github_url: 'https://github.com/vnaimishkumar/audio_waveform_recorder',
      featured: true,
      order_num: 6,
    },
    {
      id: 7,
      title: 'chat_secure_guard',
      slug: 'chat-secure-guard',
      short_description: 'End-to-end chat encryption utilities for Flutter apps implementing AES-256-GCM and RSA key exchange.',
      long_description: 'Published pub.dev open-source Flutter package providing end-to-end chat encryption utilities. Implements AES-256-GCM and RSA key exchange with secure storage integration via flutter_secure_storage.',
      category: 'Pub.dev Open Source Package',
      technologies: 'Flutter, Dart, AES-256-GCM, RSA Key Exchange, flutter_secure_storage',
      tags: ['Open Source', 'Pub.dev', 'Flutter Package', 'Encryption', 'Security'],
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://pub.dev/packages/chat_secure_guard',
      demo_url: 'https://pub.dev/packages/chat_secure_guard',
      github_url: 'https://github.com/vnaimishkumar/chat_secure_guard',
      featured: true,
      order_num: 7,
    },
    {
      id: 8,
      title: 'flutter_performance_optimizer',
      slug: 'flutter-performance-optimizer',
      short_description: 'Developer toolkit for analyzing widget rebuilds, frame render times, and memory usage in Flutter.',
      long_description: 'Published pub.dev open-source Flutter developer toolkit for analyzing widget rebuilds, frame render times, and memory usage. Includes overlay dashboard with real-time FPS monitoring and performance optimization suggestions.',
      category: 'Pub.dev Open Source Package',
      technologies: 'Flutter, Dart, FPS Overlay, Memory Profiler, Rebuild Tracker',
      tags: ['Open Source', 'Pub.dev', 'Flutter Package', 'Performance', 'DevTools'],
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://pub.dev/packages/flutter_performance_optimizer',
      demo_url: 'https://pub.dev/packages/flutter_performance_optimizer',
      github_url: 'https://github.com/vnaimishkumar/flutter_performance_optimizer',
      featured: true,
      order_num: 8,
    },
    {
      id: 9,
      title: 'flutter_architecture_generator',
      slug: 'flutter-architecture-generator',
      short_description: 'CLI + IDE plugin that auto-scaffolds BLoC/Clean Architecture folder structure and dependency injection.',
      long_description: 'Published pub.dev open-source CLI + IDE plugin tool that auto-scaffolds BLoC/Clean Architecture folder structure, generates boilerplate files, and wires dependency injection for new Flutter features.',
      category: 'Pub.dev Open Source Package',
      technologies: 'Flutter, Dart CLI, BLoC Scaffolding, Clean Architecture, Pub.dev',
      tags: ['Open Source', 'Pub.dev', 'Flutter Package', 'Clean Architecture', 'CLI'],
      image_url: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://pub.dev/packages/flutter_architecture_generator',
      demo_url: 'https://pub.dev/packages/flutter_architecture_generator',
      github_url: 'https://github.com/vnaimishkumar/flutter_architecture_generator',
      featured: true,
      order_num: 9,
    },
    {
      id: 10,
      title: 'DoodleJoy — Interactive Drawing Web Platform',
      slug: 'doodlejoy-canvas',
      short_description: 'Interactive drawing & doodling web platform for kids. Built with Next.js and Canvas API. Live at doodlejoy.fun.',
      long_description: 'Interactive drawing & doodling web platform for kids built with Next.js and Canvas API. Features sub-16ms custom canvas rendering, glow shaders, and multi-touch drawing tools. Live at doodlejoy.fun with Android app on Google Play Store.',
      category: 'Web Project',
      technologies: 'Next.js, Canvas API, JavaScript, React, HTML5 Canvas',
      tags: ['Next.js', 'Canvas API', 'Web App', 'Kids App', 'Drawing'],
      image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://doodlejoy.fun',
      demo_url: 'https://play.google.com/store/apps/details?id=com.acrocoder.doodlejoy',
      github_url: 'https://github.com/vnaimishkumar/doodlejoy',
      featured: true,
      order_num: 10,
    },
    {
      id: 11,
      title: 'GreenStreak — Gamified Sustainability Habit Tracker',
      slug: 'greenstreak-sustainability',
      short_description: 'Sustainability habit tracker that gamifies eco-friendly actions with streaks, badges, and social sharing. Live at greenstreak.in.',
      long_description: 'Sustainability habit tracker web platform that gamifies eco-friendly actions with streaks, badges, and social sharing. Built with Next.js and React, empowering users to track daily green activities and compete on leaderboards. Live at greenstreak.in.',
      category: 'Web Project',
      technologies: 'Next.js, React, Node.js, Tailwind CSS, Gamification',
      tags: ['Next.js', 'React', 'Sustainability', 'Gamification', 'Web App'],
      image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://greenstreak.in',
      demo_url: 'https://greenstreak.in',
      github_url: 'https://github.com/vnaimishkumar/greenstreak',
      featured: true,
      order_num: 11,
    },
    {
      id: 12,
      title: 'StudyGate — AI-Powered Parental Control EdTech App',
      slug: 'studygate-ai-edtech',
      short_description: 'AI-powered parental control EdTech app using Flutter, Laravel, MySQL, and Claude API for AI quiz generation.',
      long_description: 'Currently building StudyGate, an AI-powered parental control EdTech app. Integrates Flutter for cross-platform Android & iOS apps, Laravel and MySQL for backend REST services, and Claude API for automated AI quiz generation and educational content curation.',
      category: 'In-Development AI App',
      technologies: 'Flutter, Laravel, MySQL, Claude API, AI EdTech',
      tags: ['Flutter', 'Laravel', 'MySQL', 'Claude API', 'EdTech', 'AI'],
      image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      live_url: 'https://github.com/vnaimishkumar/studygate',
      demo_url: 'https://github.com/vnaimishkumar/studygate',
      github_url: 'https://github.com/vnaimishkumar/studygate',
      featured: true,
      order_num: 12,
    },
  ],
  experience: [
    {
      id: 1,
      company: 'Spirehub Software Pvt Ltd, Noida',
      position: 'Flutter Developer',
      role: 'Flutter Developer',
      duration: 'OCT 2023 – PRESENT',
      start_date: '2023-10-01',
      is_current: true,
      description: 'Architected and deployed 4+ cross-platform mobile applications (Android & iOS) serving thousands of users, following Clean Architecture and BLoC state management patterns for maintainability and scalability. Integrated Firebase services including Authentication, Firestore, Cloud Storage, Remote Config, and Analytics, reducing backend development time by 30%. Implemented bidirectional real-time communication using Socket.IO for live chat, notifications, and data sync across healthcare and fitness platforms. Integrated PayPal and Authorize.net payment gateways with secure tokenized transactions, PCI-compliant flows, and subscription billing support. Optimized app performance by reducing widget rebuild cycles and implementing lazy loading — achieving <16ms frame render times. Set up CI/CD pipelines via GitHub Actions for automated builds.',
      technologies: 'Flutter, Dart, Firebase, Socket.IO, PayPal, Authorize.net, REST APIs, BLoC, Clean Architecture, CI/CD',
      order_num: 1,
    },
  ],
  education: [
    {
      id: 1,
      institution: 'Galgotias University, Greater Noida',
      degree: 'Bachelor of Technology (B.Tech)',
      year: '2019 – 2025',
      field_of_study: 'Computer Science & Engineering',
      description: 'Key coursework: Android Development, Distributed Systems, Network Security, Database Management, Software Engineering, Operating Systems.',
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
