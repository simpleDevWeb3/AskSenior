import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import styled from "styled-components";
import CommunityProfileCard from "../../components/CommunityProfileCard";

function CommunityPosts() {
  const { communityId } = useParams();
  const { posts, comments, communities } = forumData;

  // filter posts from this community
  const communityPosts = posts
    .filter((post) => post.communityId === communityId)
    .map((post) => ({
      ...post,
      postComments: comments.filter((c) => c.postId === post.id),
    }));

  const community = communities.find((c) => c.id === communityId);

  return (
    <PageContainer>
      {/* Banner Section */}
      <BannerWrapper>
        <CommunityProfileCard communityData={community} />
      </BannerWrapper>

      {/* Main Content Section */}
      <ContentContainer>
        <HorizontalContainer>
          <MainSection>
            <PostList postData={communityPosts} />
          </MainSection>

          <Sidebar></Sidebar>
        </HorizontalContainer>
      </ContentContainer>
    </PageContainer>
  );
}

// 🧱 Layout Styles

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  & > * {
    width: 90%;
    max-width: 80rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 80rem;
  margin-top: 1rem;
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  align-items: flex-start; /* ensures sidebar and posts align at top */
`;

const MainSection = styled.div`
  flex: 1;
  max-width: 60rem;
`;

const Sidebar = styled.div`
  width: 20rem;
  position: sticky;
  top: 2rem; /* sticks 2rem below top of viewport */
  align-self: flex-start; /* ensures it doesn’t stretch vertically */
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  border-radius: 25px;
`;

export default CommunityPosts;
