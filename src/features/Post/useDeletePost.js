import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { deletePostApi } from "../../services/PostApi";

export function useDeletePost(user_id, success) {
  const queryClient = useQueryClient();

  const { mutateAsync: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: (post_id) => deletePostApi(post_id),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["posts"] }),
        queryClient.invalidateQueries({ queryKey: ["posts", String(user_id)] }),

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
      toast.success("User deleted post successfully!.");
      success?.();
    },
    onError: (err) => {
      console.log("Deletion error: ", err);

      toast.error(err.message || "An error occurred");
      throw err;
    },
  });

  return { deletePost, isDeletingPost };
}
