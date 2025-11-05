import styled from "styled-components";
import PostForm from "../features/Post/PostForm";
import useSidebar from "../hook/useSidebar";

function CreatePostPage() {
  const { isSidebarOpen } = useSidebar();
  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <PostForm />
    </PageContainer>
  );
}

export default CreatePostPage;
const PageContainer = styled.div`
  height: 100vh;
  max-width: 80%;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(18rem)" : "15rem"};
  transition: transform 0.3s ease-in-out;
`;
