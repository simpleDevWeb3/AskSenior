import styled from "styled-components";
import PostMenusShare from "./PostMenusShare";
import VoteBtn from "../../components/VoteBtn";
import CommentBtn from "../../components/CommentBtn";
import PostMenusOther from "./PostMenusOther";
import { usePost } from "./PostContext";
import { usePostHandler } from "./usePostHandler";
import { useFetchPostComment } from "./useFetchPostComment";

function PostSocialFeatures({ post_id }) {
  const { postData, variant, onClickComment } = usePost();
  const { id } = postData;

  const { comment_id } = postData;
  const { handleVote, handleShare } = usePostHandler();

  return (
    <SocialFeatures $variant={variant}>
      <VoteBtn
        userVote={postData.self_vote}
        onVote={(type) => {
          if (variant === "post" || variant === "user_post")
            handleVote(id, null, type);
          if (variant === "comment") handleVote(post_id, comment_id, type);
        }}
      />
      <CommentBtn
        onComment={() => {
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
  margin-bottom: 0.5rem;
  margin-top: ${({ $variant }) => ($variant === "comment" ? "0" : "1rem")};

  text-align: center;
`;

export default PostSocialFeatures;
