import { useQuery } from "@tanstack/react-query";

import { getUserCommentApi } from "../../services/CommentsApi";

export function useFetchUserComment(user_id) {
  const {
    data: comments,
    isLoading: isLoadComments,
    error: errorComments,
  } = useQuery({
    queryKey: ["userCommented", user_id],
    queryFn: () => getUserCommentApi(user_id),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { comments, isLoadComments, errorComments };
}
