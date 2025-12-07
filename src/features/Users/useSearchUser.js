import { useQuery } from "@tanstack/react-query";
import { searchUserApi } from "../../services/UsersApi";

export function useSearchUser(query) {
  const {
    data: users,
    isLoading: isLoadUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["searchUserResult", query],
    queryFn: () => searchUserApi(query),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { users, isLoadUsers, errorUsers };
}
