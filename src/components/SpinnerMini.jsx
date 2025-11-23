import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6); /* dark overlay */
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 6px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.9s linear infinite;
`;

export default function SpinnerMini() {
  return <Spinner />;
}
