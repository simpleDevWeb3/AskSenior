//Component
import VoteBtn from "../VoteBtn";
import CommentBtn from "../CommentBtn";

//SubComponent

import PostMenusOther from "./PostMenusOther";
import PostContent from "./PostContent";

//css
import { variantSize } from "../../styles/VariantSize";
import styled from "styled-components";
import PostProfile from "./PostProfile";
import PostSocialFeatures from "./PostSocialFeatures";

function PostCard({
  postData,
  variant = "post",
  avatarSize = "small",
  onClickPost,
  onClickComment,
  onClickVote,
  onClickShare,
}) {
  const { id, title, content, votes, postComments } = postData;

  return (
    <StyledPost $variant={variant} onClick={() => onClickPost?.()}>
      <PostHeader>
        <PostProfile avatarSize={avatarSize} />
        <PostMenusOther id={id} />
      </PostHeader>
      <PostContent variant={variant} title={title} content={content} />
      <PostSocialFeatures
        variant={variant}
        onClickComment={onClickComment}
        onClickVote={onClickVote}
        onClickShare={onClickShare}
        votes={votes}
        postComments={postComments}
      />
    </StyledPost>
  );
}

const StyledPost = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  ${({ $variant }) => variantSize[$variant] || variantSize.post}
`;

export default PostCard;
