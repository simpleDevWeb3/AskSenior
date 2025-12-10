import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPostApi } from "../../services/PostApi";
import { editAccountApi } from "../../services/AuthApi";

export function useEditAccount(success) {
  const queryClient = useQueryClient();
  const {
    mutate: editAccount,
    isPending: isLoadEditAccount,
    error: errorEditAccount,
  } = useMutation({
    mutationFn: ({ user_id, formData }) => {
      return editAccountApi(user_id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();

      toast.success("Account details updated successfully!");
      success?.();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { editAccount, isLoadEditAccount, errorEditAccount };
}
