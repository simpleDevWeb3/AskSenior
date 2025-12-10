import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";

function ConfirmDelete({
  resourceName = "post", // e.g., "post", "comment", "image"
  onConfirm,
  onClose,
  disabled,
}) {
  return (
    <StyledConfirm>
      <Heading>Delete {resourceName}</Heading>
      <Message>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </Message>

      <ButtonContainer>
        <Button $variation="secondary" disabled={disabled} onClick={onClose}>
          Cancel
        </Button>

        <Button $variation="danger" disabled={disabled} onClick={onConfirm}>
          {disabled ? <SpinnerMini /> : "Delete"}
        </Button>
      </ButtonContainer>
    </StyledConfirm>
  );
}

export default ConfirmDelete;

/* ---------- Styled Components ---------- */

const StyledConfirm = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1rem;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const Heading = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
`;

const Message = styled.p`
  color: var(--text-color-secondary, #888);
  margin-bottom: 1.2rem;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Secondary / Cancel Button Style */
  ${(props) =>
    props.$variation === "secondary" &&
    `
    background-color: transparent;
    border: 1px solid var(--tertiary-color, #ccc);
    color: var(--text-color);
    
    &:hover:not(:disabled) {
      background-color: var(--hover-color, #f0f0f0);
    }
  `}

  /* Danger / Delete Button Style */
  ${(props) =>
    props.$variation === "danger" &&
    `
    background-color: #d32f2f;
    color: white;

    &:hover:not(:disabled) {
      background-color: #b71c1c;
    }
  `}
`;
