import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
});

export const maintenanceService = {
  getAll: () => api.get('/maintenances'),
  getById: (id) => api.get(`/maintenances/${id}`),
  create: (data) => api.post('/maintenances', data),
  update: (id, data) => api.put(`/maintenances/${id}`, data),
  delete: (id) => api.delete(`/maintenances/${id}`),
};

export default api;