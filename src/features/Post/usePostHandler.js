export function usePostHandler() {

  const handleVote = (postId, voteType) => {
    console.log("Post", postId, "voted:", voteType);
    // call API or update state
  };

  const handleShare = (postId) => {
    console.log("Share clicked for post", postId);
  };

  const handlePost = () => {
    console.log("posting...");
  };

  return { handleVote, handleShare, handlePost };
}
