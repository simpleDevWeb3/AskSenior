import { useNavigate } from "react-router-dom";

export function usePostNavigation() {
  const navigate = useNavigate();
  const handleClickPost = (e, postId) => {
    const target = e.target;
    if (target.closest("[data-allowpostclick]")) {
      // allow navigation — skip blocking logic
    } else if (target.closest("button, a, img, [data-ignorepostclick]")) {
      // block normal buttons or links
      return;
    }
    console.log("Post clicked:", postId);
    navigate(`/comment/${postId}`);
  };

  const handleClickProfile = (e, communityId) => {
    if (e.target.closest("button, a, [data-ignorepostclick]")) return;
    navigate(`/community/${communityId}`);
    console.log(`/community/${communityId}`);
  };

  return { handleClickPost, handleClickProfile };
}
