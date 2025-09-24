const API_BASE = "/api/users";

// Get all users
export const fetchUsersApi = async () => {
  const res = await fetch(API_BASE);
  return res.json();
};

// Add new user
export const addUserApi = async (userData) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};
