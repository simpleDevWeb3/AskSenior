import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";
import { useFetchCommunityAdmin } from "../Community/useFetchCommunityAdmin"; // Fetch community names
import SpinnerMini from "../../../../components/SpinnerMini";
import { HiArrowTrendingUp, HiHashtag } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { filterDataByDays } from "../../../../helpers/dateHelper"; // Assuming you have this helper

ChartJS.register(ArcElement, Tooltip, Legend);

const COMMUNITY_COLORS = {
  "React Developers": "#61DAFB",
  "JavaScript Pros": "#F7DF1E",
  "UI/UX Design": "#FF61F6",
  "Python Users": "#3776AB",
  Webflow: "#4353FF",
  "Backend Eng": "#68A063",
};

const FALLBACK_COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

function ChartMostGrowingCommunities() {
  const [searchParams] = useSearchParams();
  const lastDay = Number(searchParams.get("last")) || 7;

  // 1. Fetch BOTH Data Sources
  const { posts, isLoadPosts } = useFetchPostsAdmin();
  const { community: communityData, isLoadCommunity } =
    useFetchCommunityAdmin();

  if (isLoadPosts || isLoadCommunity) return <SpinnerMini />;

  // --- LOGIC START ---

  // A. Filter posts by date (Last X Days)
  const filteredPosts = filterDataByDays(posts, lastDay);

  // B. Count Posts per Community ID
  // Result: { "101": 5, "102": 12, "103": 0 }
  const countsById = filteredPosts.reduce((acc, post) => {
    // Check if post has a community_id. If not, ignore or label "General"
    const id = post.community_id;
    if (id) {
      acc[id] = (acc[id] || 0) + 1;
    }
    return acc;
  }, {});

  // C. Map IDs to Names & Format Data
  const communitiesList = communityData?.communities || [];

  const chartDataRaw = Object.entries(countsById).map(([id, count]) => {
    // Find the community object to get the Name
    const foundComm = communitiesList.find((c) => String(c.id) === String(id));
    return {
      name: foundComm ? foundComm.name : `Unknown (${id})`,
      count: count,
    };
  });

  // D. Sort (High to Low) & Take Top 5
  const topCommunities = chartDataRaw
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // --- LOGIC END ---

  // Prepare Chart Data
  const labels = topCommunities.map((c) => c.name);
  const values = topCommunities.map((c) => c.count);
  const totalPosts = values.reduce((a, b) => a + b, 0);

  // Generate Colors
  const bgColors = labels.map((label, index) => {
    return (
      COMMUNITY_COLORS[label] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
    );
  });

  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: bgColors,
        borderColor: bgColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
  };

  return (
    <StyledSection>
      <Header>
        <Title>Top Active Communities</Title>
        <SubTitle>
          {lastDay === 0 ? "All time" : `Last ${lastDay} days`} post volume
        </SubTitle>
      </Header>

      <ContentRow>
        {/* LEFT: Chart */}
        <ChartContainer>
          {totalPosts === 0 ? (
            <NoDataText>No activity found</NoDataText>
          ) : (
            <Pie data={data} options={options} />
          )}
        </ChartContainer>

        {/* RIGHT: Custom Legend */}
        <CustomLegend>
          {labels.map((label, i) => {
            const count = values[i];

            return (
              <LegendItem key={label}>
                <Rank>
                  <HiHashtag /> {i + 1}
                </Rank>
                <ColorBox color={bgColors[i]} />
                <LegendInfo>
                  <LabelText>{label}</LabelText>
                  <StatsRow>
                    <CountText>{count} posts</CountText>
                  </StatsRow>
                </LegendInfo>
              </LegendItem>
            );
          })}
        </CustomLegend>
      </ContentRow>
    </StyledSection>
  );
}

export default ChartMostGrowingCommunities;

// --- STYLES ---
const Rank = styled.div`
  display: "flex";
  font-size: 0.8rem;
`;
const StyledSection = styled.div`
  background-color: var(--background-glass);
  border: 1px solid var(--hover-color);
  border-radius: 15px;
  padding: 1.5rem;
  width: 100%;
  min-height: 22rem;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
`;

const SubTitle = styled.p`
  font-size: 0.85rem;
  color: var(--color-grey-500);
`;

const ContentRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  gap: 20px;
`;

const ChartContainer = styled.div`
  flex: 1;
  height: 250px;
  max-width: 55%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoDataText = styled.div`
  color: var(--color-grey-500);
  font-size: 0.9rem;
  font-style: italic;
`;

const CustomLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 45%;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const ColorBox = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  margin-top: 5px;
  flex-shrink: 0;
`;

const LegendInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
`;

const CountText = styled.span`
  font-size: 0.8rem;
  color: var(--color-grey-500);
`;

const TrendBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #22c55e;
  background-color: rgba(34, 197, 94, 0.1);
  padding: 1px 6px;
  border-radius: 4px;

  svg {
    width: 10px;
    height: 10px;
  }
`;
