import forumData from "../../data/post";
import PostList from "../Post/PostList";

function PostsTab() {
  const { posts } = forumData;
  return (
    <div>
      <PostList postData={posts} />
    </div>
  );
}

export default PostsTab;
