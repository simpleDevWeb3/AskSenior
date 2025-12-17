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
  Filler,
} from "chart.js";
import styled from "styled-components";
import { useFetchUsers } from "../Users/useFetchUsers";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useSearchParams } from "react-router-dom";
import { filterDataByDays } from "../../../../helpers/dateHelper";

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
  const [searchParam] = useSearchParams();

  const lastDay = Number(searchParam.get("last")) || 7;

  // --- HELPER: Process Data ---
  const processData = () => {
    if (!users) return { labels: [], counts: [] };

    const today = new Date();
    const dateMap = {};
    const labels = [];

    // 1. Generate all dates (Standard Logic)
    for (let i = lastDay - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);

      const label = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      labels.push(label);
      dateMap[label] = 0;
    }

    // 2. Count Users
    const filteredUsers = filterDataByDays(users, lastDay);

    filteredUsers.forEach((user) => {
      const userDate = new Date(user.created_at);
      const label = userDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (dateMap[label] !== undefined) {
        dateMap[label] += 1;
      }
    });

    const counts = labels.map((label) => dateMap[label]);

    return { labels, counts };
  };

  const { labels, counts } = processData();

  // --- CHART CONFIG ---
  const data = {
    labels: labels,
    datasets: [
      {
        label: "New Users",
        data: counts,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgb(53, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(53, 162, 235)",
        // Only show dots if we have less than 30 data points, otherwise it looks cluttered
        pointRadius: lastDay > 30 ? 0 : 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return ` ${context.parsed.y} New Users`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          // --- THE LOGIC FOR LEAP 5 ---
          maxRotation: 0,
          autoSkip: false, // We will manually handle skipping via callback

          callback: function (val, index) {
            // 'val' is the index in Category scales, but we use 'this.getLabelForValue' to be safe
            const label = this.getLabelForValue(val);

            // 1. If viewing small range (e.g. 7 days), show ALL labels
            if (lastDay <= 10) {
              return label;
            }

            // 2. If viewing large range, show every 5th label ("Leap 5")
            if (index % 5 === 0) {
              return label;
            }

            // 3. Always show the very last date (Today) so the chart has an endpoint
            if (index === labels.length - 1) {
              return label;
            }

            // Hide the rest
            return null;
          },
        },
      },
    },
  };

  if (isLoadUsers) return <SpinnerMini />;

  return (
    <StyledSection>
      <Header>User Growth (Last {lastDay} Days)</Header>
      <ChartBox>
        <Line data={data} options={options} />
      </ChartBox>
    </StyledSection>
  );
}

export default ChartUserGrowth;

// --- STYLES ---
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
  flex-grow: 1;
  width: 100%;
  min-height: 250px;
`;
