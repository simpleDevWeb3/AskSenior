import styled from "styled-components";
import CommonOverview from "./Features/Overview/CommonOverview";
import ChartMostDiscussCat from "./Features/Overview/ChartMostDiscussCat";
import ModerateLogs from "./Features/Overview/ModerateLogs";

function Overview() {
  return (
    <Container>
 
      <CommonOverview />
      <VerticalContainer>
        <ModerateLogs />
        <ChartMostDiscussCat />
      </VerticalContainer>
    </Container>
  );
}

export default Overview;
const Container = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  height: 100vh;
`;
const VerticalContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`;
