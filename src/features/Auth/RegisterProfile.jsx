import styled from "styled-components";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Error from "../../components/Error";
import {  isValidFormat } from "../../helpers/formHelper";
import { useIsDupUsername } from "./useIsDupUsername";

function RegisterProfile({ name = "", description = "", onChange }) {
  const [error, setError] = useState({});
  const [usernameToValidate, setUsernameToValidate] = useState("");
  const { isDupUsername, isLoading } = useIsDupUsername(usernameToValidate);

  //validate from api so useEffect
  useEffect(() => {
    onChange?.("usernameDup", isDupUsername?.isDuplicate);

    setError((prev) => ({
      ...prev,
      usernameDup: isDupUsername?.isDuplicate ? "username has been taken" : "",
    }));
  }, [isDupUsername, onChange]);

  function handleUsername(username) {
    const usernameValidForm = isValidFormat(
      /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/,
      username
    );

    if (usernameValidForm) setUsernameToValidate(username);
    else {
      setUsernameToValidate("");
    }

    onChange?.("username", username);
    onChange?.("usernameValidForm", usernameValidForm);

    setError((prev) => ({
      ...prev,
      usernameValidForm: !usernameValidForm
        ? "Username must start with a letter, be between 3 and 16 characters long, and contain only letters, numbers, or underscores."
        : "",
    }));
  }

  function handleDescription(description) {
    onChange?.("userDescription", description);
  }
  return (
    <>
      <h2>Tell us about your self</h2>
      <p>A name & description help other student remember you</p>
      <br />
      <StyledContainer>
        <div style={{ width: "30rem" }}>
          <Input handleInput={(e) => handleUsername(e.target.value)}>
            Username
          </Input>
          {isLoading && (
            <span style={{ fontSize: "0.8rem", color: "gray" }}>
              Checking availability...
            </span>
          )}
          {error.usernameDup && <Error msg={error.usernameDup} />}

          {error.usernameValidForm && <Error msg={error.usernameValidForm} />}
          <br />
          <Input handleInput={(e) => handleDescription(e.target.value)}>
            Description
          </Input>
        </div>

        <ProfileCard>
          <h2>u/{name || "Username"}</h2>
          <br />
          <p>{description || "Your User Description"}</p>
        </ProfileCard>
      </StyledContainer>
    </>
  );
}

export default RegisterProfile;

const StyledContainer = styled.div`
  display: flex;

  gap: 0.5rem;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
  }
`;

const ProfileCard = styled.div`
  border: solid 1px var(--hover-color);
  border-radius: 25px;
  padding: 1rem;
  padding-bottom: 1.5rem;
  height: 100%;
  flex: 1;
  width: 18rem;
  margin-bottom: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
  box-shadow: 0px 5px 5px var(--hover-color);

  @media (max-width: 800px) {
    width: 100%;
  }
`;
