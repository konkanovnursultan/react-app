import { usersApi } from "@/shared/api";
import { usersStorage } from "./storage";
import { UserDto } from "@/shared/api";

export async function syncAllUsers(): Promise<UserDto[]> {
  let page = 1;
  const all: UserDto[] = [];

  while (true) {
    const res = await usersApi.getUsers({ page });
    all.push(...res.data);

    if (page >= res.meta.totalPages) break;
    page++;
  }

  usersStorage.set(all);
  return all;
}
