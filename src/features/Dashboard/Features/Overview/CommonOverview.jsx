import { HiChat } from "react-icons/hi";
import { HiUser, HiUserGroup } from "react-icons/hi2";
import styled from "styled-components";
import { useFetchUsers } from "../Users/useFetchUsers";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";

function CommonOverview() {
  const { users, isLoadUsers, errorUsers } = useFetchUsers();

  const { posts, isLoadPosts, errorPosts } = useFetchPostsAdmin();
  return (
    <TagContainer>
      <Tag>
        <TagTitle>
          Total Users <HiUser />
        </TagTitle>
        <TagData>{users ? users?.length : <SpinnerMini />}</TagData>
      </Tag>
      <Tag>
        <TagTitle>
          Total Posts <HiChat />
        </TagTitle>
        <TagData>{posts ? posts?.length : <SpinnerMini />}</TagData>
      </Tag>

      <Tag>
        <TagTitle>
          Total Community <HiUserGroup />
        </TagTitle>
        <TagData>50</TagData>
      </Tag>
    </TagContainer>
  );
}

export default CommonOverview;
const TagContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1rem;
`;
const Tag = styled.div`
  border-radius: 25px;
  border: solid 1px var(--hover-color);
  background-color: var(--background-glass);
  padding: 1rem 2rem;
`;
const TagData = styled.div`
  font-size: 35px;
  font-weight: 600;
  color: var(--text-color);
`;
const TagTitle = styled.p`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 15px;
  font-weight: 600;
  color: rgba(176, 176, 176, 0.984);
  & svg {
    color: rgba(176, 176, 176, 0.984);
  }
`;
