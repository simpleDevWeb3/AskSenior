import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import styled from "styled-components";
import Navbar from "./components/Navbar";

import useSidebar from "./hook/useSidebar";
import Menus from "./components/Menus";
import { SidebarProvider } from "./context/SidebarContext";
//import { Menus } from "./components/Menus";

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: auto 1fr; /* Header 20%, rest 80% */
  height: 100vh;
`;

const Layout = styled.div`
  display: grid;
  position: relative;
  height: 100%;
  position: relative;
  overflow-y: hidden;
  @media (min-width: 1300px) {
    grid-template-columns: ${({ $isSidebarOpen }) =>
      $isSidebarOpen ? "250px 1fr" : "1fr"};
  }

  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
  }
`;

const OverlayDiv = styled.div`
  display: ${({ $isSidebarOpen }) => ($isSidebarOpen ? "block" : "none")};
  position: absolute;

  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;

  @media (min-width: 1300px) {
    display: none; /* hide overlay on desktop/large screens */
  }
`;

const Content = styled.main`
  padding: 1rem;
  padding-top: 0px;
  padding-bottom: 0px;
  overflow-y: auto;
  height: 100%;
  width: 100%;
`;

function App() {
  const { isSidebarOpen } = useSidebar();

  return (
    <StyledApp>
      <Navbar />
      <Layout $isSidebarOpen={isSidebarOpen}>
        <Sidebar />
        <OverlayDiv $isSidebarOpen={isSidebarOpen} />

        <Menus>
          <Content>
            <Outlet />
          </Content>
        </Menus>
      </Layout>
    </StyledApp>
  );
}

export default App;
