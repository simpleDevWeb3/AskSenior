import forumData from "../../data/post";
import PostCard from "../Post/PostCard";
import PostList from "../Post/PostList";

function PostsTab() {
  const { posts } = forumData;
  return (
    <div>
      {posts.map((post) => (
        <>
          <PostCard postData={post} variant="user_post" />
          <br />
        </>
      ))}
    </div>
  );
}

export default PostsTab;
