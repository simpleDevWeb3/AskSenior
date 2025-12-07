import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "../../services/UsersApi";

export function useFetchUser(user_id) {
  const {
    data: userById,
    isLoading: isLoadUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["userById", user_id],
    queryFn: () =>getUserApi(user_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { userById, isLoadUser, errorUser };
}
