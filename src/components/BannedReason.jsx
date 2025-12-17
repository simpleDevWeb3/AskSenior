import styled from "styled-components";

function BannedReason({ reason }) {
  return (
    <ReasonContainer>
      <ReasonTitle>Admin Reason</ReasonTitle>"{reason || "No reason provided"}"
    </ReasonContainer>
  );
}
const ReasonContainer = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ReasonTitle = styled.span`
  font-weight: 700;
  text-transform: uppercase;
  font-size: 11px;
  opacity: 0.8;
`;
export default BannedReason;
