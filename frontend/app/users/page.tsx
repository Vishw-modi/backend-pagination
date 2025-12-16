"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../lib/api";
import { useEffect, useRef } from "react";

export default function UsersPage() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 1, // ✅ REQUIRED in v5
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  // Intersection Observer
  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading users</p>;

  return (
    <div style={{ padding: 24 }}>
      <h1>Infinite Users</h1>

      <ul>
        {data?.pages.map((page) =>
          page.data.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> — {user.email}
            </li>
          ))
        )}
      </ul>

      {/* Sentinel */}
      <div ref={loadMoreRef} style={{ height: 40 }} />

      {isFetchingNextPage && <p>Loading more...</p>}

      {!hasNextPage && <p>✅ All users loaded</p>}
    </div>
  );
}
