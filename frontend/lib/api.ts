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

// Fetch full portfolio
export async function fetchPortfolio() {
  try {
    const res = await fetch(`${API_BASE}/portfolio`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch portfolio data');
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error('Fetch portfolio error:', error);
    return null;
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
