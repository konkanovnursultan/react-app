import { UserDto } from "@/shared/api";

export type UsersTableMode = "list" | "edit";

export interface UsersTableProps {
  mode: UsersTableMode;
  users: UserDto[];
  onEdit?: (id: number) => void;
  onDeleteSuccess?: () => void;
}
