import styled, { css } from "styled-components";
import { variantSize } from "../../styles/VariantSize";

const BtnText = styled.span`
  margin: 0.5rem;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MenusContainer = styled.div``;


const TextWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
`;

const avatarSizes = {
  small: css`
    width: 1.8rem;
    height: 1.8rem;
  `,
  medium: css`
    width: 2.2rem;
    height: 2.2rem;
  `,
  large: css`
    width: 5rem;
    height: 5rem;
  `,
};
const AvatarContainer = styled.div`
  ${({ $size }) => avatarSizes[$size] || avatarSizes.small};
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center; /* vertical align */
  gap: 0.5rem; /* spacing between avatar and name */
  margin-bottom: 0.5rem;
`;
const usernameSizes = {
  small: "0.7rem",
  medium: "0.9rem",
  large: "1rem",
};

const UserName = styled.div`
  color: var(--primary-color);
  font-weight: 700;
  font-size: ${({ $size }) => usernameSizes[$size] || usernameSizes.medium};
`;
const CommentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const SocialFeatures = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export {
  BtnText,
  PostHeader,
  MenusContainer,

  TextWrapper,
  AvatarContainer,
  ProfileContainer,
  UserName,
  CommentWrapper,
  SocialFeatures,
};
