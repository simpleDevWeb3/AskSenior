import { useQuery } from "@tanstack/react-query";
import { getCommunityApi } from "../../services/CommunityApi";

export function useFetchCommunity(community_id) {
  const {
    data: community,
    isLoading: isLoadCommunity,
    error: errorCommunity,
  } = useQuery({
    queryKey: ["community", community_id],
    queryFn: () => getCommunityApi(community_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { community, isLoadCommunity, errorCommunity };
}
