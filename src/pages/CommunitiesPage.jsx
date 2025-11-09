import styled from "styled-components";
import CommunitiesLayout from "../features/Communities/CommunitiesLayout";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";

function CommunitiesPage() {
  const { isSidebarOpen } = useSidebar();
  useScrollRestore();
  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <CommunitiesLayout />
    </PageContainer>
  );
}

export default CommunitiesPage;

const PageContainer = styled.div`

  max-width: 80%;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(18rem)" : "15rem"};
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1000px) {
    transform: none;
    padding-top: 2rem;
    max-width: 100%;
  }
`;
