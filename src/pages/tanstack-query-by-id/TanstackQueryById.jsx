import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchUser = async (userId) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  return data;
};
export default function TanstackQueryById() {
  const { userId } = useParams();

  // ✅ useQuery hook
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (isError) return <h2>Error: {error.message}</h2>;
  return (
    <div className="p-2 bg-blue-500 rounded text-white">
      <p>Name: {data?.name}</p>
      <p>Username: {data?.username}</p>
      <p>Email: {data?.email}</p>
    </div>
  );
}
