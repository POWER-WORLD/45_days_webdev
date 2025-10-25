import api from './api';

export const getAllExperiences = () => api.get('/experiences');
export const getExperience = (id) => api.get(`/experiences/${id}`);
export const createExperience = (data) => api.post('/experiences', data);
export const updateExperience = (id, data) => api.put(`/experiences/${id}`, data);
export const deleteExperience = (id) => api.delete(`/experiences/${id}`);