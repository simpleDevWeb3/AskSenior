import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useDebounce } from "../../hook/useDebound";
import { useState } from "react";
import { getIsDupGroupNameApi } from "../../services/CommunityApi";

export function useIsDupGroupname(groupname) {
  const [debounceGroupname, setDebounceGroupname] = useState("");
  useDebounce(setDebounceGroupname, groupname, 500);
  const {
    data: isDupGroupname,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["isDupEmail", debounceGroupname],
    queryFn: () => getIsDupGroupNameApi(debounceGroupname),
    enabled: !!debounceGroupname,
    retry: false,
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to validate");
    },
  });

  return {
    isDupGroupname,
    isLoading,
    isError,
    error,
  };
}
