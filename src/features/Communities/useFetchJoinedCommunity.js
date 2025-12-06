import { useQuery } from "@tanstack/react-query";
import { getUserJoinedCommunityApi } from "../../services/CommunityApi";

export function useFetchJoinedCommunity(user_id) {
  const {
    data: communities,
    isLoading: isLoadCommunities,
    error: errorCommunities,
  } = useQuery({
    queryKey: ["joinedCommunity"],
    queryFn: () => getUserJoinedCommunityApi(user_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { communities, isLoadCommunities, errorCommunities };
}
