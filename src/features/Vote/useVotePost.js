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
    // --- 1. THE FIX IS HERE ---
    mutationFn: (variables) => {
      // Create a clean copy for the API
      const apiPayload = { ...variables };

      // If we have a comment_id, we MUST NOT send the post_id to the server
      // otherwise the server thinks we are voting on the post.
      if (apiPayload.comment_id) {
        apiPayload.post_id = null;
      }

      // Send the cleaned payload to the API
      return voteApi(apiPayload);
    },

    // --- 2. INVALIDATION STILL WORKS ---
    onSuccess: async (_, variables) => {
      // 'variables' here is still the ORIGINAL object you passed in.
      // So variables.post_id still exists here!

      toast.success("Vote successful!");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),

        // We can safely use post_id here because 'variables' wasn't modified
        queryClient.invalidateQueries({
          queryKey: ["postComment", variables.post_id],
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
