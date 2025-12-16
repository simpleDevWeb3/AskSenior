import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Required for the "Area" fill effect
} from "chart.js";
import styled from "styled-components";
import { useFetchUsers } from "../Users/useFetchUsers"; // Assuming you have this hook
import SpinnerMini from "../../../../components/SpinnerMini";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartUserGrowth() {
  const { users, isLoadUsers } = useFetchUsers();

  // --- HELPER: Process Data by Month ---
  const processData = () => {
    if (!users) return { labels: [], counts: [] };

    const today = new Date();
    const last6Months = [];
    const counts = [0, 0, 0, 0, 0, 0];

    // 1. Generate labels for the last 6 months (e.g., "Jan", "Feb")
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      last6Months.push(d.toLocaleString("default", { month: "short" }));
    }

    // 2. Count users for each bucket
    users.forEach((user) => {
      const userDate = new Date(user.created_at);
      // Calculate month difference from today
      const monthDiff =
        (today.getFullYear() - userDate.getFullYear()) * 12 +
        (today.getMonth() - userDate.getMonth());

      // If user joined within last 6 months (0 to 5), increment that slot
      if (monthDiff >= 0 && monthDiff < 6) {
        // monthDiff 0 is this month (last index), 5 is 6 months ago (first index)
        const index = 5 - monthDiff;
        counts[index] += 1;
      }
    });

    return { labels: last6Months, counts };
  };

  const { labels, counts } = processData();

  // --- CHART CONFIG ---
  const data = {
    labels: labels,
    datasets: [
      {
        label: "New Users",
        data: counts,
        borderColor: "rgb(53, 162, 235)", // Blue Line
        backgroundColor: "rgba(53, 162, 235, 0.2)", // Blue Fill
        tension: 0.4, // Makes the line curved (smooth)
        fill: true, // Fills the area under the line
        pointBackgroundColor: "rgb(53, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(53, 162, 235)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide legend for cleaner look
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y axis at 0
        ticks: {
          precision: 0, // Avoid decimals (e.g., 1.5 users)
        },
      },
      x: {
        grid: {
          display: false, // Remove vertical grid lines for cleaner look
        },
      },
    },
  };

  if (isLoadUsers) return <SpinnerMini />;

  return (
    <StyledSection>
      <Header>User Growth</Header>
      <ChartBox>
        <Line data={data} options={options} />
      </ChartBox>
    </StyledSection>
  );
}

export default ChartUserGrowth;

// --- STYLES (Reusable) ---
const StyledSection = styled.div`
  background-color: var(--background-glass);
  border: 1px solid var(--hover-color);
  border-radius: 15px;
  padding: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const ChartBox = styled.div`
  flex-grow: 1; /* Fills remaining space */
  width: 100%;
  min-height: 250px; /* Ensures chart is visible */
`;
