import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";

function ProfilePage() {
  const { isSidebarOpen } = useSidebar();
  useScrollRestore();
  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <h1>Profile</h1>
    </PageContainer>
  );
}

export default ProfilePage;
const PageContainer = styled.div`
  height: 100vh;
  max-width: 80%;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(18rem)" : "15rem"};
  transition: transform 0.3s ease-in-out;
`;
