//SubComponent

import PostMenusOther from "./PostMenusOther";
import PostContent from "./PostContent";
import PostProfile from "./PostProfile";
import PostSocialFeatures from "./PostSocialFeatures";

//css
import { variantSize } from "../../styles/VariantSize";
import styled from "styled-components";
import PostContext from "./PostContext";
import { usePostNavigation } from "./usePostNavigation";

function PostCard({
  postData,
  variant = "post",
  avatarSize = "small",
  onClickComment,
}) {
  const { handleClickPost } = usePostNavigation();
  const contextValue = {
    postData,
    variant,
    avatarSize,
    onClickComment,
  };

  return (
    <PostContext.Provider value={contextValue}>
      <StyledPost
        $variant={variant}
        onClick={() => (variant !== "post" ? "" : handleClickPost(postData.id))}
      >
        <PostHeader>
          <PostProfile />
          {variant === "post" && <PostMenusOther />}
        </PostHeader>
        <PostContent />
        <PostSocialFeatures />
      </StyledPost>
    </PostContext.Provider>
  );
}

const StyledPost = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  ${({ $variant }) => variantSize[$variant] || variantSize.post}
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default PostCard;
