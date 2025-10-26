function PostMenusOther({ id }) {
  return (
    <MenusContainer>
      <Menus.MenuToggle id={`other-${id}`}>
        <ButtonIcon variant="text" icon={<HiEllipsisVertical />} />
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
export default PostMenusOther;
