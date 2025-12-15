import styled from "styled-components";
import PostList from "../Post/PostList";

import CommentList from "../Comment/CommentList";
import PostCard from "../Post/PostCard";
import { useFetchUserComment } from "../Comment/useFetchUserComments";

import Spinner from "../../components/Spinner";
import { useOutletContext } from "react-router-dom";

function CommentedTab() {
  const { userId, isOwnedAcc } = useOutletContext();
  const { comments, isLoadComments, errorComments } =
    useFetchUserComment(userId);
  if (isLoadComments) return <Spinner />;
  if (errorComments)
    return (
      <div>
        <h1>{errorComments}</h1>
      </div>
    );
  return (
    <StyledContainer>
      {comments.map((c) => (
        <>
          <PostWrapper key={c.comment_id}>
            <PostCard variant="comment_vote_user" postData={c} />
          </PostWrapper>
        </>
      ))}
    </StyledContainer>
  );
}

export default CommentedTab;
const StyledContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PostWrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 25px;
  background-color: var(--background-glass);
  cursor: pointer;
  transition: background-color 0.15s;
  &:hover {
    background-color: var(--hover-color);
  }
`;

const Outline = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--hover-color);
`;
