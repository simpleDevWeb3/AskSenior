import styled from "styled-components";
import Input from "../../components/Input";
import ButtonIcon from "../../components/ButtonIcon";
import { useState } from "react";
import { isValidFormat } from "../../helpers/formHelper";
import Error from "../../components/Error";
import { useEditAccount } from "../Settings/useEditAccount";
import { useUser } from "./useUser";
import SpinnerMini from "../../components/SpinnerMini";
import { useModal } from "../../context/ModalContext";

function EditAccount() {
  const { closeModal } = useModal();
  const { editAccount, isLoadEditAccount, errorEditAccount } =
    useEditAccount(closeModal);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const { user } = useUser();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(error);
    if (error?.isValidFormPassword || error?.errorConfirm) return;
    console.log("password: ", password);
    console.log("confirm password: ", password);
    editAccount(
      {
        user_id: user?.id,
        formData: { Password: password },
      },
      {
        onSuccess: () => {
          setPassword("");
          setConfirmPassword("");
        },
      }
    );
  }

  function handleConfirmPassword(value) {
    const input = value.trim();
    setError((prevError) => ({
      ...prevError,

      errorConfirm: input !== password ? "Password does not match!" : "",
    }));

    setConfirmPassword(input);
  }

  function handlePassword(value) {
    const password = value.trim();
    const isValidFormPassword = isValidFormat(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      password
    );

    setError((prevError) => ({
      ...prevError,

      isValidFormPassword: !isValidFormPassword
        ? "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
        : "",
    }));

    setPassword(value);
  }
  return (
    <Container onSubmit={handleSubmit}>
      <h1>Edit Account</h1>
      <br />

      <Input
        initialValue={password}
        handleInput={(e) => handlePassword(e.target.value)}
      >
        new password
      </Input>
      {error?.isValidFormPassword && <Error msg={error?.isValidFormPassword} />}
      <br />
      <Input
        handleInput={(e) => handleConfirmPassword(e.target.value)}
        initialValue={confirmPassword}
      >
        confirm password
      </Input>
      {error?.errorConfirm && <Error msg={error?.errorConfirm} />}
      <ActionContainer>
        <ButtonIcon disabled={isLoadEditAccount} type="button">
          Cancel
        </ButtonIcon>
        <ButtonIcon disabled={isLoadEditAccount}>
          {isLoadEditAccount ? <SpinnerMini /> : "Confirm"}
        </ButtonIcon>
      </ActionContainer>
    </Container>
  );
}

const Container = styled.form`
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
