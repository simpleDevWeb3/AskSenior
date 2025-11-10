import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import { useScrollRestore } from "../hook/useScrollRestore";
import Avatar from "../components/Avatar";
import Filter from "../components/Filter";
import PostList from "../features/Post/PostList";
import forumData from "../data/post";

function ProfilePage() {
  const { isSidebarOpen } = useSidebar();
  useScrollRestore();
  const FilterOptions = [
    { key: "POST", label: "Post" },
    { key: "COMMENTS", label: "Comments" },
    { key: "SAVED", label: "Saved" },
    { key: "HISTORY", label: "History" },
    { key: "UPVOTED", label: "Upvoted" },
    { key: "DOWNVOTED", label: "Downvoted" },
    { key: "DRAFT", label: "Draft" },
  ];

  const { posts } = forumData;
  return (
    <PageContainer isSidebarOpen={isSidebarOpen}>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar src="/avatar.jpg" />
        </AvatarContainer>

        <InfoContainer>
          <div>
            <UsernameBig>User 101</UsernameBig>
            <UsernameSmall>@User 101</UsernameSmall>
          </div>
        </InfoContainer>
      </ProfileHeader>
      <OperationContainer>
        <Filter
          filterField={"type"}
          options={FilterOptions}
          startingOption={"POST"}
        />
      </OperationContainer>
      <br />
      <PostList postData={posts} />
    </PageContainer>
  );
}

export default ProfilePage;
const PageContainer = styled.div`
  height: 100%;
  max-width: 900px;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(18rem)" : "translateX(15rem)"};
  transition: transform 0.3s ease-in-out;

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
  margin-left: 1rem;
`;
const HeroEl = styled.div`
  width: 100%;
  height: 4rem;
  background-color: purple;
  position: relative;
`;
const OperationContainer = styled.div`
  margin-left: 1rem;
`;
