import { users } from "./db.js";

export function getUsers(req, res) {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 10, 1);

  const offset = (page - 1) * limit;
  const paginateduser = users.slice(offset, offset + limit);

  const total = users.length;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    page,
    limit,
    total,
    totalPages,
    data: paginateduser,
  });
}
