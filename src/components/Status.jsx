import { GoDotFill } from "react-icons/go";
import styled from "styled-components";

function Status({ isBanned = false, ban = "banned", notBan = "public" }) {
  return isBanned ? (
    <StatusBadge $isBanned={isBanned}>{ban}</StatusBadge>
  ) : (
    <StatusBadge $isBanned={isBanned}>{notBan}</StatusBadge>
  );
}

export default Status;
const RedDot = styled(GoDotFill)`
  fill: rgba(198, 47, 47, 0.996);
`;
const GreenDot = styled(GoDotFill)`
  fill: rgba(47, 198, 70, 0.996);
`;
const StatusBadge = styled.span`
  margin-bottom: 0.25rem;
  z-index: 10;
  padding: 0.25rem 0.75rem;
  font-size: 0.625rem; /* text-[10px] */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;

  /* Conditional Styling based on props */
  background-color: ${(props) =>
    props.$isBanned ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)"};
  color: ${(props) => (props.$isBanned ? "#f87171" : "#4ade80")};
  border: 1px solid
    ${(props) =>
      props.$isBanned ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)"};
`;
