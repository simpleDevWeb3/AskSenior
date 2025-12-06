import styled from "styled-components";

import { useUser } from "../Auth/useUser";
import { useFetchPostByUserVote } from "../Post/useFetchPostByUserVote";
import VoteTypePostList from "./VoteTypePostList";
import Spinner from "../../components/Spinner";
import NoExist from "../../components/NoExist";

function Downvoted() {
  const { user } = useUser();
  const { posts, isLoadPosts, errorPosts } = useFetchPostByUserVote(
    user?.id,
    false
  );
  const existPost = Array.isArray(posts) && posts.length > 0;
  if (isLoadPosts) return <Spinner />;
  if (errorPosts)
    return (
      <div>
        <h1>{errorPosts}</h1>
      </div>
    );
  if (!existPost) return <NoExist name={"Post with downvote"} />;
  if (existPost)
    return (
      <StyledContainer>
        <VoteTypePostList posts={posts} />
      </StyledContainer>
    );
}

export default Downvoted;
const StyledContainer = styled.div`
  max-width: 700px;
`;
