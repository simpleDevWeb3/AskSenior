import { useNavigate } from "react-router-dom";

export function usePostNavigation() {
  const navigate = useNavigate();
  const handleClickPost = (postId) => {
    console.log("Post clicked:", postId);
    navigate(`/comment/${postId}`);
  };

  const handleClickProfile = (e, communityId) => {
    e.stopPropagation();
    navigate(`/community/${communityId}`);
    console.log(`/community/${communityId}`);
  };

  return { handleClickPost, handleClickProfile };
}
