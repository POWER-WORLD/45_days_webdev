import React from "react";

function UserForm({ formData, handleChange, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", gap: "10px", marginBottom: "20px" }}
    >
      <input
        type="text"
        id="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        style={{ flex: 1, padding: "10px" }}
      />
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ flex: 1, padding: "10px" }}
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        style={{ flex: 1, padding: "10px" }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Add User
      </button>
    </form>
  );
}

export default UserForm;
