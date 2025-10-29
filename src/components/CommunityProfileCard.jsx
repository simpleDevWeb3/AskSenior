import styled from "styled-components";
import Avatar from "./Avatar";
import ButtonIcon from "./ButtonIcon";
import { BiBell } from "react-icons/bi";
import { HiPlus } from "react-icons/hi2";

function CommunityProfileCard({ communityData }) {
  const { name } = communityData;
  console.log(communityData);
  return (
    <StyledContainer>
      <BannerContainer>
        <Banner>
          <img src="/avatar.jpg" />
        </Banner>

        <AvatarContainer>
          <Avatar src={"/avatar.jpg"} />
        </AvatarContainer>
      </BannerContainer>

      <HorizontalContainer>
        <ReservedContainer />
        <HorizontalContainer2>
          <h1>{name}</h1>
          <FeatureRows>
            <ButtonIcon icon={<AddIcon />} variant="outline">
              <span>Create Post</span>
            </ButtonIcon>
            <ButtonIcon variant="outline">
              <span>Join</span>
            </ButtonIcon>
            <ButtonIcon icon={<BiBell />} />
          </FeatureRows>
        </HorizontalContainer2>
      </HorizontalContainer>
    </StyledContainer>
  );
}
const AddIcon = styled(HiPlus)`
  font-size: 1.5rem;
`;
const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  width: 100%;
`;
const ReservedContainer = styled.div`
  width: 4rem;
`;
const Banner = styled.div`
  height: 8rem;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  & > img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;
const BannerContainer = styled.div`
  position: relative;
  width: 100%;
`;
const FeatureRows = styled.div`
  display: flex;
  gap: 1rem;
  height: 2.5rem;
`;

const AvatarContainer = styled.div`
  width: 6rem;
  height: 6rem;
  overflow: hidden;
  position: absolute;
  top: 6rem;
  left: 1rem;
  border-radius: 50%;
  border: solid 0.2rem white;
  & img {
    z-index: 99;
  }
`;

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HorizontalContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const HorizontalContainer2 = styled.div`
  display: flex;
  gap: 2rem;
  padding-left: 2rem;
  padding-right: 1rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export default CommunityProfileCard;
