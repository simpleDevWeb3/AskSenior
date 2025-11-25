
import styled from "styled-components";

function Error({ msg, icon }) {
  return (
    <StyledError>
      {icon}
      {msg}
    </StyledError>
  );
}

const StyledError = styled.p`
  color: #ffffff;
  text-align: center;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  background-color: #9f3333;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 0.5rem;
`;

export default Error;
