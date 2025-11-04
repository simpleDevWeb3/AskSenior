import { useState } from "react";
import styled from "styled-components";
import { HiBell, HiOutlineCheckCircle } from "react-icons/hi";

function NotificationLayout() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your post received a new comment!",
      time: "2 mins ago",
      isRead: false,
    },
    {
      id: 2,
      message: "You have a new follower: barista_joe",
      time: "10 mins ago",
      isRead: false,
    },
    {
      id: 3,
      message: "Your post was upvoted by technerd 💻",
      time: "1 hour ago",
      isRead: true,
    },
  ]);

  function markAsRead(id) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  return (
    <Wrapper>
      <Header>
        <Title>
          <HiBell /> Notifications
        </Title>
        <MarkAllButton onClick={markAllAsRead}>
          <HiOutlineCheckCircle />
          Mark all as read
        </MarkAllButton>
      </Header>

      <NotificationList>
        {notifications.length === 0 ? (
          <EmptyState>No notifications yet</EmptyState>
        ) : (
          notifications.map((n) => (
            <NotificationItem
              key={n.id}
              $isRead={n.isRead}
              onClick={() => markAsRead(n.id)}
            >
              <Message>{n.message}</Message>
              <Time>{n.time}</Time>
            </NotificationItem>
          ))
        )}
      </NotificationList>
    </Wrapper>
  );
}

export default NotificationLayout;



const Wrapper = styled.div`

  margin: 2rem auto;
  padding: 1.5rem;


`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color, #333);
`;

const MarkAllButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--secondary-color, #c8a165);
  color: white;
  border: none;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: var(--primary-color, #6f4e37);
  }
`;

const NotificationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const NotificationItem = styled.div`
  background: ${({ $isRead }) =>
    $isRead ? "white" : "rgba(255, 240, 220, 0.5)"};
  border-left: 4px solid
    ${({ $isRead }) =>
      $isRead ? "transparent" : "var(--primary-color, #6f4e37)"};
  padding: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #fff5e9;
  }
`;

const Message = styled.div`
  font-size: 1rem;
  color: var(--text-color, #333);
`;

const Time = styled.div`
  font-size: 0.8rem;
  color: gray;
  margin-top: 0.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: gray;
  padding: 2rem 0;
`;
