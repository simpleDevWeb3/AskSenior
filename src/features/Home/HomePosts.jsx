//Display recommended Post

import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import { usePostNavigation } from "../Post/usePostNavigation";
import useSidebar from "../../hook/useSidebar";

function HomePosts() {
  const { handleClickPost, handleClickProfile } = usePostNavigation();
  const { isSidebarOpen } = useSidebar();
  //fetch data api example
  const { posts, comments } = forumData;
  console.log("🏠 HomePosts mounted");
  // join post and comment table
  const postData = posts.map((post) => {
    return {
      ...post,
      postComments: comments.filter((c) => c.postId === post.id),
    };
  });

  return (
    <StyledContainer isSidebarOpen={isSidebarOpen}>
      <PostWrapper>
        <PostList
          postData={postData}
          onClickPost={handleClickPost}
          onClickProfile={handleClickProfile}
        />
      </PostWrapper>
    </StyledContainer>
  );
}
const PageContainer = styled.div``;
const StyledContainer = styled.div`
  min-height: 100%;
  overflow-y: auto;
  display: flex;

  margin: auto;
  padding: 1rem;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(18rem)" : "translateX(13rem)"};
  transition: all 0.3s ease;
  @media (max-width: 1300px) {
    max-width: 100%;
    padding: 1rem;

    transform: translateX(0rem);
  }
`;

const PostWrapper = styled.div`
  width: 100%;
  max-width: 900px; /* limit width for each post */

  display: flex;
  flex-direction: column;
  align-items: start;
  border-radius: 25px;
  justify-content: start;
  cursor: pointer;
  @media (max-width: 1300px) {
    max-width: 100%;
  }

  gap: 1rem;
`;

const BreakLine = styled.hr`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 1rem;
`;

export default HomePosts;
