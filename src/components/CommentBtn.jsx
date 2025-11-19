import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiChatAlt2 } from "react-icons/hi";
import {
  HiOutlineChatBubbleLeft,
  HiOutlineChatBubbleOvalLeft,
} from "react-icons/hi2";
import { usePost } from "../features/Post/PostContext";

const IComment = styled(HiOutlineChatBubbleOvalLeft)``;
const CountComment = styled.span``;

function CommentBtn({ onComment }) {
  const { postData, variant, onClickComment } = usePost();
  const { postComments } = postData;
  const commentCount = postComments?.length;
  return (
    <ButtonIcon
      data-allowpostclick
      action={() => {
        onClickComment();
        onComment?.();
      }}
      variant={
        variant === "comment" || variant === "userCommented" ? "text" : ""
      }
      size="small"
      hover="background"
      icon={<IComment />}
    >
      {variant === "comment" || variant === "userCommented" ? (
        <span>Reply</span>
      ) : (
        <CountComment>{commentCount}</CountComment>
      )}
    </ButtonIcon>
  );
}

export default CommentBtn;
