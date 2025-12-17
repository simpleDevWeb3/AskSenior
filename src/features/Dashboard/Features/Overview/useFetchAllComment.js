import { useQuery } from "@tanstack/react-query";
import { getAllCommentApi } from "../../../../services/CommentsApi";

export function useFetchAllComments() {
  const {
    data: comments,
    isLoading: isLoadComments,
    error: errorComments,
  } = useQuery({
    queryKey: ["AllComments"],
    queryFn: () => getAllCommentApi(),

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { comments, isLoadComments, errorComments };
}
