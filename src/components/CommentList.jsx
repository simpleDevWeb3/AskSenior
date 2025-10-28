import styled from "styled-components";
import PostCard from "./PostComponent/PostCard";
import TextFields from "./TextFields";
import { useFieldText } from "../hook/useFieldText";

function CommentList({ comments, onClickVote, onClickComment, onClickShare }) {
  const { isShowTextField, toggleTextField } = useFieldText();

  /*
  comments: [
    {
      id: "cm401",
      postId: "p301",
      authorId: "u101",
      content: "Breville Bambino Plus is great!",
      createdAt: "2025-10-19T09:00:00Z",
      parentId: null,
      votes: [{ userId: "u102", type: "up" }],
    },//level 0
 
    {
      id: "cm403",
      postId: "p301",
      authorId: "u102",
      content: "Second this! I own it too.",
      createdAt: "2025-10-19T09:30:00Z",
      parentId: "cm401",
      votes: [{ userId: "u101", type: "up" }],
    }, //level1  replies  commentLvl :1 
    {
      id: "cm404",
      postId: "p301",
      authorId: "u103",
      content: "Is it good for beginners?",
      createdAt: "2025-10-19T09:45:00Z",
      parentId: "cm403",
      votes: [],//level 2  replies replies   commentLvl :2
    },

     {
      id: "cm404",
      postId: "p301",
      authorId: "u103",
      content: "Is it good for beginners?",
      createdAt: "2025-10-19T09:45:00Z",
      parentId: "cm403",
      votes: [],//level 2  replies replies   commentLvl :2
    },
  */

  const commentsWithLvL = comments.map((comment) => {
    comment.commentLvl = 0;
    if (comment.parentId) {
      const parentComment = comments.find(
        (parent) => parent.id === comment.parentId
      );

      comment.commentLvl = parentComment.commentLvl + 1;
    }
    return comment;
  });

  return (
    <CommentsContainer>
      {commentsWithLvL.map((comment) => (
        <>
          <CommentWrapper commentLvl={comment.commentLvl} key={comment.id}>
            <PostCard
              postData={comment}
              variant="comment"
              avatarSize="small"
              onClickVote={(voteType) => onClickVote?.(comment.id, voteType)}
              onClickComment={() => {
                onClickComment?.(comment.id);
                toggleTextField(comment.id);
              }}
              onClickShare={() => onClickShare?.(comment.id)}
            />
            {isShowTextField === comment.id && <TextFields />}
            {comment.commentLvl > 0 && <CommentRoot />}
          </CommentWrapper>
        </>
      ))}
    </CommentsContainer>
  );
}

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: left;
`;

const CommentRoot = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  height: 4rem; /* adjust per comment height */
  border-right: 1.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  /* draw the bottom "_" */
  &::after {
    content: "";
    position: absolute;
    bottom: 0; /* attach at bottom */
    left: 1px; /* align with vertical line */
    width: 10px; /* length of horizontal part */
    height: 2px;
    border-radius: 25px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const CommentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 700px; /* Match post width */
  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;
  padding: 1rem 1rem 0rem 1rem;
  transition: background-color 0.15s;
  cursor: pointer;
  gap: 0.5rem;

  @media (max-width: 1300px) {
    max-width: 100%;
  }

  //Comment positioning
  margin-left: ${(props) => props.commentLvl * 2}rem;
`;

export default CommentList;
