import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/AuthApi";

export function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logoutApi(),
    onSuccess: () => {
      //remove all cache 
      queryClient.removeQueries();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
    },
  });

  return { logout, isLoading };
}
