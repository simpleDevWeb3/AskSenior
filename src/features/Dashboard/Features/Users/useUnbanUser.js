import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { banUserApi } from "../../../../services/UsersApi";

export function useUnbanUser(success) {
  const queryClient = useQueryClient();
  const {
    mutate: unbanUser,
    isPending: isLoadUnbanUser,
    error: errorUnbanUser,
  } = useMutation({
    mutationFn: (formData) => {
      return banUserApi(formData);
    },
    onSuccess:  () => {
      queryClient.invalidateQueries();
      toast.success("Unbaned User Sucess!.");

      if (success) success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { unbanUser, isLoadUnbanUser, errorUnbanUser };
}
