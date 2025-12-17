import styled from "styled-components";
import CommunityTable from "./Features/Community/CommunityTable";
import Modal from "../../components/Modal";
import BanCommunityForm from "./Features/Community/BanCommunityForm";
import CommunityInsight from "./Features/Community/CommunityInsight";

function ManageCommutiy() {
  return (
    <Container>
      <Modal id={"ban-community"}>
        <BanCommunityForm />
      </Modal>

      <Modal id={"community-insight"} background={false}>
        <CommunityInsight />
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
