import { useQuery } from "@tanstack/react-query";
import { getAllPostApi } from "../../services/PostApi";

export function useFetchPosts() {
  const {
    data: posts,
    isLoading: isLoadPost,
    error: errorPost,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPostApi(null),

    refetchOnWindowFocus: false,


    staleTime: 1000 * 60 * 5,

 
    gcTime: 1000 * 60 * 30,


    retry: 1,
  });

  return { posts, isLoadPost, errorPost };
}
