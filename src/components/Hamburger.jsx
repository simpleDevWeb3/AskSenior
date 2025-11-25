import { HiOutlineMenu } from "react-icons/hi";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

import useSidebar from "../hook/useSidebar";

const StyledHamburger = styled(HiOutlineMenu)`
  font-size: 1.9rem;
`;
function Hamburger() {
  const { $isSidebarOpen, toggleSidebar } = useSidebar();
  console.log($isSidebarOpen, " ,Menu");
  return (
    <ButtonIcon
      size="rounded"
      variant="text"
      shape={"round"}
      icon={<StyledHamburger />}
      action={() => toggleSidebar()}
    />
  );
}

export default Hamburger;
