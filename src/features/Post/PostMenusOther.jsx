import styled from "styled-components";
import Menus from "../../components/Menus";
import { HiEllipsisHorizontal, HiEllipsisVertical } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";
import { BiBell, BiBookmark } from "react-icons/bi";
import { BsEyeSlash } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import { usePost } from "./PostContext";

function PostMenusOther() {
  const { postData, variant } = usePost();
  const { id } = postData;
  return (
    <MenusContainer>
      <Menus.MenuToggle id={`other-${id}`}>
        <ButtonIcon
          variant="text"
          icon={variant ? <HiEllipsisHorizontal /> : <HiEllipsisVertical />}
        />
      </Menus.MenuToggle>
      <Menus.MenuList placement={"left"} id={`other-${id}`}>
        <Menus.MenuBtn>
          <BiBell />
          <BtnText>Follow Post</BtnText>
        </Menus.MenuBtn>
        <Menus.MenuBtn>
          <BiBookmark />
          <BtnText>Bookmark</BtnText>
        </Menus.MenuBtn>
        <Menus.MenuBtn>
          <BsEyeSlash />
          <BtnText>Hide Post</BtnText>
        </Menus.MenuBtn>

        <Menus.MenuBtn>
          <MdReportProblem />
          <BtnText>Report</BtnText>
        </Menus.MenuBtn>
      </Menus.MenuList>
    </MenusContainer>
  );
}

const MenusContainer = styled.div``;
const BtnText = styled.span`
  margin: 0.5rem;
`;

export default PostMenusOther;
