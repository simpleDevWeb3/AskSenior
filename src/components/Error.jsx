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
  color: #ffffff !important;
  text-align: center;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  background-color: #f76c6c;
  border-radius: 8px;
  margin-top: 1rem;
  padding: 0.5rem;
`;

export default Error;
