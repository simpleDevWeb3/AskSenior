import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import JoinBtn from "./JoinBtn";
import { useUser } from "../features/Auth/useUser";
import { useFetchJoinedCommunity } from "../features/Communities/useFetchJoinedCommunity";

function CommunityList({ communities }) {
  const { user } = useUser();
  const user_id = user?.id ?? null;

  const { communities: joinedList = [] } =
    useFetchJoinedCommunity(user_id) || [];
  console.log("joined: ", joinedList);
  const inJoinedFunc = function (community_id) {
    const { communities } = joinedList;
    if (!user_id || !Array.isArray(communities)) return false;
    return communities.find((c) => c.id === community_id);
  };

  return (
    <List>
      {communities?.map((item) => {
        return (
          <>
            <CommunityItem
              item={item}
              user_id={user_id}
              isJoined={inJoinedFunc(item.id)}
            />
            <OutLine />
          </>
        );
      })}
    </List>
  );
}

function CommunityItem({ item, user_id, isJoined }) {
  return (
    <ListItem key={item.id}>
      {/* Avatar Section */}
      <AvatarWrapper>
        {item.avatarUrl ? (
          <AvatarImg src={item.avatarUrl} alt={item.name} />
        ) : (
          <DefaultAvatar>r/</DefaultAvatar>
        )}
      </AvatarWrapper>

      {/* Info Section */}
      <InfoColumn>
        <TopRow>
          <CommunityName>r/{item.name}</CommunityName>
          <MetaData>• {item.members_count || 0} members</MetaData>
        </TopRow>
        <Description>
          {item.description || "No description provided."}
        </Description>
      </InfoColumn>

      {/* Action Button */}
      <JoinBtn community_id={item.id} user_id={user_id} isJoined={isJoined} />
    </ListItem>
  );
}

export default CommunityList;
// --- Styled Components ---
const OutLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--hover-color);
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;

  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 16px;

  &:hover {
    background-color: var(--hover-color);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const AvatarWrapper = styled.div`
  margin-right: 12px;
  padding-top: 4px; /* Aligns avatar with text */
`;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #0079d3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
`;

const InfoColumn = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const TopRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
`;

const CommunityName = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: var(--text-color);

  &:hover {
    text-decoration: underline;
  }
`;

const MetaData = styled.span`
  font-size: 12px;
  color: #7c7c7c;
`;

const Description = styled.p`
  font-size: 12px;
  color: var(--text-color);
  margin: 0;
  line-height: 16px;

  /* Truncate text after 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
