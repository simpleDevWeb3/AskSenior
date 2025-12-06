import { useQuery } from "@tanstack/react-query";

import { getPostByVote } from "../../services/PostApi";

export function useFetchPostByUserVote(user_id, vote_type) {
  const {
    data: posts,
    isLoading: isLoadPosts,
    error: errorPosts,
  } = useQuery({
    queryKey: ["postByVote", vote_type],
    queryFn: () => getPostByVote(user_id, vote_type),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { posts, isLoadPosts, errorPosts };
}
