import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { editCommentApi } from "../../services/CommentsApi";

export function useEditComment(post_id, user_id, success) {
  const queryClient = useQueryClient();
  const {
    mutate: editComment,
    isPending: isLoadEditComment,
    error: errorEditComment,
  } = useMutation({
    mutationFn: ({ commentId, commentData }) => {
      return editCommentApi(commentId, commentData);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["posts", String(user_id)] }),

        queryClient.invalidateQueries({
          queryKey: ["postComment", post_id],
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
      toast.success("User edited comment successfully!.");
      success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { editComment, isLoadEditComment, errorEditComment };
}
