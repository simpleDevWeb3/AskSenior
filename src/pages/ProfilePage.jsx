import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";
import Avatar from "../components/Avatar";
import Tabs from "../components/Tabs";
import { Outlet } from "react-router-dom";
import { useUser } from "../features/Auth/useUser";

function ProfilePage() {
  const { isSidebarOpen } = useSidebar();
  const { user } = useUser();
  useScrollRestore();
  const links = [
    { key: "POST", label: "Post", index: true },
    { key: "COMMENTED", label: "Commented" },
    { key: "SAVED", label: "Saved" },
    { key: "HISTORY", label: "History" },
    { key: "UPVOTED", label: "Upvoted" },
    { key: "DOWNVOTED", label: "Downvoted" },
    { key: "DRAFT", label: "Draft" },
  ];

  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src="/avatar.jpg" />
        </AvatarContainer>

        <InfoContainer>
          <div>
            <UsernameBig>{user.name}</UsernameBig>
            <UsernameSmall>@{user.name}</UsernameSmall>
          </div>
        </InfoContainer>
      </ProfileHeader>
      <OperationContainer>
        <Tabs links={links} basePath={"/profile"} />
      </OperationContainer>
      <br />
      <Content>
        <Outlet />
      </Content>
    </PageContainer>
  );
}

export default ProfilePage;
const PageContainer = styled.div`
  max-width: 900px;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(5rem)" : "translateX(0rem)"};
  transition: transform 0.3s ease-in-out;
  margin: auto;
  @media (max-width: 800px) {
    padding-top: 4rem;
  }

  @media (max-width: 1200px) {
    transform: none;
  }

  & * {
    color: var(--text-color);
  }
`;
const Content = styled.div``;
const ProfileHeader = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;

  margin-bottom: 1rem;
`;
const InfoContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
const ReservedEl = styled.div`
  width: 6rem;
`;

const UsernameBig = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
`;

const UsernameSmall = styled.p`
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.7;
`;
const AvatarContainer = styled.div`
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  border-radius: 50%;
`;
const HeroEl = styled.div`
  width: 100%;
  height: 4rem;
  background-color: purple;
  position: relative;
`;
const OperationContainer = styled.div``;
