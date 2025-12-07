import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { voteApi } from "../../services/VoteApi";

export function useVoteComment() {
  const queryClient = useQueryClient();
  const {
    mutate: voteComment,
    isPending: isLoadVote,
    error: errorVote,
  } = useMutation({
    mutationFn: (voteData) => {
      return voteApi(voteData);
    },
    onSuccess: (_, variables) => {
      toast.success("User voted post successfully!.");
      queryClient.invalidateQueries({
        queryKey: ["postComment", variables.post_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["userCommented"],
      });
      queryClient.invalidateQueries({
        queryKey: ["postByVote", true],
      });
      queryClient.invalidateQueries({
        queryKey: ["postByVote", false],
      });
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { voteComment, isLoadVote, errorVote };
}
