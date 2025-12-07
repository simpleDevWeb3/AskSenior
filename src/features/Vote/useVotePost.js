import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { voteApi } from "../../services/VoteApi";

export function useVotePost() {
  const queryClient = useQueryClient();

  const {
    mutate: votePost,
    isPending: isLoadVote,
    error: errorVote,
  } = useMutation({
    mutationFn: (variables) => {
      const apiPayload = { ...variables };

      if (apiPayload.comment_id) {
        apiPayload.post_id = null;
      }

      return voteApi(apiPayload);
    },

    onSuccess: async (_, variables) => {
      !toast.success("Vote successful!");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),

        queryClient.invalidateQueries({
          queryKey: ["postComment", variables.post_id],
        }),

        queryClient.invalidateQueries({
          queryKey: ["postByVote", true],
        }),
        queryClient.invalidateQueries({
          queryKey: ["userCommented"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["postByVote", false],
        }),
      ]);
    },

    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error(err.message);
    },
  });

  return { votePost, isLoadVote, errorVote };
}
