import React, { useState, useRef, useLayoutEffect } from "react"; // 1. Import these
import styled, { css } from "styled-components";
import { useModal } from "../../context/ModalContext";
import { useEditComment } from "./useEditComment";
import SpinnerMini from "../../components/SpinnerMini";

// --- Styled Components Definitions ---

const FormContainer = styled.div`
  color: var(--text-color);
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  padding: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const Header = styled.h2`
  color: var(--text-color);
  margin: 0 0 20px 0;
  font-size: 1.25rem;
  font-weight: 700;
`;

const UserInfoSection = styled.div`
  color: var(--text-color);
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-color);
`;

const ReplyingTo = styled.span`
  font-size: 0.8rem;
  color: #868e96;

  strong {
    color: #228be6;
    font-weight: 500;
  }
`;

const StyledTextArea = styled.textarea`
  min-width: 20rem;
  /* We control height via JS, but set min/max for safety */
  min-height: 100px;
  max-height: 400px; /* It will scroll if it gets larger than this */

  padding: 12px;
  border-radius: 8px;
  border: 1px solid var(--hover-color);

  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-color);

  /* CRITICAL FOR AUTO-GROW: */
  resize: none;
  overflow-y: hidden; /* Hides scrollbar until max-height is reached */
  /* If content exceeds max-height, we can change this to 'auto' via JS or CSS */

  outline: none;
  transition: border-color 0.2s ease-in-out;
  font-family: inherit;
  background-color: inherit;
  box-sizing: border-box; /* Ensure padding doesn't mess up height calc */

  &:focus {
    border-color: #228be6;
    box-shadow: 0 0 0 3px rgba(34, 139, 230, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) =>
    props.variant === "primary"
      ? css`
          background-color: #228be6;
          color: white;
          &:hover:not(:disabled) {
            background-color: #1c7ed6;
          }
        `
      : css`
          background-color: transparent;
          color: #495057;
          &:hover:not(:disabled) {
            background-color: #f1f3f5;
            color: #212529;
          }
        `}
`;

function EditCommentForm() {
  const { modalData, closeModal } = useModal();

  // 1. Create a reference to the DOM element
  const textareaRef = useRef(null);

  // Initialize state with existing content
  const [content, setContent] = useState(modalData?.content || "");

  const { editComment, isLoadEditComment } = useEditComment(
    modalData?.post_id,
    modalData?.user_id,
    closeModal
  );

  // 2. The Auto-Grow Logic
  useLayoutEffect(() => {
    if (textareaRef.current) {
      // First, reset height to 'inherit' (or 'auto') to allow it to shrink
      // if the user deletes text.
      textareaRef.current.style.height = "inherit";

      // Then set the height to the scrollHeight (the height of the text content)
      // Math.max ensures it never shrinks below 100px
      const newHeight = Math.max(textareaRef.current.scrollHeight, 100);
      textareaRef.current.style.height = `${newHeight}px`;

      //  If it hits max-height (400px), show scrollbar
      if (newHeight > 400) {
        textareaRef.current.style.overflowY = "auto";
      } else {
        textareaRef.current.style.overflowY = "hidden";
      }
    }
  }, [content]); // Run this every time 'content' changes

  // Guard clause if data is missing
  if (!modalData) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    editComment({
      commentId: modalData.comment_id,
      commentData: {
        content,
        user_id: modalData.user_id,
        parent_id: modalData.parent_id,
        comment_id: modalData.comment_id,
      },
    });
  };

  return (
    <FormContainer>
      <UserInfoSection>
        <Avatar src={modalData.avatar_url} alt={modalData.user_name} />
        <UserMeta>
          <UserName>{modalData.user_name}</UserName>
          {modalData.reply_to_username && (
            <ReplyingTo>
              Replying to <strong>@{modalData.reply_to_username}</strong>
            </ReplyingTo>
          )}
        </UserMeta>
      </UserInfoSection>

      <form onSubmit={handleSubmit}>
        <StyledTextArea
          ref={textareaRef} // 3. Attach the ref here!
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Update your thought..."
          autoFocus
          disabled={isLoadEditComment}
        />

        <ButtonGroup>
          <Button
            type="button"
            onClick={closeModal}
            disabled={isLoadEditComment}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="primary"
            disabled={isLoadEditComment || content === modalData.content}
          >
            {isLoadEditComment ? <SpinnerMini /> : "Save Changes"}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}

export default EditCommentForm;
