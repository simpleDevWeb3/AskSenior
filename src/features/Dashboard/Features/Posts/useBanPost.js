import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { banPostApi } from "../../../../services/PostApi";

export function useBanPost(success) {
  const queryClient = useQueryClient();
  const {
    mutate: banPost,
    isPending: isLoadBanPost,
    error: errorBanPost,
  } = useMutation({
    mutationFn: (formData) => {
      return banPostApi(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("Post has been banned.");

      if (success) success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { banPost, isLoadBanPost, errorBanPost };
}
