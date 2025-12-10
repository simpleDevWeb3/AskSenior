import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinnerStyle = styled.div`
  background-color: "blue";
  width: 60px;
  height: 60px;
  border: 6px solid rgba(22, 31, 42, 0.733);
  border-top-color: #2567d9;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export default function Spinner() {
  return (
    <Overlay>
      <SpinnerStyle />
    </Overlay>
  );
}
