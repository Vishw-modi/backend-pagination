export type User = {
  id: number;
  name: string;
  email: string;
};

export type UserResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: User[];
};
