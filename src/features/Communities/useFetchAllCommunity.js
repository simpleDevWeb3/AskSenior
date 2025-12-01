import { useQuery } from "@tanstack/react-query";
import { getAllCommunityApi } from "../../services/CommunityApi";

export function useFetchAllCommunity() {
  const {
    data: communities,
    isLoading: isLoadCommunities,
    error: errorCommunities,
  } = useQuery({
    queryKey: ["communities"],
    queryFn: () => getAllCommunityApi(),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { communities, isLoadCommunities, errorCommunities };
}
