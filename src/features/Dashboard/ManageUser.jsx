import styled from "styled-components";
import forumData from "../../data/post";

import UserTable from "./Features/Users/UserTable";
import Modal from "../../components/Modal";
import BanUserForm from "./Features/Users/BanUserForm";
import UserInsight from "./Features/Users/UserInsight";

function ManageUser() {
  const { users } = forumData;
  console.log(users);
  return (
    <Container>
      <Modal id={"ban-user"}>
        <BanUserForm />
      </Modal>
      <Modal id={"user-insight"} background={false}>
        <UserInsight />
      </Modal>
      <br />
      <UserTable />
    </Container>
  );
}

export default ManageUser;
const Container = styled.div`
  width: 70%;

  gap: 0.5rem;
`;
