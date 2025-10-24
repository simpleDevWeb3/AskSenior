//Display recommended Post

import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../../components/PostList";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;
function HomePosts() {
  const { posts } = forumData;

  return (
    <StyledContainer>
      <PostList posts={posts} />
    </StyledContainer>
  );
}

export default HomePosts;
