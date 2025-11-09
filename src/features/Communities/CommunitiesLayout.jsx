import styled from "styled-components";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import ButtonIcon from "../../components/ButtonIcon";
import Avatar from "../../components/Avatar";

// Sample community data
const initialCommunities = [
  { id: 1, name: "Kopi Lovers", members: 12500, growth: "up" },
  { id: 2, name: "Tech Nerds", members: 9800, growth: "up" },
  { id: 3, name: "Cafe Creatives", members: 7200, growth: "down" },
  { id: 4, name: "Gaming Mamak", members: 5200, growth: "up" },
  { id: 5, name: "Study Corner", members: 3400, growth: "steady" },
];

function CommunitiesLayout() {
  const [communities, setCommunities] = useState(initialCommunities);

  return (
    <Container>
      <Header>
        <Title as={"h3"}>Explore Communities</Title>
      </Header>

      <List>
        {communities.map((community, index) => (
          <CommunityItem key={community.id}>
            <Group>
              <AvatarContainer>
                <Avatar src={"/avatar.jpg"} />
              </AvatarContainer>
              <Info>
                <Name>{community.name}</Name>
                <Stats>{community.members} member</Stats>
              </Info>

              <ButtonIcon>Join</ButtonIcon>
            </Group>
            <Description>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
            </Description>
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
  height: 100vh;
  margin: 2rem auto;
  max-width: 80rem;

  @media (max-width: 1000px) {
    height: 100%;
  }
`;
const AvatarContainer = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: 1px solid var(--tertiary-color);
  overflow: hidden;
  flex-shrink: 0;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 1rem;
  svg {
    font-size: 1.5rem;
    color: var(--text-color);
  }
`;

const Title = styled.h3`
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 0.8rem;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;
const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CommunityItem = styled.li`
  display: flex;

  flex-direction: column;
  background: var(--background-color);
  box-shadow: 4px 4px 0px var(--tertiary-color);
  padding: 1rem;
  border-radius: 10px;
  justify-content: space-between;
  transition: background 0.2s ease;
  &:hover {
    background: var(--hover-color);
  }
  border: 1px solid var(--hover-color);
  gap: 0.5rem;
`;

const Info = styled.div`
  flex: 1;
  margin-left: 0.5rem;
`;
const Stats = styled.div`
  color: var(--text-color);
`;
const Name = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
`;

const Description = styled.p`
  color: var(--text-color);
  opacity: 0.7;
`;
