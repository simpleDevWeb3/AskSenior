import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/AuthApi";

export function useLogin() {
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      loginApi({ email, password });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", data.user]);
    },
    onError: (err) => {
      console.log("ERROR: ", err);
    },
  });

  return { login, isLoading };
}
