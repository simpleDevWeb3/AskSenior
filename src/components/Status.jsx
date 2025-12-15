import { GoDotFill } from "react-icons/go";
import styled from "styled-components";

function Status({ isBanned = false, ban = "banned", notBan = "public" }) {
  return isBanned ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        textAlign: "center",
      }}
    >
      <RedDot /> {ban}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        textAlign: "center",
      }}
    >
      <GreenDot /> {notBan}
    </div>
  );
}

export default Status;
const RedDot = styled(GoDotFill)`
  fill: rgba(198, 47, 47, 0.996);
`;
const GreenDot = styled(GoDotFill)`
  fill: rgba(47, 198, 70, 0.996);
`;
