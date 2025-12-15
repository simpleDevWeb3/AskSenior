import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { banPostApi } from "../../../../services/PostApi";

export function useUnbanPost(success) {
  const queryClient = useQueryClient();
  const {
    mutate: unbanPost,
    isPending: isLoadUnbanPost,
    error: errorUnbanPost,
  } = useMutation({
    mutationFn: (formData) => {
      return banPostApi(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("post han been unbanned successfully.");

      if (success) success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { unbanPost, isLoadUnbanPost, errorUnbanPost };
}
