import type { User } from "../types/user";

const USERS_API = "https://jsonplaceholder.typicode.com/users";

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const userService = {
  getUsers: () => request<User[]>(USERS_API),

  getUserById: (userId: number) =>
    request<User>(`${USERS_API}/${userId}`),
};