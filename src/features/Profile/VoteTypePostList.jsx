import styled from "styled-components";
import PostCard from "../Post/PostCard";

function VoteTypePostList({ posts }) {
  return posts?.map((p) => (
    <>
      <PostWrapper>
        {p.type === "Post" && (
          <PostCard postData={p} variant="post_vote_user" />
        )}
        {p.type === "Comment" && (
          <PostCard postData={p} variant="comment_vote_user" />
        )}
      </PostWrapper>
      <BreakLine />
    </>
  ));
}

export default VoteTypePostList;
const PostWrapper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;

  padding: 1rem 1rem 0rem 1rem;
  &:hover {
    background-color: rgba(160, 158, 158, 0.1);
  }
  transition: background-color 0.15s;

  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }
  @media (max-width: 800px) {
    border-radius: 0px;
  }

  gap: 0.5rem;
`;

const BreakLine = styled.hr`
  border: 1px solid var(--tertiary-color);
  width: 100%;
`;
