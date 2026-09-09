import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";

export function userQueryKey(userId: number) {
  return ["user", userId] as const;
}

export function useUser(userId: number | null) {
  return useQuery({
    queryKey: userQueryKey(userId ?? 0),
    queryFn: () => userService.getUserById(userId as number),
    enabled: userId !== null && Number.isInteger(userId) && userId > 0,
  });
}