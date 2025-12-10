import styled from "styled-components";
import ButtonIcon from "../../components/ButtonIcon";
import Avatar from "../../components/Avatar";
import { useFetchAllCommunity } from "./useFetchAllCommunity";
import Spinner from "../../components/Spinner";
import { useUser } from "../Auth/useUser";
import { useJoinCommunity } from "../Community/useJoinCommunity";
import { useNavigate } from "react-router-dom";
import JoinBtn from "../../components/JoinBtn";

function CommunitiesLayout() {
  const { user } = useUser();
  const { communities, isLoadCommunities, errorCommunities } =
    useFetchAllCommunity(user?.id);
  const navigate = useNavigate();

  const notOwnedCommunities =
    communities?.filter((community) => community?.adminId !== user?.id) || [];
  if (isLoadCommunities)
    return (
      <FullPageLoader>
        <Spinner />
      </FullPageLoader>
    );

  if (errorCommunities || !Array.isArray(communities))
    return <div>Error: {errorCommunities}</div>;

  return (
    <Container>
      <Header>
        <Title as={"h3"}>Explore Communities</Title>
      </Header>

      <List>
        {notOwnedCommunities.map((community) => (
          <CommunityItem
            onClick={(e) => {
              e.stopPropagation();
              if (e.target.closest("button")) return;
              navigate(`/community/${community.id}`);
            }}
            key={community.id}
          >
            {/* 1. Banner Image */}
            <CardBanner $src={community.bannerUrl || "/default-banner.jpg"} />

            {/* 2. Wrapper for padding */}
            <CardContent>
              <Group>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <AvatarContainer>
                    <Avatar
                      src={
                        community.avatarUrl
                          ? community.avatarUrl
                          : "/avatar.jpg"
                      }
                    />
                  </AvatarContainer>

                  <Info>
                    <Name>{community.name}</Name>
                    <Stats>{community.members} members</Stats>
                  </Info>
                </div>

                <JoinBtn
                  community_id={community.id}
                  user_id={user?.id}
                  isJoined={community.isJoined}
                />
              </Group>

              <Description>
                {community.description
                  ? community.description
                  : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,"}
              </Description>

              {/* --- NEW: Tags Section --- */}
              {community.topics && community.topics.length > 0 && (
                <TagsContainer>
                  {community.topics.map((topic) => (
                    <Tag key={topic.id}>{topic.name}</Tag>
                  ))}
                </TagsContainer>
              )}
            </CardContent>
          </CommunityItem>
        ))}
      </List>
    </Container>
  );
}

export default CommunitiesLayout;

// ---------------- styled ----------------

const Container = styled.div`
  padding: 1.5rem;
  padding-top: 0rem;
  margin: 2rem auto;
  max-width: 80rem;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const FullPageLoader = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);
`;

const Title = styled.h3`
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const CommunityItem = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--background-color);
  box-shadow: 4px 4px 0px var(--tertiary-color);
  border-radius: 10px;
  border: 1px solid var(--hover-color);
  overflow: hidden;
  transition: transform 0.2s ease, background 0.2s ease;
  padding: 0;

  &:hover {
    background: var(--hover-color);
    transform: translateY(-2px);
  }
`;

const CardBanner = styled.div`
  height: 80px;
  width: 100%;
  background-color: var(--tertiary-color);
  background-image: url(${(props) => props.$src});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 1rem;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Group = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const AvatarContainer = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-top: -25px;
  border: 4px solid var(--background-color);
  background-color: var(--background-color);

  ${CommunityItem}:hover & {
    border-color: var(--hover-color);
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  padding-top: 0.2rem;
`;

const Name = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-color);
  line-height: 1.2;
`;

const Stats = styled.div`
  font-size: 0.85rem;
  color: var(--text-color);
  opacity: 0.8;
`;

const Description = styled.p`
  color: var(--text-color);
  opacity: 0.7;
  font-size: 0.95rem;
  line-height: 1.4;
`;

// --- New Tag Styles ---

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allows tags to go to next line if there are many */
  gap: 0.5rem;
  margin-top: auto; /* Pushes tags to the bottom if the card height stretches */
  padding-top: 1rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-color);
  background-color: var(--tertiary-color); /* Matches the shadow/accent */
  padding: 0.25rem 0.75rem;
  border-radius: 20px; /* Pill shape */
  opacity: 0.9;
  letter-spacing: 0.5px;

  /* Optional: Make it stand out slightly more on hover */
  &:hover {
    opacity: 1;
    filter: brightness(1.1);
  }
`;
