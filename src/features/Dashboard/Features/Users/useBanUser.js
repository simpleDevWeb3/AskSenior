import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { banUserApi } from "../../../../services/UsersApi";

export function useBanUser(success) {
  const queryClient = useQueryClient();
  const {
    mutate: banUser,
    isPending: isLoadbanUser,
    error: errorbanUser,
  } = useMutation({
    mutationFn: (formData) => {
      return banUserApi(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("User has been banned.");

      if (success) success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { banUser, isLoadbanUser, errorbanUser };
}
