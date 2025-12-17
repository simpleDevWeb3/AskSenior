import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import { useFetchPostsAdmin } from "../Posts/useFetchPostsAdmin";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useSearchParams } from "react-router-dom";
import { filterDataByDays } from "../../../../helpers/dateHelper";
import { HiHashtag } from "react-icons/hi2";
import { useFetchAllComments } from "./useFetchAllComment";

ChartJS.register(ArcElement, Tooltip, Legend);

const LABEL_COLORS = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
];

function ChartMostDiscussPost() {
  const { comments, isLoadComments } = useFetchAllComments();
  const { posts, isLoadPosts } = useFetchPostsAdmin();
  const [SearchParam] = useSearchParams();
  const lastDay = Number(SearchParam.get("last")) || 7;

  if (isLoadPosts || isLoadComments) return <SpinnerMini />;

  // 1. Filter Data by Date
  const filteredPost = filterDataByDays(posts || [], lastDay);
  const filteredComment = filterDataByDays(comments || [], lastDay);

  // 2. Map Comments to Posts (Group by ID, not Title)
  const postsMap = {};

  // Initialize map with posts
  filteredPost.forEach((post) => {
    postsMap[post.id] = {
      title: post.title,
      id: post.id,
      comments: [],
    };
  });

  // Push comments into specific post buckets
  filteredComment.forEach((comment) => {
    const postId = comment.post_id;
    if (postsMap[postId]) {
      postsMap[postId].comments.push(comment);
    }
  });

  // 3. Convert to Array and Sort
  const finalData = Object.values(postsMap).filter(
    (post) => post.comments.length > 0
  );

  const TopCommentCountPost = finalData
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, 5);

  const chartLabels = TopCommentCountPost.map((post) => post.title);

  const chartValues = TopCommentCountPost.map((post) => post.comments.length);

  // Calculate total for percentage badge
  const totalTopComments = chartValues.reduce((acc, cur) => acc + cur, 0);

  // Assign Colors
  const bgColors = chartLabels.map((_, index) => {
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

  // 5. Handle Empty State
  if (totalTopComments === 0) {
    return (
      <StyledSection>
        <Header>
          <Title>Most Discussed Posts</Title>
          <SubTitle>No comments found in the last {lastDay} days.</SubTitle>
        </Header>
        <EmptyState>No data available</EmptyState>
      </StyledSection>
    );
  }

  return (
    <StyledSection>
      <Header>
        <Title>Most Discussed Posts</Title>
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
              <LegendItem key={`${label}-${i}`}>
                <Rank>
                  <HiHashtag /> {i + 1}
                </Rank>
                <ColorBox color={bgColors[i]} />
                <LegendInfo>
                  <LabelText title={label}>{label}</LabelText>

                  <CountText>{count} comments</CountText>
                </LegendInfo>
              </LegendItem>
            );
          })}
        </CustomLegend>
      </ContentRow>
    </StyledSection>
  );
}

export default ChartMostDiscussPost;

// --- STYLES ---

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

const Rank = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  color: var(--color-grey-400);
  margin-top: 5px;
  width: 30px;
`;

const ColorBox = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background-color: ${(props) => props.color};
  margin-top: 6px;
  flex-shrink: 0;
`;

const LegendInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Ensures text truncation works */
`;

const LabelText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px; /* Adjusted width */
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

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: var(--color-grey-400);
  font-size: 0.9rem;
`;
