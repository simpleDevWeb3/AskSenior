import { HiChat } from "react-icons/hi";
import { HiUser, HiUserGroup } from "react-icons/hi2";
import { FaBan } from "react-icons/fa"; // Imported FaBan for better context
import styled from "styled-components";
import { useFetchUsers } from "../Users/useFetchUsers";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";
import { useFetchCommunityAdmin } from "../Community/useFetchCommunityAdmin";
import { useUser } from "../../../Auth/useUser";

function CommonOverview() {
  const { user } = useUser();
  const { users, isLoadUsers } = useFetchUsers();
  const { posts, isLoadPosts } = useFetchPostsAdmin();
  const { community, isLoadCommunity } = useFetchCommunityAdmin(user?.id);

  // --- CALCULATION LOGIC ---

  const calcUserBanRate = () => {
    if (!users || users.length === 0) return 0;

    // Count users where is_banned is true
    const bannedCount = users.filter((u) => u.is_banned).length;

    // (Banned / Total) * 100
    return ((bannedCount / users.length) * 100).toFixed(1); // 1 decimal place
  };

  const calcCommunityBanRate = () => {
    const communitiesList = community?.communities || [];
    if (!communitiesList || communitiesList.length === 0) return 0;

    // Count communities where is_banned is true
    const bannedCount = communitiesList.filter((c) => c.isBanned).length;

    return ((bannedCount / communitiesList.length) * 100).toFixed(1);
  };

  return (
    <TagContainer>
      {/* 1. TOTAL USERS */}
      <Tag>
        <TagTitle>
          Total Users <HiUser />
        </TagTitle>
        <TagData>{!isLoadUsers ? users?.length : <SpinnerMini />}</TagData>
      </Tag>

      {/* 2. TOTAL POSTS */}
      <Tag>
        <TagTitle>
          Total Posts <HiChat />
        </TagTitle>
        <TagData>{!isLoadPosts ? posts?.length : <SpinnerMini />}</TagData>
      </Tag>

      {/* 3. TOTAL COMMUNITIES */}
      <Tag>
        <TagTitle>
          Total Community <HiUserGroup />
        </TagTitle>
        <TagData>
          {!isLoadCommunity ? community?.communities?.length : <SpinnerMini />}
        </TagData>
      </Tag>

      {/* 4. USER BAN RATE */}
      <Tag>
        <TagTitle>
          User Ban Rate <FaBan style={{ color: "var(--color-red-700)" }} />
        </TagTitle>
        <TagData>
          {!isLoadUsers ? `${calcUserBanRate()}%` : <SpinnerMini />}
        </TagData>
      </Tag>

      {/* 5. COMMUNITY BAN RATE */}
      <Tag>
        <TagTitle>
          Community Ban Rate <FaBan style={{ color: "var(--color-red-700)" }} />
        </TagTitle>
        <TagData>
          {!isLoadCommunity ? `${calcCommunityBanRate()}%` : <SpinnerMini />}
        </TagData>
      </Tag>
    </TagContainer>
  );
}

export default CommonOverview;

const TagContainer = styled.div`
  display: grid;
  /* 5 Columns match the 5 Tags above */
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  max-width: 70rem;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.div`
  border-radius: 25px;
  border: solid 1px var(--hover-color);
  background-color: var(--background-glass);
  padding: 1rem 1.5rem; /* Reduced padding slightly to fit 5 cols */
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TagData = styled.div`
  font-size: 30px; /* Adjusted size slightly */
  font-weight: 600;
  color: var(--text-color);
  margin-top: 0.5rem;
`;

const TagTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Pushes icon to the right */
  font-size: 14px;
  font-weight: 600;
  color: rgba(176, 176, 176, 0.984);

  & svg {
    color: rgba(176, 176, 176, 0.984);
    font-size: 1.2rem;
  }
`;
