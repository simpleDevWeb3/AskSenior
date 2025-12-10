import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { delCommentApi } from "../../services/CommentsApi";

export function useDeleteComment(success) {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteComment, isPending: isDeletingComment } =
    useMutation({
      mutationFn: ({ comment_id, user_id, post_id }) => {
        return delCommentApi(comment_id, user_id, post_id);
      },

      onSuccess: async (_, variables) => {
        toast.success("Delete Comment  Successfully!");
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["posts"] }),
          queryClient.invalidateQueries({
            queryKey: ["posts", String(variables.user_id)],
          }),

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

        success?.();
      },
      onError: (err) => {
        console.log("Creation error: ", err);

        toast.error(err.message || "An error occurred");
        throw err;
      },
    });

  return { deleteComment, isDeletingComment };
}
