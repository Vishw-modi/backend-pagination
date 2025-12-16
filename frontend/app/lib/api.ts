export async function fetchUsers({ pageParam = 1 }: { pageParam?: number }) {
  const res = await fetch(
    `http://localhost:5000/users?page=${pageParam}&limit=10`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
