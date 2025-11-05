import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
// ✅ Fetch function
const fetchUsers = async () => {
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
};
export default function TanstackFetchPage() {
  // ✅ useQuery hook
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;

  return (
    <div>
      <h1 className="text-center p-5 font-bold text-3xl">
        TanStack Query Fetch
      </h1>

      {data.map((user) => (
        <Link
          className="underline text-blue-400"
          key={user.id}
          to={`/tanstack-query-by-id/${user.id}`}
        >
          <div style={{ marginBottom: "10px" }}>
            <strong>{user.name}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}
