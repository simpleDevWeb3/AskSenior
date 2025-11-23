import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getTopicsApi } from "../../services/PreferenceApi";

export function useTopic() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["topics"],
    queryFn: getTopicsApi,
    onError: (err) => {
      
      toast.error(err.response?.data?.error || "Failed to fetch topics");
    },
    staleTime: 1000 * 60 * 5, // 5 minutes caching
  });

  return {
    topics: data || [],
    isLoading,
    isError,
    error,
  };
}
