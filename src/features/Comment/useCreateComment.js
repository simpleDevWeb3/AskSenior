import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { postCommentApi } from "../../services/CommentsApi";

export function useCreateComment() {
  const queryClient = useQueryClient();

  const { mutateAsync: createComment, isPending: isLoadingCreateComment } =
    useMutation({
      mutationFn: (formData) => {
        return postCommentApi(formData);
      },

      onSuccess: (_, variables) => {
        toast.success("Comment created successfully!");
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        queryClient.invalidateQueries({
          queryKey: ["postComment", variables.postId],
        });
      },
      onError: (err) => {
        console.log("Creation error: ", err);

        toast.error(err.message || "An error occurred");
        throw err;
      },
    });

  return { createComment, isLoadingCreateComment };
}
