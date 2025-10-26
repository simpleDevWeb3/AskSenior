import { useParams } from "react-router-dom";
import forumData from "../../data/post";
import PostCard from "../../components/PostComponent/PostCard";
import styled from "styled-components";
import TextFields from "../../components/TextFields";
import { useFieldText } from "../../hook/useFieldText";

const ShareYourThougt = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.1);
  border-radius: 25px;

  padding: 0.5rem;
  padding-left: 1rem;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  transition: background-color 0.15s;
`;

function CommentPost() {
  const { isShowTextField, toggleTextField } = useFieldText();

  const { postId } = useParams();
  const id = postId;

  //Find POST
  const post = forumData.posts.find((post) => post.id === id);

  if (!post) return <div>Post not found</div>;

  //Find comment
  const comments = forumData.comments.filter(
    (comment) => comment.postId === post.id
  );

  //Join table
  const postData = { ...post, postComments: comments };

  const handleVote = (postId, voteType) => {
    console.log("Post", postId, "voted:", voteType);
    // call API or update state
  };

  const handleShare = (postId) => {
    console.log("Share clicked for post", postId);
  };

  const handlePost = () => {
    console.log("posting...");
  };

  return (
    <>
      <PostCard
        postData={postData}
        variant="post"
        avatarSize="medium"
        onClickVote={(voteType) => handleVote(post.id, voteType)}
        onClickShare={() => handleShare(post.id)}
        onClickComment={() => toggleTextField(post.id)}
      ></PostCard>

      {isShowTextField === post.id ? (
        <TextFields onSend={handlePost} />
      ) : (
        <ShareYourThougt onClick={() => toggleTextField(post.id)}>
          Share Your Thought
        </ShareYourThougt>
      )}
    </>
  );
}

export default CommentPost;
