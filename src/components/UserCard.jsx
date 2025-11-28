import styled from "styled-components";
import { useUser } from "../features/Auth/useUser";
import { useState } from "react";
import Avatar from "./Avatar";

function UserCard() {
  const { user } = useUser();

  // Encode spaces for existing URLs
  const encodedBannerUrl = user.banner_url ? encodeURI(user.banner_url) : null;
  const encodedAvatarUrl = user.avatar_url ? encodeURI(user.avatar_url) : null;

  const [bannerImage, setBannerImage] = useState(encodedBannerUrl);
  const [iconImage, setIconImage] = useState(encodedAvatarUrl);
  return (
    <PreviewCard>
      <Banner $image={bannerImage} $fallbackColor="rgba(11, 111, 242, 0.9)" />
      <ProfileContent>
        <AvatarContainer>
          <Avatar src={iconImage} />
        </AvatarContainer>

        <ProfileDetails>
          <h3>u/{user.name}</h3>
          <p>1 follows</p>
        </ProfileDetails>
      </ProfileContent>

      <Description>{user.bio}</Description>
    </PreviewCard>
  );
}

const PreviewCard = styled.div`
  border: 1px solid var(--hover-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0px 5px 10px var(--hover-color);
`;

const Banner = styled.div`
  height: 5rem;
  background-color: ${(props) => props.$fallbackColor || "#0b6ff2"};
  background-image: ${(props) =>
    props.$image ? `url(${props.$image})` : "none"};
  background-size: cover;
  background-position: center;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.75rem 1rem 0;
`;

const AvatarContainer = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid white;
  margin-top: -1.5rem;
  background-color: #fff;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  & h3 {
    margin: 0;
    font-size: 1rem;
  }
  & p {
    margin: 0;
    color: #777;
    font-size: 0.85rem;
  }
`;

const Description = styled.p`
  padding: 0 1rem 1rem;
  color: #555;
  font-size: 0.9rem;
  word-wrap: break-word;
`;

export default UserCard;
