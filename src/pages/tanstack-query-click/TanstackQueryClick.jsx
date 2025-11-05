import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function TanstackQueryClick() {
  // ✅ Fetch function
  const fetchUsers = async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    return data;
  };

  // ✅ useQuery hook
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: false,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;
  return (
    <div>
      <h1 className="text-center p-5 font-bold text-3xl">
        TanStack Query Fetch
      </h1>

      {data?.map((user) => (
        <div key={user?.id} style={{ marginBottom: "10px" }}>
          <strong>{user?.name}</strong> — {user?.email}
        </div>
      ))}

      <button className="bg-blue-500 p-2 text-white" onClick={refetch}>
        Load more
      </button>
    </div>
  );
}
