import { useQuery } from "@tanstack/react-query";
import { getAllUserApi } from "../../../../services/UsersApi";

export function useFetchUsers() {
  const {
    data: users,
    isLoading: isLoadUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUserApi(),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { users, isLoadUsers, errorUsers };
}
