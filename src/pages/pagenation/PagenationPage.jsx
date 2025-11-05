import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function PaginationPage() {
  const [page, setPage] = useState(1);
  const limit = 5; // items per page

  // Total users in API (jsonplaceholder has 10 users)
  const totalItems = 10;
  const totalPages = Math.ceil(totalItems / limit);

  // ✅ Fetch function
  const fetchUsers = async ({ queryKey }) => {
    const [_key, page] = queryKey;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`
    );
    return res.data;
  };

  // ✅ TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: fetchUsers,
    keepPreviousData: true,
  });

  // ✅ State UI
  if (isLoading) return <p className="text-blue-500 font-bold">Loading...</p>;
  if (isError)
    return <p className="text-red-500 font-bold">Error loading data</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">✅ TanStack Pagination</h1>

      {/* List */}
      <ul className="space-y-2">
        {data?.map((item) => (
          <li key={item.id} className="p-3 bg-gray-200 rounded">
            {item.id}. {item.name}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex items-center gap-4 mt-5">
        {/* Previous Button */}
        <button
          className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          ◀ Prev
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => {
            const pageNo = index + 1;
            return (
              <button
                key={pageNo}
                onClick={() => setPage(pageNo)}
                className={`px-4 py-2 rounded 
                  ${
                    page === pageNo
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-black"
                  }
                `}
              >
                {pageNo}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
