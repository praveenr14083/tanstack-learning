import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export default function Update({ user, onClose }) {
  const client = useQueryClient();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/users/${id}`, data),
    onSuccess: () => client.invalidateQueries(["users"]),
  });

  const handleSave = () => {
    updateMutation.mutate({
      id: user.id,
      data: { name, email },
    });
    onClose();
  };

  return (
    <div
      style={{ border: "1px solid #888", padding: "10px", marginTop: "10px" }}
    >
      <h2>Update User</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={handleSave}>Save</button>
      <button style={{ marginLeft: "10px" }} onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}
