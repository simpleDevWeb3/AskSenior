import styled from "styled-components";
import Input from "../../components/Input";
import { useUser } from "../Auth/useUser";

function ProfileSetting() {
  const { user } = useUser();
  return (
    <StyledContainer>
      <Input initialValue={user.name}>username</Input>
      <Input initialValue={user.bio}>description</Input>
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
export default ProfileSetting;
