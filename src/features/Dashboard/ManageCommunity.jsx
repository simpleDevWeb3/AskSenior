import styled from "styled-components";
import CommunityTable from "./Features/Community/CommunityTable";
import Modal from "../../components/Modal";
import BanCommunityForm from "./Features/Community/BanCommunityForm";

function ManageCommutiy() {
  return (
    <Container>
      <Modal id={"ban-community"}>
        <BanCommunityForm />
      </Modal>
      <CommunityTable />
    </Container>
  );
}

export default ManageCommutiy;
const Container = styled.div`
  gap: 0.5rem;
  flex-direction: column;
  width: 70%;
`;
