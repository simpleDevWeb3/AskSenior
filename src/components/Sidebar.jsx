import {
  HiOutlineFire,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiPlus,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useEffect } from "react";
import Accordian from "./Accordian";
import { useModal } from "../context/ModalContext";

const StyledSidebar = styled.aside`
  overflow-y: scroll;
  position: fixed;
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.2rem;
  border-right: 1px solid var(--tertiary-color);
  top: 3.5rem;
  bottom: 0;
  z-index: 99;
  width: 100%;
  max-width: 17rem;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(0rem)" : "translateX(-20rem)"};
  transition: transform 0.4s ease, background-color 0.15s ease;

  @media (max-width: 1300px) {
    z-index: 1000;
  }

  & * {
    color: var(--text-color);
  }
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  border-radius: var(--border-radius);
  transition: background 0.2s;

  &.active {
    background-color: var(--hover-color);
    color: var(--primary-color);
  }

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--hover-color);
  }
`;

const StyledNavAction = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: background 0.2s;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    background-color: var(--hover-color);
  }
`;

const SectionTitle = styled.div`
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;

  text-transform: uppercase;
`;

function Sidebar() {
  const { openModal } = useModal();
  const {
    isSidebarOpen,
    closeSidebar,
    openSidebar,
    setIsManualOpen,
    isManualOpen,
    isManualOpenResize,
    setIsManualOpenResize,
  } = useSidebar();

  // Example communities list
  const userCommunities = [
    { id: 1, name: "Kopi Lovers" },
    { id: 2, name: "Web Dev" },
    { id: 3, name: "Gaming Hub" },
  ];

  useEffect(() => {
    function handleResize() {
      if (isManualOpen) return;

      if (window.innerWidth < 1300) {
        if (!isManualOpenResize) {
          closeSidebar();
          setIsManualOpenResize(false);
        } else {
          openSidebar();
        }
      } else if (window.innerWidth > 1300) {
        setIsManualOpenResize(false);
        openSidebar();
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    closeSidebar,
    openSidebar,
    setIsManualOpen,
    isManualOpen,
    isManualOpenResize,
    setIsManualOpenResize,
  ]);

  function handleNavigate() {
    if (isManualOpenResize !== true) return;
    closeSidebar();
    setIsManualOpenResize(false);
  }

  return (
    <StyledSidebar isSidebarOpen={isSidebarOpen}>
      <StyledNavLink onClick={handleNavigate} to="/">
        <HiOutlineHome />
        <span>Home</span>
      </StyledNavLink>

      <StyledNavLink onClick={handleNavigate} to="/popular">
        <HiOutlineFire />
        <span>Popular</span>
      </StyledNavLink>

      <StyledNavLink onClick={handleNavigate} to="/communities">
        <HiOutlineUserGroup />
        <span>Communities</span>
      </StyledNavLink>

      <StyledNavAction onClick={() => openModal("Create Community")}>
        <HiPlus />
        <span>Start Community</span>
      </StyledNavAction>
      <br />
      <br />

      <Accordian title={"Manage"}>
        {userCommunities.map((c) => (
          <StyledNavLink
            key={c.id}
            onClick={handleNavigate}
            to={`/manage/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <HiOutlineUserGroup />
            <span>{c.name}</span>
          </StyledNavLink>
        ))}
      </Accordian>

      <Accordian title={"Joined"}>
        {userCommunities.map((c) => (
          <StyledNavLink
            key={c.id}
            onClick={handleNavigate}
            to={`/manage/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <HiOutlineUserGroup />
            <span>{c.name}</span>
          </StyledNavLink>
        ))}
      </Accordian>

      <Accordian title={"Followed"}>
        {userCommunities.map((c) => (
          <StyledNavLink
            key={c.id}
            onClick={handleNavigate}
            to={`/manage/${c.name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <HiOutlineUserGroup />
            <span>{c.name}</span>
          </StyledNavLink>
        ))}
      </Accordian>
    </StyledSidebar>
  );
}

const Section = styled.section`
  padding: 1rem 0.2rem;
`;
export default Sidebar;
