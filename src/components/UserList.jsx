import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function UserList({ users }) {
  const navigate = useNavigate();
  if (!users) return null;

  return (
    <List>
      {users.map((item) => {
        return (
          <div key={item.id} onClick={() => navigate(`/profile/${item?.id}`)}>
            <UserItem item={item} />
          </div>
        );
      })}
    </List>
  );
}

function UserItem({ item }) {
  return (
    <ListItem>
      {/* Avatar Section */}
      <AvatarWrapper>
        {item.avatar_url ? (
          <AvatarImg src={item.avatar_url} alt={item.name} />
        ) : (
          <DefaultAvatar>u/</DefaultAvatar>
        )}
      </AvatarWrapper>

      {/* Info Section */}
      <InfoColumn>
        <TopRow>
          <UserName>u/{item.name || "unknown"}</UserName>
        </TopRow>
        <Bio>{item.bio || "No bio available."}</Bio>
      </InfoColumn>
    </ListItem>
  );
}

export default UserList;

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
  align-items: center; /* Centered vertically looks better for users */
  padding: 12px 16px; /* Slightly tighter padding for user lists */

  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 18px; /* Slightly smaller radius */
  background-color: var(--background-glass);
  margin-bottom: 1rem;
  border: solid 1px var(--hover-color);
  &:hover {
    background-color: var(--hover-color);
  }
`;

const AvatarWrapper = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #24292e; /* Darker color for user fallback */
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
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TopRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 2px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color);

  &:hover {
    text-decoration: underline;
  }
`;

const MetaData = styled.span`
  font-size: 12px;
  color: #7c7c7c;
`;

const Bio = styled.p`
  font-size: 12px;
  color: #878a8c;
  margin: 0;
  line-height: 1.4;

  /* Truncate text after 1 line for cleaner user lists */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;
