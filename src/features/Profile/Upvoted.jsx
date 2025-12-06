import styled from "styled-components";
import forumData from "../../data/post";
import PostList from "../Post/PostList";
import { useFetchPostByUserVote } from "../Post/useFetchPostByUserVote";
import { useUser } from "../Auth/useUser";
import PostCard from "../Post/PostCard";
import Spinner from "../../components/Spinner";
import VoteTypePostList from "./VoteTypePostList";
import NoExist from "../../components/NoExist";

function Upvoted() {
  const { user } = useUser();
  const { posts, isLoadPosts, errorPosts } = useFetchPostByUserVote(
    user?.id,
    true
  );
  const existPost = Array.isArray(posts) && posts.length > 0;
  if (isLoadPosts) return <Spinner />;
  if (errorPosts)
    return (
      <div>
        <h1>{errorPosts}</h1>
      </div>
    );
  if (!existPost) return <NoExist name={"Post with upvote"} />;
  return (
    <StyledContainer>
      <VoteTypePostList posts={posts} />
    </StyledContainer>
  );
}

export default Upvoted;
const StyledContainer = styled.div`
  max-width: 700px;
`;
