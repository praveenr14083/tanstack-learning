import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export default function Delete({ id, onClose }) {
  const client = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (userId) => api.delete(`/users/${userId}`),
    onSuccess: () => client.invalidateQueries(["users"]),
  });

  const handleDelete = () => {
    deleteMutation.mutate(id);
    onClose();
  };

  return (
    <div
      style={{ border: "1px solid red", padding: "10px", marginTop: "10px" }}
    >
      <h3>Are you sure you want to delete this user?</h3>
      <button
        style={{ color: "white", background: "red" }}
        onClick={handleDelete}
      >
        Yes, Delete
      </button>

      <button style={{ marginLeft: "10px" }} onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}
