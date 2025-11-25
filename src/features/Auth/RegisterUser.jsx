import styled from "styled-components";
import Input from "../../components/Input";
import { useState } from "react";
import Error from "../../components/Error";
import { isDup, isValidFormat } from "../../helpers/formHelper";

function RegisterUser({ onChange, formData }) {
  const [errors, setErrors] = useState({});

  function handleEmailInput(email) {
    const formatValid = isValidFormat(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, email);
    const dupValid = isDup("Admin@gmail.com", email);

    // Update parent form data
    onChange("Email", email);
    onChange("EmailFormatValid", formatValid);
    onChange("EmailDuplicateValid", dupValid);

    // Update child UI errors
    setErrors((prev) => ({
      ...prev,
      email: formData.Email === "" ? "Required" : "",
      format: !formatValid
        ? "Please enter a valid email address (e.g., name@example.com)."
        : "",
      duplicate: dupValid ? "Email has been taken!" : "",
    }));
  }

  function handlePasswordInput(pass) {
    const password = pass.trim();
    const isValidFormPassword = isValidFormat(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      password
    );
    onChange("Password", password);
    onChange("isValidFormPass", isValidFormPassword);
    setErrors((prev) => ({
      ...prev,
      isValidFormPassword: !isValidFormPassword
        ? "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
        : "",
      password: password === "" ? "Required" : "",
    }));
  }

  return (
    <FormBody>
      <h2>Account</h2>
      <p style={{ fontSize: "0.8rem", opacity: "0.6" }}>
        Setup your account for authentication purpose
      </p>
      <br />
      <div>
        <Row>
          <Input handleInput={(e) => handleEmailInput(e.target.value)}>
            Email
          </Input>
          {errors.email && <Error msg={errors.email} />}
          {errors.format && <Error msg={errors.format} />}
          {errors.duplicate && <Error msg={errors.duplicate} />}
        </Row>

        <Row>
          <Input handleInput={(e) => handlePasswordInput(e.target.value)}>
            Password
          </Input>
          {errors.isValidFormPassword && (
            <Error msg={errors.isValidFormPassword} />
          )}
          {errors.password && <Error msg={errors.password} />}
        </Row>
      </div>
    </FormBody>
  );
}

const FormBody = styled.div`
  padding: 1rem;
  max-width: 40rem;
`;
const Row = styled.div`
  margin-bottom: 1rem;
`;

export default RegisterUser;
