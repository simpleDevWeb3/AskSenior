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
import Search from "../../../../components/Search";
import { Dropdown } from "../../../../components/Dropdown";
import { useState, useEffect, useRef } from "react"; // 1. Import useEffect
import SortBy from "../../../../components/SortBy";

function PostTable() {
  // 2. Destructure setSearchParams
  const [searchParams, setSearchParams] = useSearchParams();

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { openModal } = useModal();
  const { unbanPost, isLoadUnbanPost, errorUnbanPost } = useUnbanPost();

  const { posts, isLoadPosts, errorPosts } = useFetchPostsAdmin();
  const [postList, setPostList] = useState(posts ?? []);

  // 3. Sync postList with posts when data loads
  useEffect(() => {
    if (posts) setPostList(posts);
  }, [posts]);

  const options = [
    { key: "All", label: "All" },
    { key: "COMMUNITY", label: "Community" },
    { key: "ACCOUNT", label: "Account" },
    { key: "BANNED", label: "Banned" },
    { key: "PUBLIC", label: "Public" },
  ];

  const optionSort = [
    { value: "created_at-desc", label: "Date (Newest first)" },
    { value: "created_at-asc", label: "Date (Oldest first)" },
    // UPDATE THESE TO MATCH YOUR DATA KEYS:
    { value: "total_upVote-desc", label: "Most Upvotes" },
    { value: "total_upVote-asc", label: "Least Upvotes" },
    { value: "total_downVote-desc", label: "Most Downvotes" },
    { value: "total_downVote-asc", label: "Least Downvotes" },
  ];

  const filterVal = searchParams.get("type");

  const filterRef = useRef(filterVal);
  // 4. RESET PAGE ON FILTER CHANGE
  // Whenever the filter type changes, if we are not on page 1, go to page 1.
  useEffect(() => {
    if (filterRef.current !== filterVal) {
      if (page > 1) {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }
      filterRef.current = filterVal;
    }
  }, [filterVal, setSearchParams, searchParams, page]);

  const filteredPosts = postList?.filter((post) => {
    if (!filterVal || filterVal === "All") return true;

    switch (filterVal) {
      case "BANNED":
        return post.is_banned === true;
      case "PUBLIC":
        return post.is_banned === false;
      case "COMMUNITY":
        return post.community_id;
      case "ACCOUNT":
        return !post.community_id;
      default:
        return true;
    }
  });

  // 1. Get the sort value from URL (default to Newest)
  const sortBy = searchParams.get("sortBy") || "created_at-desc";

  // 2. Split the value "created_at-desc" into ["created_at", "desc"]
  const [field, direction] = sortBy.split("-");

  // 3. Determine modifier: 1 for ascending, -1 for descending
  const modifier = direction === "asc" ? 1 : -1;

  // 4. Create the sorted list
  // IMPORTANT: Use [...filteredPosts] to create a copy.
  // Never use .sort() directly on state (postList) because it mutates the data.
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    // A. Handle Date Sorting
    if (field === "created_at") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }

    // B. Handle Number Sorting (Upvotes/Downvotes)
    // We default to 0 to prevent errors if a post has no votes yet
  
    const valA = a[field] || 0;
    const valB = b[field] || 0;

    return (valA - valB) * modifier;
  });

  const handleSearch = function (query) {
    if (!query) return setPostList(posts);

    if (page > 1) {
      searchParams.set("page", 1);
      setSearchParams(searchParams);
    }

    // Note: your original logic used exact word matching via split/includes.
    // If you want partial matches (e.g. searching "hello" matches "hello world"),
    // consider using .includes(query) directly.
    const result = posts.filter((post) =>
      post.text.toLowerCase().includes(query.toLowerCase())
    );
    setPostList(result);
  };

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const slicePosts = sortedPosts.slice(from, to);

  if (isLoadPosts) return <Spinner />;
  if (!posts || posts.length === 0) return <p>No posts found.</p>;
  return (
    <StyledContainer>
      <Header>
        <Dropdown>
          <div style={{ maxWidth: "30rem" }}>
            {/* Pass handleSearch to the Search component */}
            <Search dropdown={false} onInput={handleSearch} />
          </div>
        </Dropdown>
        <OperationRow>
          <Filter
            filterField="type"
            options={options}
            startingOption={"All"}
            variant={"tabs"}
          />
          <SortBy options={optionSort} />
        </OperationRow>
      </Header>
      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col>Author</Table.Col>
          <Table.Col>Post Content</Table.Col>
          <Table.Col>Created At</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col />
        </Table.Row>

        {slicePosts.map((post) => (
          <Table.Row key={post.id}>
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
                  <Avatar src={post?.avatar_url || "default-avatar.png"} />
                </div>
                <span>{post?.user_name || "Unknown"}</span>
              </div>
            </Table.Data>

            <Table.Data>{post.text?.substring(0, 50)}...</Table.Data>
            <Table.Data>{formatDate_DD_MM_YYY(post.created_at)}</Table.Data>
            <Table.Data>
              <Status isBanned={post?.is_banned} />
            </Table.Data>

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
      {/* Check if we have posts to show. If the list is empty, 
         pagination usually looks better if hidden, or passed count={0} 
      */}
      <br />
      <Pagination count={filteredPosts.length} />
    </StyledContainer>
  );
}

export default PostTable;

// Styled components remain the same...
const StyledContainer = styled.div`
  margin-bottom: 5rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const OperationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;
const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;
