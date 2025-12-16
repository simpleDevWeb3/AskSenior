import styled from "styled-components";
import CommonOverview from "./Features/Overview/CommonOverview";
import ChartMostDiscussCat from "./Features/Overview/ChartMostDiscussCat";
import ModerateLogs from "./Features/Overview/ModerateLogs";
import ChartUserGrowth from "./Features/Overview/ChartUserGrowth";

function Overview() {
  return (
    <Container>
      {/* Top Section: Stats Cards */}
      <CommonOverview />

      {/* Bottom Section: Table (Left) + Chart (Right) */}
      <GridLayout>
        <div style={{ width: "100%" }}>
          <ModerateLogs />
        </div>

        <div>
          <ChartMostDiscussCat />
        </div>
      </GridLayout>
      <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
        <ChartUserGrowth />
      </div>
    </Container>
  );
}

export default Overview;

// --- STYLES ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* Increased gap for better breathing room */
  height: 100%; /* Use % to fit parent, vh can cause double scrollbars */
  padding-bottom: 2rem;
  width: 70%;
`;

const GridLayout = styled.div`
  display: grid;

  grid-template-columns: 2fr 1fr;
  grid-template-rows: 25rem;
  gap: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr; /* Stack one on top of another */
  }
`;
