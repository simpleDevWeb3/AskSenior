import styled, { css } from "styled-components";
import Text from "./Text";
import ButtonIcon from "./ButtonIcon";
import { createContext, useContext } from "react";
import {
  HiChatAlt2,
  HiShare,
  HiOutlineArrowUp,
  HiOutlineArrowDown,
} from "react-icons/hi";

import { usePost } from "../hook/PostHook/usePosts";

// Define variant styles (for post or comment)
const variantSize = {
  post: css`
    font-size: 1rem;
    gap: 0.5rem;
    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  `,
  comment: css`
    font-size: 0.8rem;
    gap: 0.5rem;
    svg {
      width: 0.9rem;
      height: 0.8rem;
    }
  `,
};

const StyledPost = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
  ${({ $variant }) => variantSize[$variant] || variantSize.post}
`;

const Grouped = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
`;

const PostContext = createContext({});

// Main Post component
function Post({ post, children, toComment, variant = "post" }) {
  const { data, state, actions } = usePost(post, toComment);

  const properties = {
    ...data,
    ...state,
    ...actions,
    variant,
  };

  return (
    <PostContext.Provider value={properties}>
      <StyledPost
        $variant={variant}
        onClick={() => (toComment ? actions.handleNavigate() : "")}
      >
        {children}
      </StyledPost>
    </PostContext.Provider>
  );
}

// Subcomponents
Post.Title = function Title() {
  const { title, content, variant } = useContext(PostContext);
  return (
    <Grouped $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{content}</Text>
    </Grouped>
  );
};

const UpVote = styled(HiOutlineArrowUp)``;
const DownVote = styled(HiOutlineArrowDown)``;

Post.Vote = function Vote() {
  const { variant, handleDownVote, handleUpVote, upVote, downVote } =
    useContext(PostContext);
  return (
    <Grouped $center={true} $variant={variant}>
      <ButtonIcon
        action={(e) => handleUpVote(e)}
        variant="outline"
        size={variant === "comment" ? "rounded_small" : "rounded"}
        hover="outline"
        icon={<UpVote />}
        active={upVote}
      />
      <span>4</span>
      <ButtonIcon
        action={(e) => handleDownVote(e)}
        variant="outline"
        size={variant === "comment" ? "rounded_small" : "rounded"}
        hover="icon"
        icon={<DownVote />}
        active={downVote}
      />
    </Grouped>
  );
};

const IShare = styled(HiShare)``;
const IComment = styled(HiChatAlt2)``;

Post.Share = function Share() {
  const { variant, UpVote } = useContext(PostContext);
  return (
    <ButtonIcon
      size={variant === "comment" ? "small" : "medium"}
      hover={"background"}
      icon={<IShare />}
    >
      <span>{variant === "comment" ? "1" : "2"}</span>
    </ButtonIcon>
  );
};

Post.Comment = function Comment() {
  const { variant } = useContext(PostContext);
  return (
    <ButtonIcon
      size={variant === "comment" ? "small" : "medium"}
      hover="background"
      icon={<IComment />}
    >
      <span>{variant === "comment" ? "1" : "2"}</span>
    </ButtonIcon>
  );
};

Post.Image = function Image() {
  const { variant } = useContext(PostContext);
  return (
    <Grouped $vertical={true} $variant={variant}>
      Image placeholder
    </Grouped>
  );
};

export default Post;
