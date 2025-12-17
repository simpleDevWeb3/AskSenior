import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useSearchParams } from "react-router-dom";
import { filterDataByDays } from "../../../../helpers/dateHelper";
import { HiArrowTrendingUp, HiHashtag } from "react-icons/hi2"; // Optional icon for aesthetics
import { useFetchAllBanned } from "./useFetchAllBanned";
import { useUser } from "../../../Auth/useUser";
import { truncateText } from "../../../../helpers/stringHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

const LABEL_COLORS = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];

function ChartMostBannedReason() {
  const { user } = useUser();
  const { banned, isLoadBanned, errorBanned } = useFetchAllBanned(user?.id);
  const [SearchParam] = useSearchParams();
  const lastDay = Number(SearchParam.get("last")) || 7;

  if (isLoadBanned) return <SpinnerMini />;

  // 1. get the banned data based on the last day.
  const filteredBanned = filterDataByDays(banned?.data || [], lastDay);
  const reason = filteredBanned?.map((ban) => ban?.reason) || [];

  const allReasonCount = reason.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const top5Reason = Object.entries(allReasonCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const chartLabels = top5Reason.map((entry) => entry[0]);
  const chartValues = top5Reason.map((entry) => entry[1]);

  // 2. Assign Colors
  const bgColors = chartLabels.map((label, index) => {
    return LABEL_COLORS[index % LABEL_COLORS.length];
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
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
        <Title>Most Banned Reasons</Title>
        <SubTitle>
          {lastDay === 0 ? "All time" : `Last ${lastDay} days`} volume
        </SubTitle>
      </Header>

      <ContentRow>
        {/* LEFT: Chart */}
        <ChartContainer>
          <Pie data={data} options={options} />
        </ChartContainer>

        {/* RIGHT: Detailed Legend */}
        <CustomLegend>
          {chartLabels.map((label, i) => {
            const count = chartValues[i];

            return (
              <LegendItem key={label}>
                <Rank>
                  <HiHashtag /> {i + 1}
                </Rank>
                <ColorBox color={bgColors[i]} />
                <LegendInfo>
                  <LabelText>{truncateText(label, 50)}</LabelText>
                  <StatsRow>
                    <CountText>{count} posts</CountText>
                    {/* Using Badge for Percentage Share */}
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

export default ChartMostBannedReason;

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
  margin-top: 5px; /* Align with text top */
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
