import { useQuery } from "@tanstack/react-query";

import { getCommunityByAdminApi } from "../../../../services/CommunityApi";

export function useFetchCommunityAdmin(adminId) {
  const {
    data: community,
    isLoading: isLoadCommunity,
    error: errorCommunity,
  } = useQuery({
    queryKey: ["CommunityGetByAdmin"],
    queryFn: () => getCommunityByAdminApi(adminId),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { community, isLoadCommunity, errorCommunity };
}
