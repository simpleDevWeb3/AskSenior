import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPostApi } from "../../services/PostApi";
import { editAccountApi } from "../../services/AuthApi";

export function useEditAccount(post_id, user_id, success) {
  const queryClient = useQueryClient();
  const {
    mutate: editAccount,
    isPending: isLoadEditAccount,
    error: errorEditAccount,
  } = useMutation({
    mutationFn: ({user_id,formData}) => {
      return editAccountApi(user_id,formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("User edited post successfully!.");
      toast.success("Account details updated successfully!");
      if (success) success();
      success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { editAccount, isLoadEditAccount, errorEditAccount };
}
