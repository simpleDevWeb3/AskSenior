import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { getIsDupUsernameApi } from "../../services/AuthApi";
import { useDebounce } from "../../hook/useDebound";
import { useState } from "react";

export function useIsDupUsername(username) {
  const [debounceUsername, setDebounceUsername] = useState("");
  useDebounce(setDebounceUsername, username, 500);
  const {
    data: isDupUsername,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["isDupEmail", debounceUsername],
    queryFn: () => getIsDupUsernameApi(debounceUsername),
    enabled: !!debounceUsername,
    retry: false,
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to validate");
    },
  });

  return {
    isDupUsername,
    isLoading,
    isError,
    error,
  };
}
