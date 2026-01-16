import { Request, Response } from "express";
import db from "../db/database";

interface UserRow {
  id: number;
  name: string;
  surname: string;
  email: string;
  skills: string;
  created_at: string;
}

interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  skills: string[];
  createdAt: string;
}

/*
 * GET /api/users
 * ?page=1
 * ?email=test@mail.com
 */
export const getUsers = (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const email = String(req.query.email || "")
    .trim()
    .toLowerCase();

  const limit = 10;
  const offset = (page - 1) * limit;

  const where = email ? `WHERE LOWER(email) LIKE ?` : "";

  const params = email ? [`%${email}%`] : [];

  const totalQuery = `
    SELECT COUNT(*) as total
    FROM users
    ${where}
  `;

  const totalResult = db.prepare(totalQuery).get(...params) as {
    total: number;
  };

  const total = totalResult.total;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const safeOffset = Math.min(offset, (totalPages - 1) * limit);

  const dataQuery = `
    SELECT *
    FROM users
    ${where}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const rows = db
    .prepare(dataQuery)
    .all(...params, limit, safeOffset) as UserRow[];

  const users: UserDto[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    surname: row.surname,
    email: row.email,
    skills: JSON.parse(row.skills),
    createdAt: row.created_at,
  }));

  res.json({
    data: users,
    meta: {
      page,
      limit,
      total,
      totalPages,
    },
  });
};

/*
 * POST /api/users
 */
export const createUser = (req: Request, res: Response) => {
  const { name, surname, email, skills } = req.body as {
    name?: string;
    surname?: string;
    email?: string;
    skills?: unknown;
  };

  if (
    typeof name !== "string" ||
    typeof surname !== "string" ||
    typeof email !== "string" ||
    !Array.isArray(skills)
  ) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO users (name, surname, email, skills)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(name, surname, email, JSON.stringify(skills));

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    res.status(400).json({ message });
  }
};

/*
 * PUT /api/users/:id
 */
export const updateUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, surname, email, skills } = req.body as {
    name?: string;
    surname?: string;
    email?: string;
    skills?: unknown;
  };

  if (
    !Number.isInteger(id) ||
    typeof name !== "string" ||
    typeof surname !== "string" ||
    typeof email !== "string" ||
    !Array.isArray(skills)
  ) {
    return res.status(400).json({ message: "Invalid payload" });
  }

  const stmt = db.prepare(`
    UPDATE users
    SET name = ?, surname = ?, email = ?, skills = ?
    WHERE id = ?
  `);

  const result = stmt.run(name, surname, email, JSON.stringify(skills), id);

  res.json({ updated: result.changes > 0 });
};

/*
 * DELETE /api/users/:id
 */
export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  const stmt = db.prepare(`
    DELETE FROM users WHERE id = ?
  `);

  stmt.run(id);

  res.status(204).send();
};
