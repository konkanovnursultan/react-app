import { UserDto } from "@/shared/api";

const STORAGE_KEY = "users";

export const usersStorage = {
  set(users: UserDto[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  },

  get(): UserDto[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },

  getById(id: number): UserDto | undefined {
    return this.get().find((u) => u.id === id);
  },

  update(id: number, patch: Partial<UserDto>) {
    const users = this.get();
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) return;

    users[index] = {
      ...users[index],
      ...patch,
    };

    this.set(users);
  },
};
