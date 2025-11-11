import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import Tabs from "../components/Tabs";
import { Outlet } from "react-router-dom";

function SettingPage() {
  const { isSidebarOpen } = useSidebar();
  const tabs = [
    {
      key: "ACCOUNT",
      label: "Account",
      index: true,
    },
    {
      key: "PROFILE",
      label: "Profile",
    },
    {
      key: "PRIVACY",
      label: "Privacy",
    },
  ];
  return (
    <StyledPage isSidebarOpen={isSidebarOpen}>
      <h1>Settings</h1>
      <br />
      <Tabs basePath={"/Settings"} links={tabs} />
      <Outlet />
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
  @media (max-width: 800px) {
    transform: none;
    padding-top: 4rem;
    padding-left: 2rem;
  }
`;

export default SettingPage;
