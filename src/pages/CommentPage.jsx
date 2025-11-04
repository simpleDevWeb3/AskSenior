import styled from "styled-components";
import CommentPost from "../features/Comment/CommentPost";
import Comments from "../features/Comment/Comments";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "../components/ButtonIcon";
import { FieldTextProvider } from "../context/FieldTextContext";
import CommunityInfo from "../components/CommunityInfo";
import useSidebar from "../hook/useSidebar";

function CommentPage() {
  const navigate = useNavigate();
  const { isSidebarOpen } = useSidebar();
  return (
    <FieldTextProvider>
      <StyledContainer isSidebarOpen={isSidebarOpen}>
        <NavigateBack>
          <ButtonIcon
            action={() => navigate(-1)}
            variant="primary"
            size="rounded_small"
            icon={<HiArrowLeft />}
          />
        </NavigateBack>
        <ContentGrid>
          <ContentWrapper>
            <CommentPost />

            <Comments />
          </ContentWrapper>
          <ContentWrapper>
            <Sidebar>
              <CommunityInfo />
            </Sidebar>
          </ContentWrapper>
        </ContentGrid>
      </StyledContainer>
    </FieldTextProvider>
  );
}

const StyledContainer = styled.div`
  display: flex;

  width: 80%;
  height: 100vh;
  justify-content: center;
  padding: 2rem 1rem;
  transform: ${(props) =>
    props.isSidebarOpen ? "translateX(17rem)" : "translateX(5rem)"};
  transition: all 0.3s ease;

  box-sizing: border-box;
  overflow-y: scroll;

  @media (max-width: 1300px) {
    justify-content: left;
  }
  align-items: start;
`;
const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  gap: 2rem;
  width: 100%;
  justify-content: center;
  max-width: 1100px;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
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
  margin-top: 0.1rem;
  margin-right: 0.2rem;
`;
const Sidebar = styled.div`
  top: 0.1rem;
  align-self: start; /* ensures sticky works in grid */
  height: fit-content;
  width: 100%;
  background-color: #efefef;
  border-radius: 8px;
  padding: 1rem;

  @media (max-width: 1000px) {
    display: none;
  }
`;
export default CommentPage;
