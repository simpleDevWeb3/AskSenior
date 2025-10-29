import styled from "styled-components";
import PostMenusShare from "./PostMenusShare";
import VoteBtn from "../../components/VoteBtn";
import CommentBtn from "../../components/CommentBtn";
import PostMenusOther from "./PostMenusOther";
import { usePost } from "./PostContext";
import { usePostHandler } from "./usePostHandler";

function PostSocialFeatures() {
  const { postData, variant, onClickComment } = usePost();
  const { id, votes, postComments } = postData;
  const { handleVote, handleShare } = usePostHandler();
  const commentNum = postComments?.length;
  return (
    <SocialFeatures>
      <VoteBtn variant={variant} votes={votes} onVote={() => handleVote(id)} />
      <CommentBtn
        variant={variant}
        commentCount={commentNum}
        onComment={(e) => {
          variant === "comment" ? e.stopPropagation() : "";
          onClickComment();
        }}
      />

      <PostMenusShare
        variant={variant}
        onClickShare={() => handleShare(id)}
        id={id}
      />
      {variant === "comment" && <PostMenusOther variant={"comment"} />}
    </SocialFeatures>
  );
}

const SocialFeatures = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export default PostSocialFeatures;
