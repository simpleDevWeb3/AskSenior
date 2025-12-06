import { NavLink } from "react-router-dom";
import Accordian from "./Accordian";
import styled from "styled-components";

function ListJoinedCommunity({ communities }) {
  const existCommunities = communities.length > 0;
  if (existCommunities)
    return (
      <Accordian title={"Joined"}>
        {communities.map((c) => (
          <StyledNavLink key={c.id} to={`community/${c.id}`}>
            <div>
              <Avatar src={c.avatarUrl} />
            </div>
            <span>{c.name}</span>
          </StyledNavLink>
        ))}
      </Accordian>
    );
}

export default ListJoinedCommunity;

// 1. Added new styled component for the image
const Avatar = styled.img`
  width: 1.5rem; /* Matches the previous icon size */
  height: 1.5rem;
  border-radius: 50%; /* Makes the image circular */
  object-fit: cover; /* Ensures image isn't squashed */
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: var(--primary-color);
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1rem;
  border-radius: var(--border-radius);
  transition: background 0.2s;
  margin-bottom: 0.5rem;
  &.active {
    background-color: var(--hover-color);
    color: var(--primary-color);
  }

  /* Removed svg styling since we are using an img now */

  &:hover {
    background-color: var(--hover-color);
  }
`;
