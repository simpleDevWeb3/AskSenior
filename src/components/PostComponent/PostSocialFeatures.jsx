import PostMenusShare from "./PostMenusShare";

function PostSocialFeatures() {
  return (
    <SocialFeatures>
      <VoteBtn variant={variant} votes={votes} onVote={() => onClickVote?.()} />
      <CommentBtn
        variant={variant}
        commentCount={postComments?.length}
        onComment={() => {
          onClickComment?.();
        }}
      />

      <PostMenusShare variant={variant} onClickShare={onClickShare} id={id} />
    </SocialFeatures>
  );
}

export default PostSocialFeatures;
