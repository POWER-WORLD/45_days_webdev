import React, { useEffect, useState } from "react";
import UserForm from "../components/userform";
import UserTable from "../components/usertable";
import { fetchUsersApi, addUserApi } from "../services/api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Load users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsersApi();
      setUsers(data.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await addUserApi(formData);
      alert(result.message || "User added!");
      setFormData({ username: "", email: "", password: "" }); // reset form
      fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container" style={{ maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>User Management</h1>
      <h2>Add New User</h2>

      <UserForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h2 style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        All Users
        <button
          onClick={fetchUsers}
          style={{
            padding: "6px 12px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </h2>

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
}

export default UserManagement;
