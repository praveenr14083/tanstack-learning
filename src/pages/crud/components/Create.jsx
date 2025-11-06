import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../api/axios";

export default function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const client = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newUser) => api.post("/users", newUser),
    onSuccess: () => client.invalidateQueries(["users"]),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h2>Create User</h2>

      <input
        value={name}
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button type="submit">Add</button>
    </form>
  );
}
