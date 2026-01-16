export interface UserDto {
  id: number;
  name: string;
  surname: string;
  email: string;
  skills: string[];
  createdAt: string;
}

export interface GetUsersParams {
  page?: number;
  email?: string;
}

export interface UsersMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UsersResponse {
  data: UserDto[];
  meta: UsersMeta;
}

export interface CreateUserPayload {
  name: string;
  surname: string;
  email: string;
  skills: string[];
}

export interface UpdateUserPayload extends CreateUserPayload {
  id: number;
}
