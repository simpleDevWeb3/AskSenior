import { useOutletContext } from "react-router-dom";
import PostList from "../Post/PostList";
import { useUser } from "../Auth/useUser";
import { useSearchPosts } from "../Post/useSearchPost";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Mosaic } from "react-loading-indicators";
import Spinner from "../../components/Spinner";
import styled from "styled-components";
import NoResultSearch from "../../components/NoResultSearch";

function SearchPostResult({ query }) {
  const { user } = useUser();
  const {
    posts,
    isLoadPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    errorPost,
  } = useSearchPosts(user?.id, query);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log("hasNextPage?: " + hasNextPage);
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (isLoadPost)
    return (
      <FullPageLoader>
        <Spinner />
      </FullPageLoader>
    );
  if (errorPost) return <p>Error: {errorPost}</p>;
  if (posts.length === 0) return <NoResultSearch query={query} />;

  return (
    <div>
      <PostList postData={posts} />
      <div
        ref={ref}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10rem",
          width: "100%",
        }}
      >
        {isFetchingNextPage && (
          <Mosaic
            color="rgba(21, 144, 221, 0.889)"
            size="large"
            text=""
            textColor=""
          />
        )}
      </div>
    </div>
  );
}
const FullPageLoader = styled.div`
  position: absolute;
  top: auto;
  left: auto;
  right: auto;
`;
export default SearchPostResult;
