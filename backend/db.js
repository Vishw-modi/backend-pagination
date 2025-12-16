export const users = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `users${i + 1}@example.com`,
}));
