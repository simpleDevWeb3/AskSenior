import styled from "styled-components";
import forumData from "../../data/post";

import UserTable from "./Features/Users/UserTable";
import Modal from "../../components/Modal";
import BanUserForm from "./Features/Users/BanUserForm";

function ManageUser() {
  const { users } = forumData;
  console.log(users);
  return (
    <Container>
      <Modal id={"ban-user"}>
        <BanUserForm />
      </Modal>
      <br />
      <UserTable />
    </Container>
  );
}

export default ManageUser;
const Container = styled.div`
  max-width: 1000px;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;
