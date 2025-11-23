// Avatar.js
import styled from "styled-components";
import { useUser } from "../features/Auth/useUser";

const AvatarBorder = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block; /* avoids small gaps */
`;

function UserAvatar() {
  const { user } = useUser();
  return (
    <AvatarBorder>
      <StyledImage src={user.avatar_url} />
    </AvatarBorder>
  );
}

export default UserAvatar;
