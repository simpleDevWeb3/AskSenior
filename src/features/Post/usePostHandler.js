import { useUser } from "../Auth/useUser";
import { useVotePost } from "../Vote/useVote";

/*
--data '{
  "vote_id": null,
  "post_id": null,
  "user_id": null,
  "comment_id": null,
  "is_upvote": true,
  "created_at": null
   */
export function usePostHandler() {
  const { votePost, isLoadVote, errorVote } = useVotePost();
  const { user } = useUser();
  const handleVote = (post_id, voteType) => {
    console.log("Post", post_id, "voted:", voteType);
   
    let userVote = null;
    if (voteType === "up") {
      userVote = true;
    } else if (voteType === "down") {
      userVote = false;
    }

    votePost({
      post_id,
      user_id: user.id,
      is_upvote: userVote,
    });
  };

  const handleShare = (post_id) => {
    console.log("Share clicked for post", postId);
  };

  const handlePost = () => {
    console.log("posting...");
  };

  return { handleVote, handleShare, handlePost };
}
