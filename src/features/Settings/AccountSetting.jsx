import styled from "styled-components";
import Input from "../../components/Input";
import { useUser } from "../Auth/useUser";

function AccountSetting() {
  const { user } = useUser();
  return (
    <StyledContainer>
      <Input>email</Input>

      <Input>new password</Input>
      <Input>password</Input>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  margin-top: 1rem;
  max-width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export default AccountSetting;
