import api from "./api";

export const login = async (credentials) => {
  const { data } = await api.post("/auth/login", credentials);
  return data;
};

export const register = async (newUser) => {
  const { data } = await api.post("/auth/register", newUser);
  return data;
};
