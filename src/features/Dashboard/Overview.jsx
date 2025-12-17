import styled from "styled-components";
import CommonOverview from "./Features/Overview/CommonOverview";
import ChartMostDiscussCat from "./Features/Overview/ChartMostDiscussCat";
import ModerateLogs from "./Features/Overview/ChartMostGrowingCommunities";
import ChartUserGrowth from "./Features/Overview/ChartUserGrowth";
import Filter from "../../components/Filter";
import ChartMostGrowingCommunities from "./Features/Overview/ChartMostGrowingCommunities";
import ChartMostBannedReason from "./Features/Overview/ChartMostBannedReason";
import ChartMostDiscussPost from "./Features/Overview/ChartMostDiscussPost";

const options = [
  { key: "7", label: "Last 7 days" },
  { key: "30", label: "Last 30 days" },
  { key: "90", label: "Last 90 days" },
];

function Overview() {
  return (
    <Container>
      <div
        style={{ marginTop: "1rem", display: "flex", justifyContent: "end" }}
      >
        <Filter
          filterField="last"
          options={options}
          startingOption={"7"}
          variant={"tabs"}
        />
      </div>
      {/* Top Section: Stats Cards */}
      <CommonOverview />

      {/* Bottom Section: Table (Left) + Chart (Right) */}
      <GridLayout>
        <div>
          <ChartMostGrowingCommunities />
        </div>

        <div>
          <ChartMostDiscussCat />
        </div>

        <div>
          <ChartMostBannedReason />
        </div>
        <div>
          <ChartMostDiscussPost />
        </div>
      </GridLayout>

      <ChartUserGrowth />
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

`;

const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  gap: 1.5rem;
  @media (max-width: 1200px) {
    grid-template-columns: 1fr; /* Stack one on top of another */
  }
`;
