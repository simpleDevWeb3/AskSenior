import styled from "styled-components";
import Spinner from "../../components/Spinner";
import forumData from "../../data/post";
import { useUser } from "../Auth/useUser";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";
import { useFetchCurrUserPost } from "../Post/useFetchCurrUserPost";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Mosaic } from "react-loading-indicators";
import NoExist from "../../components/NoExist";
import { useOutletContext } from "react-router-dom";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useModal } from "../../context/ModalContext";
import { useDeletePost } from "../Post/useDeletePost";

function PostsTab() {
  const { userId, isOwnedAcc } = useOutletContext();
  const { modalData, closeModal } = useModal();
  const { deletePost, isDeletingPost } = useDeletePost(userId, closeModal);
  const {
    posts,
    isLoadPost,
    errorPost,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchCurrUserPost(userId);

  const { ref, inView } = useInView();
  const existPost = posts.length > 0;
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);
  if (isLoadPost) return <Spinner />;

  return (
    <Container style={{ position: "relative" }}>
      {isLoadPost && <Spinner />}
      {errorPost && <div>{errorPost}</div>}
      {!existPost && <NoExist name={"post "} />}
      {posts &&
        posts.map((post) => (
          <PostWrapper key={post.id}>
            <PostCard
              postData={post}
              variant={isOwnedAcc ? "user_post" : "post"}
            />
            <br />
          </PostWrapper>
        ))}
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

      <Modal id={"Delete Post"}>
        <ConfirmDelete
          onConfirm={() => deletePost(modalData?.id)}
          onClose={closeModal}
          disabled={isDeletingPost}
        />
      </Modal>
    </Container>
  );
}
const PostWrapper = styled.div`
  padding: 0.5rem 1rem;
  background-color: var(--background-glass);

  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.15s;
  &:hover {
    background-color: var(--hover-color);
  }
  border-radius: 18px;
`;

const Container = styled.div`
  max-width: 700px;
`;

const Outline = styled.div`
  width: 100%;
  height: 1px;
  background-color: var(--hover-color);
`;
export default PostsTab;
