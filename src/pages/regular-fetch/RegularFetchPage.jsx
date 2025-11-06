import React, { useEffect, useState } from "react";
import { api } from "../../api/axios";

export default function RegularFetchPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUsers = async () => {
    try {
      const { data } = await api.get("/users");

      if (!data) throw new Error("Failed to fetch");
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []); // ✅ runs only once

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h1 className="text-center p-5 font-bold text-3xl">Regular Fetch</h1>

      {data.map((user) => (
        <div key={user.id} style={{ marginBottom: "10px" }}>
          <strong>{user.name}</strong> — {user.email}
        </div>
      ))}
    </div>
  );
}
