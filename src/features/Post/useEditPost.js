import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editPostApi } from "../../services/PostApi";

export function useEditPost(post_id, user_id, success) {
  const queryClient = useQueryClient();
  const {
    mutate: editPost,
    isPending: isLoadEditPost,
    error: errorEditPost,
  } = useMutation({
    mutationFn: (formData) => {
      return editPostApi(formData);
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
      toast.success("User edited post successfully!.");
      success();
    },
    onError: (err) => {
      console.log("ERROR: ", err);
      toast.error("ERROR: ", err);
    },
  });

  return { editPost, isLoadEditPost, errorEditPost };
}
