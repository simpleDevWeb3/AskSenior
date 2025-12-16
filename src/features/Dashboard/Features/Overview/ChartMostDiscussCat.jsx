import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

function ChartMostDiscussCat() {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)", // Increased opacity for better visibility
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // --- CONFIGURATION OPTIONS ---
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows us to define height in CSS
    plugins: {
      legend: {
        position: "right", // <--- THIS MOVES LEGEND TO THE SIDE
        labels: {
          color: "#e5e7eb", // Light text for dark mode
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false, // We use our own HTML <h2> title
      },
    },
  };

  return (
    <StyledSection>
      <Title>Most Discussed Topics</Title>

      <ChartBox>
        <Pie data={data} options={options} />
      </ChartBox>
    </StyledSection>
  );
}

export default ChartMostDiscussCat;

// --- STYLES ---

const StyledSection = styled.div`
  background-color: var(--background-glass);
  border: 1px solid var(--hover-color);
  border-radius: 15px; /* Rounded corners */
  padding: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Aligns title to left */

  width: 100%;

  height: auto;
  min-height: 20rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const ChartBox = styled.div`
  /* This container controls the chart size */
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
