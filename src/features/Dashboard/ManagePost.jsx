import styled from "styled-components";
import PostTable from "./Features/Posts/PostTable";
import Modal from "../../components/Modal";
import BanPostForm from "./Features/Posts/BanPostForm";
import PostInsight from "./Features/Posts/PostInsight";

function ManagePost() {
  return (
    <Container>
      <Modal id={"ban-post"}>
        <BanPostForm />
      </Modal>
      <Modal id={"post-insight"}>
        <PostInsight />
      </Modal>
      <PostTable />
    </Container>
  );
}
const Container = styled.div`
  width: 70%;

  gap: 0.5rem;
`;
export default ManagePost;
