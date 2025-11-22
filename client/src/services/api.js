import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.get('/auth/logout'),
};

// User API
export const userAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
};

// Pregnancy API
export const pregnancyAPI = {
  getPregnancyInfo: () => api.get('/pregnancy'),
  createPregnancyInfo: (data) => api.post('/pregnancy', data),
  updatePregnancyInfo: (data) => api.put('/pregnancy', data),
  addWeightMeasurement: (data) => api.post('/pregnancy/weight', data),
  addSymptom: (data) => api.post('/pregnancy/symptoms', data),
  addAppointment: (data) => api.post('/pregnancy/appointments', data),
};

// Growth API
export const growthAPI = {
  getGrowthData: () => api.get('/growth'),
  createGrowthRecord: (data) => api.post('/growth', data),
  addGrowthMeasurement: (data) => api.post('/growth/measurements', data),
  updateMilestone: (id, data) => api.put(`/growth/milestones/${id}`, data),
  addVaccination: (data) => api.post('/growth/vaccinations', data),
};

// Feeding API
export const feedingAPI = {
  getFeedingData: () => api.get('/feeding'),
  startFeedingSession: (data) => api.post('/feeding/start', data),
  endFeedingSession: (sessionId, data) => api.put(`/feeding/end/${sessionId}`, data),
  updateFeedingPreferences: (data) => api.put('/feeding/preferences', data),
};

// Forum API
export const forumAPI = {
  getPosts: (params = {}) => api.get('/forum', { params }),
  getPost: (id) => api.get(`/forum/${id}`),
  createPost: (data) => api.post('/forum', data),
  updatePost: (id, data) => api.put(`/forum/${id}`, data),
  deletePost: (id) => api.delete(`/forum/${id}`),
  addReply: (postId, data) => api.post(`/forum/${postId}/replies`, data),
  likePost: (postId) => api.put(`/forum/${postId}/like`),
};

// Profile API
export const profileAPI = {
  getProfile: () => api.get('/profile'),
  updateProfile: (data) => api.put('/profile', data),
  addEmergencyContact: (data) => api.post('/profile/emergency-contacts', data),
  updateEmergencyContact: (contactId, data) => api.put(`/profile/emergency-contacts/${contactId}`, data),
  deleteEmergencyContact: (contactId) => api.delete(`/profile/emergency-contacts/${contactId}`),
  addHealthCondition: (data) => api.post('/profile/health-conditions', data),
  updateHealthCondition: (conditionId, data) => api.put(`/profile/health-conditions/${conditionId}`, data),
  addMedication: (data) => api.post('/profile/medications', data),
};

export default api;