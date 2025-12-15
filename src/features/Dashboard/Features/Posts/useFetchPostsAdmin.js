import { useQuery } from "@tanstack/react-query";

import { getAllPostAdminApi } from "../../../../services/PostApi";

export function useFetchPostsAdmin() {
  const {
    data: posts,
    isLoading: isLoadPosts,
    error: errorPosts,
  } = useQuery({
    queryKey: ["PostsGetByAdmin"],
    queryFn: () => getAllPostAdminApi(),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { posts, isLoadPosts, errorPosts };
}
