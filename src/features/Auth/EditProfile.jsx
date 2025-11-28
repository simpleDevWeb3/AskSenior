import styled from "styled-components";
import UserCard from "../../components/UserCard";
import ButtonIcon from "../../components/ButtonIcon";
import Input from "../../components/Input";

function EditProfile() {
  return (
    <Container>
      <h1>Edit Profile</h1>
      <UserCard />
      <Input>username</Input>
      <Input>description</Input>
      <BtnContainer>
        <ButtonIcon>Cancel</ButtonIcon>
        <ButtonIcon>Confirm</ButtonIcon>
      </BtnContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 30rem;
  color: var(--text-color);
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: end;
`;
export default EditProfile;
