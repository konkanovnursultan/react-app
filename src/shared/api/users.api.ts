import {
  UsersResponse,
  GetUsersParams,
  CreateUserPayload,
  UpdateUserPayload,
} from "./users.types";

import { usersStorage } from "../lib/storage/storage";

const BASE_URL = "http://localhost:8080/api/users";

export const usersApi = {
  /*
   * GET /api/users
   */
  async getUsers(params?: GetUsersParams): Promise<UsersResponse> {
    const url = new URL(BASE_URL);

    if (params?.page) {
      url.searchParams.set("page", String(params.page));
    }

    if (params?.email) {
      url.searchParams.set("email", params.email);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data: UsersResponse = await response.json();

    if (params?.page === 1) {
      usersStorage.set(data.data);
    }

    return data;
  },

  /*
   * POST /api/users
   */
  async createUser(payload: CreateUserPayload): Promise<{ id: number }> {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    usersStorage.clear();
    return response.json();
  },

  /*
   * PUT /api/users/:id
   */
  async updateUser(payload: UpdateUserPayload): Promise<{ updated: boolean }> {
    const { id, ...body } = payload;

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    usersStorage.clear();
    return response.json();
  },

  /*
   * DELETE /api/users/:id
   */
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete user");
    }

    usersStorage.clear();
  },
};
