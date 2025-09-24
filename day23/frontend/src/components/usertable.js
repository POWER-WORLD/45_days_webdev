import React from "react";

function UserTable({ users }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ccc", padding: "10px" }}>
            Username
          </th>
          <th style={{ border: "1px solid #ccc", padding: "10px" }}>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          users.map((user) => (
            <tr key={user._id}>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {user.username}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "10px" }}>
                {user.email}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" style={{ textAlign: "center", padding: "10px" }}>
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default UserTable;
