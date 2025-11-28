import { useQuery } from "@tanstack/react-query";
import { getAllPostApi } from "../../services/PostApi";

export function useFetchCurrUserPost(user_id) {
  const {
    data: posts,
    isLoading: isLoadPost,
    error: errorPost,
  } = useQuery({
    queryKey: ["posts", user_id],
    queryFn: () => getAllPostApi(user_id),

    efetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  return { posts, isLoadPost, errorPost };
}
