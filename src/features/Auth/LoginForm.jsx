import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // make sure react-router-dom is installed

function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    if (onLogin) onLogin(formData);
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Login</Title>

      {error && <ErrorMsg>{error}</ErrorMsg>}

      <FormGroup>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="password">Password</Label>
        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <ShowButton
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Hide" : "Show"}
          </ShowButton>
        </PasswordWrapper>
      </FormGroup>

      <LoginButton type="submit">Login</LoginButton>

      <SignupPrompt>
        Don’t have an account? <StyledLink to="/signup">Sign up</StyledLink>
      </SignupPrompt>
    </FormContainer>
  );
}

export default LoginForm;

/* ---------- Styled Components ---------- */

const FormContainer = styled.form`


  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: var(--text-color, #333);
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    border-color: var(--primary-color, #6f4e37);
    outline: none;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ShowButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: var(--primary-color, #6f4e37);
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginButton = styled.button`
  background-color: var(--primary-color, #6f4e37);
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: var(--secondary-color, #c8a165);
  }
`;

const ErrorMsg = styled.div`
  background: #ffe5e5;
  color: #b30000;
  padding: 0.6rem;
  border-radius: 5px;
  text-align: center;
  font-size: 0.9rem;
`;

const SignupPrompt = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #555;
`;

const StyledLink = styled(Link)`
  color: var(--primary-color, #6f4e37);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
