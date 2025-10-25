import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getAllProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/projects`);
        console.log("Fetched projects:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects from database:', error);
        throw error;
    }
};

export const addProject = async (projectData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error adding project to database:', error);
        throw error;
    }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/projects/${id}`, projectData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting project from database:', error);
        throw error;
    }
};