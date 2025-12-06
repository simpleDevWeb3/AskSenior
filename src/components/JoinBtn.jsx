import { useJoinCommunity } from "../features/Community/useJoinCommunity";
import { useLeaveCommunity } from "../features/Community/useLeaveCommunity";
import ButtonIcon from "./ButtonIcon";
import SpinnerMini from "./SpinnerMini";

function JoinBtn({ community_id, user_id, isJoined }) {
  const { leaveCommunity, isLoadingleaveCommunity } = useLeaveCommunity();
  const { joinCommunity, isLoadingJoinCommunity } = useJoinCommunity();

  const isLoading = isLoadingleaveCommunity || isLoadingJoinCommunity;

  const handleClick = (e) => {
    e.stopPropagation();

    if (isLoading) return;

    if (isJoined) {
      leaveCommunity({ community_id, user_id });
    } else {
      joinCommunity({ community_id, user_id });
    }
  };

  return (
    <ButtonIcon
      style={
        isJoined
          ? {
              background: "none",
              border: "solid 1px var(--hover-color)",
            }
          : { backgroundColor: " rgba(32, 104, 204, 0.999)" }
      }
      action={handleClick}
      disabled={isLoading}
    >
      <span
        style={isJoined ? { color: "var(--text-color)" } : { color: "white" }}
      >
        {isLoading ? <SpinnerMini /> : isJoined ? "Joined" : "Join"}
      </span>
    </ButtonIcon>
  );
}

export default JoinBtn;
