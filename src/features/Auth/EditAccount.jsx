import styled from "styled-components";
import Input from "../../components/Input";
import ButtonIcon from "../../components/ButtonIcon";

function EditAccount() {
  return (
    <Container>
      <h1>Edit Account</h1>
      <br />
      <Input>new email</Input>
      <br />
      <Input>new password</Input>
      <br />
      <Input>confirm password</Input>
      <ActionContainer>
        <ButtonIcon>Cancel</ButtonIcon>
        <ButtonIcon>Confirm</ButtonIcon>
      </ActionContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 30rem;
  color: var(--text-color);
`;

const ActionContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: end;
  gap: 0.5rem;
`;

export default EditAccount;
