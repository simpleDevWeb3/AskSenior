import styled from "styled-components";
import { useState, useEffect } from "react";
import toast from "react-hot-toast"; // Assuming you have this, or use alert()
import { HiCheck, HiX } from "react-icons/hi";

// Components
import Table from "../../../../components/Table"; // Adjust path based on your folder structure
import Spinner from "../../../../components/Spinner";
import Avatar from "../../../../components/Avatar";

// Hooks & API
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";

import { formatDate_DD_MM_YYY } from "../../../../helpers/dateHelper";
import { useBanPost } from "../Posts/useBanPost";

function ModerateLogs() {
  const { posts, isLoadPosts } = useFetchPostsAdmin();
  const [todaysPosts, setTodaysPosts] = useState([]);
  const { banPost, isLoadBanPost, errorBanPost } = useBanPost();

  // 1. FILTER: Get only posts from Today
  useEffect(() => {
    if (posts) {
      const today = new Date();

      const filtered = posts.filter((post) => {
        const postDate = new Date(post.created_at);
        return (
          postDate.getDate() === today.getDate() &&
          postDate.getMonth() === today.getMonth() &&
          postDate.getFullYear() === today.getFullYear()
        );
      });
      setTodaysPosts(filtered);
    }
  }, [posts]);

  // 2. ACTION: Handle Ban or Pass
  const handleModeration = async (postId, action) => {
    const isBan = action === "BAN";

    setTodaysPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, is_banned: isBan } : post
      )
    );
  };

  if (isLoadPosts) return <Spinner />;

  return (
    <Container>
      <Header>
        <h1>Daily Moderation Queue</h1>
        <p>Reviewing {todaysPosts.length} posts from today</p>
      </Header>

      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col>Author</Table.Col>
          <Table.Col>Content Preview</Table.Col>
          <Table.Col>Time</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col>Action</Table.Col>
        </Table.Row>

        {todaysPosts.length === 0 ? (
          <EmptyState>No posts found for today.</EmptyState>
        ) : (
          todaysPosts.map((post) => (
            <Table.Row key={post.id}>
              {/* AUTHOR */}
              <Table.Data>
                <UserRow>
                  <Avatar src={post.users?.avatarUrl || "default-avatar.png"} />
                  <span>{post.users?.name || "Unknown"}</span>
                </UserRow>
              </Table.Data>

              {/* CONTENT (Truncated) */}
              <Table.Data>
                <ContentPreview>
                  {post.text.length > 50
                    ? post.text.substring(0, 50) + "..."
                    : post.text}
                </ContentPreview>
              </Table.Data>

              {/* TIME */}
              <Table.Data>{formatDate_DD_MM_YYY(post.created_at)}</Table.Data>

              {/* STATUS */}
              <Table.Data>
                {post.is_banned ? (
                  <StatusBadge type="banned">Banned</StatusBadge>
                ) : (
                  <StatusBadge type="active">Active</StatusBadge>
                )}
              </Table.Data>

              {/* ACTIONS */}
              <Table.Data>
                <ActionGroup>
                  {/* PASS BUTTON (Unban/Approve) */}
                  <ActionButton
                    color="green"
                    onClick={() => handleModeration(post.id, "PASS")}
                    disabled={!post.is_banned} // Disable if already passed/active
                  >
                    <HiCheck fill="#22c55e" /> Pass
                  </ActionButton>

                  {/* BAN BUTTON */}
                  <ActionButton
                    color="red"
                    onClick={() => handleModeration(post.id, "BAN")}
                    disabled={post.is_banned} // Disable if already banned
                  >
                    <HiX style={{ fill: "#ef4444" }} /> Ban
                  </ActionButton>
                </ActionGroup>
              </Table.Data>
            </Table.Row>
          ))
        )}
      </Table>
    </Container>
  );
}

export default ModerateLogs;

// --- STYLES ---

const Container = styled.div`
  padding: 1rem 0;
  margin-bottom: 5rem;
  border: solid 1px var(--hover-color);
  background-color: var(--background-glass);
  padding: 1rem;
  border-radius: 8px;
  min-height: 24.5rem;
`;

const Header = styled.div`
  margin-bottom: 2rem;
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
  p {
    color: var(--color-grey-500);
  }
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
`;

const ContentPreview = styled.div`
  color: var(--color-grey-600);
  max-width: 300px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  border: none;
  background: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  transition: all 0.2s;

  /* Dynamic Color based on prop */
  color: ${(props) => (props.color === "red" ? "#ef4444" : "#22c55e")};
  background-color: ${(props) =>
    props.color === "red" ? "#fee2e2" : "#dcfce7"};

  &:hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(1);
  }
`;

const StatusBadge = styled.span`
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 600;
  background-color: ${(props) =>
    props.type === "banned"
      ? "var(--color-red-100)"
      : "var(--color-green-100)"};
  color: ${(props) =>
    props.type === "banned"
      ? "var(--color-red-700)"
      : "var(--color-green-700)"};
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: var(--color-grey-500);
  font-style: italic;
`;
