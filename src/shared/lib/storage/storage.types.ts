import { UserDto } from "@/shared/api";

export interface UsersCache {
  updatedAt: number;
  users: UserDto[];
}
