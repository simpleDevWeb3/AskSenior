import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { leaveCommunityApi } from "../../services/CommunityApi";

export function useLeaveCommunity() {
  const queryClient = useQueryClient();

  const { mutateAsync: leaveCommunity, isPending: isLoadingleaveCommunity } =
    useMutation({
      mutationFn: ({ community_id, user_id }) =>
        leaveCommunityApi({ community_id, user_id }),

      onSuccess: (_, variables) => {
        toast.success("Leave Community Successfully!");
        queryClient.invalidateQueries({ queryKey: ["communities"] });
        queryClient.invalidateQueries({ queryKey: ["joinedCommunity"] });
        queryClient.invalidateQueries({
          queryKey: ["community", variables.community_id],
        });
      },
      onError: (err) => {
        console.log("Creation error: ", err);

        toast.error(err.message || "An error occurred");
        throw err;
      },
    });

  return { leaveCommunity, isLoadingleaveCommunity };
}
