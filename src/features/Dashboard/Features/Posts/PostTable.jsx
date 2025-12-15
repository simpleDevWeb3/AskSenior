import { HiDotsVertical } from "react-icons/hi";
import { FaBan, FaDotCircle, FaTrash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import styled from "styled-components";

import { useFetchPosts } from "../../../Post/useFetchPosts";
import Table from "../../../../components/Table";
import Menus from "../../../../components/Menus";
import Spinner from "../../../../components/Spinner";
import Avatar from "../../../../components/Avatar";
import ButtonIcon from "../../../../components/ButtonIcon";
import { useUser } from "../../../Auth/useUser";
import { formatDate_DD_MM_YYY } from "../../../../helpers/dateHelper";

import { useBanPost } from "./useBanPost";
import { useModal } from "../../../../context/ModalContext";
import { useFetchPostsAdmin } from "./useFetchPostsAdmin";
import { GoDotFill } from "react-icons/go";
import Status from "../../../../components/Status";
import { useUnbanPost } from "./useUnbanPost";
import Pagination from "../../../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../constant/FILE_CONFIG";
import Filter from "../../../../components/Filter";

function PostTable() {
  const [searchParams] = useSearchParams();

  // 1. Get the page safely. Default to 1 if missing.
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { openModal } = useModal();
  const { unbanPost, isLoadUnbanPost, errorUnbanPost } = useUnbanPost();
  const { user } = useUser();

  const { posts, isLoadPosts, errorPosts } = useFetchPostsAdmin();

  if (isLoadPosts) return <Spinner />;

  // Safety check: if posts is undefined/empty, don't crash
  if (!posts || posts.length === 0) return <p>No posts found.</p>;

  const options = [
    { key: "All", label: "All" },
    { key: "COMMUNITY", label: "Community" },
    { key: "ACCOUNT", label: "Account" },
    { key: "BANNED", label: "Banned" },
    { key: "PUBLIC", label: "Public" },
  ];
  const filterVal = searchParams.get("type");
  //get filtered
  const filteredPosts = posts?.filter((post) => {
    // If no filter is selected (or "All"), show everything
    if (!filterVal || filterVal === "All") return true;

    switch (filterVal) {
      case "BANNED":
        return post.is_banned === true;

      case "PUBLIC":
        // Logic for Public: usually means NOT banned
        return post.is_banned === false;

      case "COMMUNITY":
        return post.community_id;

      case "ACCOUNT":
        return !post.community_id;

      default:
        return true;
    }
  });
  //page it
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const slicePosts = filteredPosts.slice(from, to);

  return (
    <>
      <Filter
        filterField="type"
        options={options}
        startingOption={"All"}
        variant={"tabs"}
      />
      <Table>
        {/* 1. Update Columns to match POST data, not User data */}
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col>Author</Table.Col>
          <Table.Col>Post Content</Table.Col>
          <Table.Col>Created At</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col />
        </Table.Row>

        {/* 2. Map over 'posts', not 'users' */}
        {slicePosts.map((post) => (
          <Table.Row key={post.id}>
            {/* Column 1: Author Info */}
            <Table.Data>
              <div
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    height: "3rem",
                    width: "3rem",
                    overflow: "hidden",
                  }}
                >
                  {/* Ensure you access the author inside the post object */}
                  <Avatar src={post?.avatar_url || "default-avatar.png"} />
                </div>
                <span>{post?.user_name || "Unknown"}</span>
              </div>
            </Table.Data>

            {/* Column 2: Post Content (Truncated) */}
            <Table.Data>
              {/* Limit content length for the table view */}
              {post.text?.substring(0, 50)}...
            </Table.Data>
            {/* Column 3: Date */}
            <Table.Data>{formatDate_DD_MM_YYY(post.created_at)}</Table.Data>
            <Table.Data>
              <Status isBanned={post?.is_banned} />
            </Table.Data>

            {/* Column 4: Actions */}
            <Table.Data>
              <Menus.MenuToggle id={`post-${post.id}`}>
                <ButtonIcon
                  variant="text"
                  size="rounded"
                  icon={<HiDotsVertical />}
                />
              </Menus.MenuToggle>

              <Menus.MenuList id={`post-${post.id}`}>
                <Menus.MenuBtn>
                  <MenuTxt>
                    <ImProfile />
                    <span>Details</span>
                  </MenuTxt>
                </Menus.MenuBtn>

                <Menus.MenuBtn
                  onClickAction={() =>
                    !post?.is_banned
                      ? openModal("ban-post", { postId: post.id })
                      : unbanPost({ post_id: post?.id, reason: "unban post" })
                  }
                >
                  <MenuTxt>
                    <FaBan />
                    {post?.is_banned ? (
                      <span>Unban</span>
                    ) : (
                      <span>Ban Post</span>
                    )}
                  </MenuTxt>
                </Menus.MenuBtn>
              </Menus.MenuList>
            </Table.Data>
          </Table.Row>
        ))}
      </Table>
      <Pagination count={filteredPosts.length} />
      <br />
    </>
  );
}

export default PostTable;

// Missing styled component definition
const RedDot = styled(GoDotFill)`
  fill: rgba(198, 47, 47, 0.996);
`;
const GreenDot = styled(GoDotFill)`
  fill: rgba(47, 198, 70, 0.996);
`;
const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
