import styled from "styled-components";
import useSidebar from "../hook/useSidebar";

function SettingPage() {
  const { isSidebarOpen } = useSidebar();
  return (
    <StyledPage isSidebarOpen={isSidebarOpen}>
      <h1>Settings</h1>
    </StyledPage>
  );
}

const StyledPage = styled.div`
  height: 100vh;
  & * {
    color: var(--text-color);
  }

  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(17rem)" : "translate(10rem)"};
  transition: transform 0.2s ease;
`;

export default SettingPage;
