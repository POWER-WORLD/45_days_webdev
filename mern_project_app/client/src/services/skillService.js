import axios from "axios";

const API_URL = "http://localhost:5000/api/skills";

export const getAllSkills = async () => {
  const response = await axios.get(API_URL);
  console.log("Fetched skills:", response.data);
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await axios.post(API_URL, skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await axios.put(`${API_URL}/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};