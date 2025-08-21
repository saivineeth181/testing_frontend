import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for CSRF token if needed
api.interceptors.request.use((config) => {
  return config;
});

export const authAPI = {
  facebookLogin: (accessToken: string) =>
    api.post('/auth/facebook/', { access_token: accessToken }),
  
  logout: () => api.post('/auth/logout/'),
};

export const pagesAPI = {
  getUserPages: () => api.get('/pages/'),
  subscribeWebhooks: (pageId: string) =>
    api.post('/pages/subscribe-webhooks/', { page_id: pageId }),
};

export const webhooksAPI = {
  getEvents: () => api.get('/webhook/events/'),
};