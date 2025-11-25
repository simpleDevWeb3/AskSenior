import { useState } from "react";
import styled from "styled-components";

function Input({ children, handleInput,initialValue = "" }) {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(initialValue);

  return (
    <InputContainer $isFocus={isFocus}>
      <StyledInput
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(e) => {
          setValue(e.target.value);
          handleInput(e);
        }}
      />
      <InputLabel $isFocus={isFocus} $isValue={value}>
        {children}
      </InputLabel>
    </InputContainer>
  );
}

export default Input;

const InputContainer = styled.div`
  position: relative; /* needed for absolute label */
  border: 1px solid
    ${({ $isFocus }) =>
      $isFocus ? "rgba(16, 110, 211, 0.867)" : "var(--hover-color)"};
  padding: 1rem 1.5rem;
  border-radius: 25px;
  transition: all 0.2s ease;
  cursor: text;
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    width: 70%;
  }
`;

const StyledInput = styled.input`
  width: 100%;

  background: inherit;
  border: none;
  height: 3rem;
  outline: none;
  font-size: 1.2rem;
  color: var(--text-primary);
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 1.5rem;
  top: ${({ $isFocus, $isValue }) =>
    $isFocus || $isValue ? "0.5rem" : "1.5rem"};
  font-size: ${({ $isFocus, $isValue }) =>
    $isFocus || $isValue ? "0.8rem" : "1.2rem"};
  color: var(--text-secondary);
  pointer-events: none;
  transform-origin: left top;
  transition: all 0.25s ease;
`;
