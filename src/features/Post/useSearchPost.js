import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPostApi } from "../../services/PostApi";

export function useSearchPosts(curr_user_id, postTitle) {
  const {
    data,
    isLoading: isLoadPost,
    error: errorPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["searchPostResult", postTitle],
    queryFn: ({ pageParam }) =>
      searchPostApi(curr_user_id, postTitle, pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 3) {
        return undefined;
      }

      return allPages.length + 1;
    },

    refetchOnWindowFocus: false,

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 30,

    retry: 1,
  });

  const posts = data?.pages.flat() || [];

  return {
    posts,
    isLoadPost,
    errorPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
