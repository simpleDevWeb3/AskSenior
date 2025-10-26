import styled from "styled-components";
import CommentPost from "../features/Comment/CommentPost";
import Comments from "../features/Comment/Comments";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../components/ButtonIcon";

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  overflow-y: scroll;
  @media (max-width: 1300px) {
    justify-content: left;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 740px; /* Reddit post column width */
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const NavigateBack = styled.div`
  margin-right: 0.2rem;
`;
function CommentPage() {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <NavigateBack>
        <ButtonIcon
          action={() => navigate(-1)}
          variant="text"
          size="rounded_small"
          icon={<HiArrowLeft />}
        />
      </NavigateBack>
      <ContentWrapper>
        <CommentPost />
        <Comments />
      </ContentWrapper>
    </StyledContainer>
  );
}

export default CommentPage;
