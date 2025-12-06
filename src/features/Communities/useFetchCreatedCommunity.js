import { useQuery } from "@tanstack/react-query";
import { getCreatedCommunityApi } from "../../services/CommunityApi";

export function useFetchCreatedCommunity(user_id) {
  const {
    data: createdCommunities,
    isLoading: isLoadCreatedCommunities,
    error: errorCreatedCommunities,
  } = useQuery({
    queryKey: ["createdCommunities"],
    queryFn: () => getCreatedCommunityApi(user_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { createdCommunities, isLoadCreatedCommunities,errorCreatedCommunities };
}
