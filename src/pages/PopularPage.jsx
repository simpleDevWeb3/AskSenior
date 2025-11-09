import styled from "styled-components";
import useSidebar from "../hook/useSidebar";

function PopularPage() {
  const { isSidebarOpen } = useSidebar();
  return (
    <StyledContainer isSidebarOpen={isSidebarOpen}>
      <h1>Popular</h1>
    </StyledContainer>
  );
}

export default PopularPage;
const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  color: var(--text-color);

  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(17rem)" : "translate(7rem)"};
  transition: transform 0.4s ease;

  @media (max-width: 1000px) {
    padding-top: 4rem;
    transform: none;
  }
`;
