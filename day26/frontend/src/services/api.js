import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // adjust this to match your backend URL

export const getAllWorkExperiences = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/work-experience`);
        console.log("Fetched experiences:", response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching experiences from database:', error);
        throw error;
    }
};

export const addWorkExperience = async (experienceData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/work-experience`, experienceData);
        return response.data;
    } catch (error) {
        console.error('Error adding experience to database:', error);
        throw error;
    }
};

export const deleteWorkExperience = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/work-experience/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting experience from database:', error);
        throw error;
    }
};
