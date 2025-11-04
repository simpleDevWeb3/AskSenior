import styled from "styled-components";
import Logo from "./Logo";

import {
  HiOutlineBell,
  HiOutlineMenu,
  HiOutlinePlusCircle,
  HiOutlineUser,
  HiOutlineUserCircle,
} from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Hamburger from "./Hamburger";
import { useModal } from "../context/ModalContext";
import { useAuth } from "../features/Auth/AuthContext";

const StyledNavbar = styled.nav`
  position: fixed;
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding-left: 1rem;
  padding-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  gap: 0.5rem;
  background-color: white;
  max-height: 4rem;
  z-index: 1000;
`;
const IconText = styled.span`
  @media (max-width: 468px) {
    display: none;
  }
`;
const CreatePostIcon = styled(HiOutlinePlusCircle)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.5rem;
`;

const Notification = styled(HiOutlineBell)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.5rem;
`;
const Grouped = styled.div`
  display: flex;

  text-align: center;
  justify-content: center;
  align-items: center;
`;
const User = styled(HiOutlineUserCircle)`
  color: var(--primary-color);
  text-align: center;
  font-size: 1.7rem;
`;

function Navbar() {
  const navigate = useNavigate();
  const { toggleModal } = useModal();
  const { isAuth } = useAuth();

  return (
    <StyledNavbar>
      <Grouped>
        <Hamburger />
        <Logo />
      </Grouped>
      <Search />

      <Grouped>
        {!isAuth ? (
          <ButtonIcon action={() => toggleModal()}>
            <span>Log In</span>
          </ButtonIcon>
        ) : (
          <>
            <ButtonIcon
              variant="text"
              icon={<CreatePostIcon />}
              action={() => navigate("/create")}
            >
              <IconText>Create</IconText>
            </ButtonIcon>

            <ButtonIcon
              size="rounded"
              variant="text"
              icon={<Notification />}
              action={() => navigate("/notification")}
            />
            <ButtonIcon
              size="rounded"
              shape="circle"
              variant="text"
              icon={<User />}
              action={() => navigate("/profile")}
            />
          </>
        )}
      </Grouped>
    </StyledNavbar>
  );
}

export default Navbar;
