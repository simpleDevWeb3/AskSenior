import styled from "styled-components";
import PostTable from "./Features/Posts/PostTable";
import Modal from "../../components/Modal";
import BanPostForm from "./Features/Posts/BanPostForm";

function ManagePost() {
  return (
    <Container>
      <Modal id={"ban-post"}>
        <BanPostForm />
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
