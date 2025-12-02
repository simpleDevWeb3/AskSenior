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
    mutationFn: (voteData) => {
      return voteApi(voteData);
    },
    onSuccess: (_, variables) => {
      toast.success("User voted post successfully!.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({
        queryKey: ["postComment", variables.post_id],
      });
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { votePost, isLoadVote, errorVote };
}
