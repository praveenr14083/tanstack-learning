import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/axios";

import Create from "./components/Create";
import Update from "./components/Update";
import Delete from "./components/Delete";

export default function CrudPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // ✅ GET USERS
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <h2>Loading users...</h2>;
  if (error) return <h2>Error loading users</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Page</h1>

      {/* ✅ CREATE COMPONENT */}
      <Create />

      <h2>User List</h2>
      {data?.map((user) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #ccc",
            margin: "10px 0",
            padding: "10px",
          }}
        >
          <h3>{user.name}</h3>
          <p>{user.email}</p>

          <button onClick={() => setSelectedUser(user)}>Update</button>

          <button
            style={{ marginLeft: "10px", color: "red" }}
            onClick={() => setDeleteId(user.id)}
          >
            Delete
          </button>
        </div>
      ))}

      {/* ✅ UPDATE COMPONENT */}
      {selectedUser && (
        <Update user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* ✅ DELETE COMPONENT */}
      {deleteId && <Delete id={deleteId} onClose={() => setDeleteId(null)} />}
    </div>
  );
}
