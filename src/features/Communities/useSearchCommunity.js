import { useQuery } from "@tanstack/react-query";
import { searchCommunityApi } from "../../services/CommunityApi";

export function useSearchCommunity(query) {
  const {
    data: community,
    isLoading: isLoadCommunity,
    error: errorCommunity,
  } = useQuery({
    queryKey: ["searchCommunityResult", query],
    queryFn: () => searchCommunityApi(query),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { community, isLoadCommunity, errorCommunity };
}
