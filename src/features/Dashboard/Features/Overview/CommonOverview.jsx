import { HiChat } from "react-icons/hi";
import { HiUser, HiUserGroup, HiArrowTrendingUp } from "react-icons/hi2";
import { FaBan } from "react-icons/fa";
import styled from "styled-components";
import { useFetchUsers } from "../Users/useFetchUsers";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";
import { useFetchCommunityAdmin } from "../Community/useFetchCommunityAdmin";
import { useUser } from "../../../Auth/useUser";
import { useSearchParams } from "react-router-dom";
import { filterDataByDays } from "../../../../helpers/dateHelper";
import { useFetchAllBanned } from "./useFetchAllBanned";

function CommonOverview() {
  const { user } = useUser();
  const { users, isLoadUsers } = useFetchUsers();
  const { posts, isLoadPosts } = useFetchPostsAdmin();
  const { community, isLoadCommunity } = useFetchCommunityAdmin(user?.id);
  const { banned, isLoadBanned, errorBanned } = useFetchAllBanned(user?.id);

  const [searchParams] = useSearchParams();

  const lastDay = Number(searchParams.get("last")) || 7;

  // --- 1. GET FILTERED DATA (New Items) ---
  const filteredUsers = filterDataByDays(users, lastDay);
  const filteredPosts = filterDataByDays(posts, lastDay);
  const filteredCommunities = filterDataByDays(
    community?.communities || [],
    lastDay
  );
  const filteredBannedData = filterDataByDays(banned?.data || [], lastDay);

  // --- 2. GET BANNED DATA SPECIFICALLY ---

  // A. Total Banned (All Time)
  const totalBannedUsers = banned?.data?.filter((u) => u.userId) || [];

  const totalBannedComm = banned?.data?.filter((c) => c.communityId) || [];

  // B. New Banned (Filtered by Date)
  // Note: This assumes we want to see how many were created AND banned recently,
  // or you might need a separate 'banned_at' date field.
  // For now, we will assume we are counting bans among the *newly joined* users/communities.
  const newBannedUsers = filteredBannedData.filter((u) => u.userId);
  const newBannedComm = filteredBannedData.filter((c) => c.communityId);

  // --- 3. CALCULATION LOGIC ---

  const calcGrowth = (totalList, filteredList) => {
    if (lastDay === 0 || !totalList || !filteredList) return null;

    const newCount = filteredList.length;
    const previousCount = totalList.length - newCount;
    console.log(totalList, filteredList);

    if (previousCount === 0) return newCount > 0 ? 100 : 0;
    console.log(newCount, previousCount);

    const growth = (newCount / previousCount) * 100;
    return growth > 100 ? growth.toFixed(0) : growth.toFixed(1);
  };

  // Calculate Growth Trends
  const userGrowth = calcGrowth(users, filteredUsers);
  const postGrowth = calcGrowth(posts, filteredPosts);
  const communityGrowth = calcGrowth(
    community?.communities || [],
    filteredCommunities
  );

  // Calculate Ban Trends
  const bannedUserGrowth = calcGrowth(totalBannedUsers, newBannedUsers);
  const bannedCommGrowth = calcGrowth(totalBannedComm, newBannedComm);

  return (
    <TagContainer>
      {/* 1. USERS */}
      <Tag>
        <TagTitle>
          {lastDay ? `New Users (${lastDay}d)` : "Total Users"} <HiUser />
        </TagTitle>
        <TagData>
          {!isLoadUsers ? filteredUsers.length : <SpinnerMini />}
          {userGrowth && (
            <GrowthBadge>
              <HiArrowTrendingUp /> +{userGrowth}%
            </GrowthBadge>
          )}
        </TagData>
      </Tag>

      {/* 2. POSTS */}
      <Tag>
        <TagTitle>
          {lastDay ? `New Posts (${lastDay}d)` : "Total Posts"} <HiChat />
        </TagTitle>
        <TagData>
          {!isLoadPosts ? filteredPosts.length : <SpinnerMini />}
          {postGrowth && (
            <GrowthBadge>
              <HiArrowTrendingUp /> +{postGrowth}%
            </GrowthBadge>
          )}
        </TagData>
      </Tag>

      {/* 3. COMMUNITIES */}
      <Tag>
        <TagTitle>
          {lastDay ? `New Comm. (${lastDay}d)` : "Total Comm."} <HiUserGroup />
        </TagTitle>
        <TagData>
          {!isLoadCommunity ? filteredCommunities.length : <SpinnerMini />}
          {communityGrowth && (
            <GrowthBadge>
              <HiArrowTrendingUp /> +{communityGrowth}%
            </GrowthBadge>
          )}
        </TagData>
      </Tag>

      {/* 4. BANNED USERS (Updated Format) */}
      <Tag>
        <TagTitle>
          {lastDay ? `Banned Users (${lastDay}d)` : "Total Banned Users"}{" "}
          <FaBan style={{ color: "var(--color-red-700)" }} />
        </TagTitle>
        <TagData>
          {/* Main Number: Count of Banned Users */}
          {!isLoadUsers ? (
            lastDay ? (
              newBannedUsers.length
            ) : (
              totalBannedUsers.length
            )
          ) : (
            <SpinnerMini />
          )}

          {/* Badge: Growth Rate of Bans */}
          {bannedUserGrowth && (
            <DangerBadge>
              <HiArrowTrendingUp /> +{bannedUserGrowth}%
            </DangerBadge>
          )}
        </TagData>
      </Tag>

      {/* 5. BANNED COMMUNITIES (Updated Format) */}
      <Tag>
        <TagTitle>
          {lastDay ? `Banned Comm. (${lastDay}d)` : "Total Banned Comm."}{" "}
          <FaBan style={{ color: "var(--color-red-700)" }} />
        </TagTitle>
        <TagData>
          {/* Main Number: Count of Banned Communities */}
          {!isLoadCommunity ? (
            lastDay ? (
              newBannedComm.length
            ) : (
              totalBannedComm.length
            )
          ) : (
            <SpinnerMini />
          )}

          {/* Badge: Growth Rate of Bans */}
          {bannedCommGrowth && (
            <DangerBadge>
              <HiArrowTrendingUp /> +{bannedCommGrowth}%
            </DangerBadge>
          )}
        </TagData>
      </Tag>
    </TagContainer>
  );
}

export default CommonOverview;

// --- STYLES ---

const TagContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
`;

const Tag = styled.div`
  border-radius: 25px;
  border: solid 1px var(--hover-color);
  background-color: var(--background-glass);
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TagData = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: var(--text-color);
  margin-top: 0.5rem;

  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const TagTitle = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 600;

  white-space: nowrap;

  & svg {
    font-size: 1.2rem;
  }
`;

// Green Badge for Positive Growth (Users, Posts)
const GrowthBadge = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #22c55e;
  background-color: rgba(34, 197, 94, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;

  & svg {
    font-size: 0.8rem;
    stroke-width: 1px;
  }
`;

// Red Badge for Negative Growth (Bans)
const DangerBadge = styled(GrowthBadge)`
  color: #ef4444; /* Red Text */
  background-color: rgba(239, 68, 68, 0.1); /* Red Background */
`;
