import CommunityPosts from "../features/Community/CommunityPosts";
import { useScrollRestore } from "../hook/useScrollRestore";

function CommunityPage() {
  useScrollRestore();
  return (
    <div>
      <CommunityPosts />
    </div>
  );
}

export default CommunityPage;
