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
  max-width: 1000px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
export default ManagePost;
