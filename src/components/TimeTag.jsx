import { LuDot } from "react-icons/lu";
import { formatTimeAgo } from "../helpers/dateHelper";

function TimeTag({ created_at }) {
  return (
    <span style={{ fontSize: "0.8rem", display: "flex", textAlign: "center" }}>
      <LuDot /> {formatTimeAgo(created_at)}
    </span>
  );
}

export default TimeTag;
