import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { banCommunityApi } from "../../../../services/CommunityApi";

export function useBanCommunity(success) {
  const queryClient = useQueryClient();
  const {
    mutate: banCommunity,
    isPending: isLoadbanCommunity,
    error: errorbanCommunity,
  } = useMutation({
    mutationFn: (formData) => {
      return banCommunityApi(formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      toast.success("Community has been banned.");

      if (success) success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { banCommunity, isLoadbanCommunity, errorbanCommunity };
}
