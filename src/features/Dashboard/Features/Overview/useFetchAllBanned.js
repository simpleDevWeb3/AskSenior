import { useQuery } from "@tanstack/react-query";
import { getAllBannedApi } from "../../../../services/BannedApi";

export function useFetchAllBanned(AdminId) {
  const {
    data: banned,
    isLoading: isLoadBanned,
    error: errorBanned,
  } = useQuery({
    queryKey: ["Banned"],
    queryFn: () => getAllBannedApi(AdminId),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { banned, isLoadBanned, errorBanned };
}
