import styled from "styled-components";
import React, { useState, useEffect } from "react";
import ButtonIcon from "./ButtonIcon";
import Spinner from "./Spinner";
import { useTopic } from "../features/Auth/useTopic"; // Import the hook back

function SelectTopic({ selectedTopic, onCancel, onAdd, availableTopics = [] }) {
  // 1. Always call the hook, but we might not use the data if availableTopics is present
  const { topics: globalTopics, isLoading } = useTopic();

  // 2. Determine which mode we are in
  const isCommunityMode = availableTopics.length > 0;

  const [select, setSelect] = useState(selectedTopic);

  // Reset selection if the user opens the modal for a different context
  useEffect(() => {
    setSelect(selectedTopic);
  }, [selectedTopic]);

  return (
    <StyledPage>
      <HeaderTitle>
        {isCommunityMode ? "Community Topics" : "Select Topic"}
      </HeaderTitle>

      {/* CASE A: Loading Global Data */}
      {!isCommunityMode && isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {/* CASE B: Community Mode (Flat List from Props) */}
      {isCommunityMode && (
        <TopicsGrid>
          {availableTopics.map((topic) => (
            <Option key={topic.id}>
              <input
                type="radio"
                name="topic"
                id={String(topic.id)}
                value={topic.id}
                onChange={() => setSelect({ id: topic.id, label: topic.name })}
                checked={
                  String(select?.id || selectedTopic?.id) === String(topic.id)
                }
              />
              <ButtonIconStyled>{topic.name}</ButtonIconStyled>
            </Option>
          ))}
        </TopicsGrid>
      )}

      {/* CASE C: Global Mode (Hierarchical List from API) */}
      {!isCommunityMode && !isLoading && globalTopics && (
        <>
          {globalTopics.map((topic) => (
            <React.Fragment key={topic.id}>
              {/* Show Category Title */}
              <SectionTitle>{topic.name}</SectionTitle>

              <TopicsGrid>
                {/* Check if the topic has sub_topics (hierarchical) 
                   or if the topic itself is selectable 
                */}
                {topic.sub_topic && topic.sub_topic.length > 0 ? (
                  topic.sub_topic.map((sub) => (
                    <Option key={sub.id}>
                      <input
                        type="radio"
                        name="topic"
                        id={String(sub.id)}
                        value={sub.id}
                        onChange={() =>
                          setSelect({ id: sub.id, label: sub.name })
                        }
                        checked={
                          String(select?.id || selectedTopic?.id) ===
                          String(sub.id)
                        }
                      />
                      <ButtonIconStyled>{sub.name}</ButtonIconStyled>
                    </Option>
                  ))
                ) : (
                  // If no sub-topics, allow selecting the main topic
                  <Option key={topic.id}>
                    <input
                      type="radio"
                      name="topic"
                      id={String(topic.id)}
                      value={topic.id}
                      onChange={() =>
                        setSelect({ id: topic.id, label: topic.name })
                      }
                      checked={
                        String(select?.id || selectedTopic?.id) ===
                        String(topic.id)
                      }
                    />
                    <ButtonIconStyled>{topic.name}</ButtonIconStyled>
                  </Option>
                )}
              </TopicsGrid>
            </React.Fragment>
          ))}

          {globalTopics.length === 0 && (
            <MessageContainer>No topics found.</MessageContainer>
          )}
        </>
      )}

      <Spacer />

      <ActionContainer>
        <ButtonIcon
          style={{ backgroundColor: "rgb(174, 33, 43)", color: "white" }}
          action={() => {
            setSelect(null);
            onCancel();
          }}
        >
          Cancel
        </ButtonIcon>
        <ButtonIcon
          style={{ backgroundColor: "rgb(19, 87, 184)", color: "white" }}
          action={() => select && onAdd(select)}
          disabled={!select}
        >
          Add
        </ButtonIcon>
      </ActionContainer>
    </StyledPage>
  );
}

export default SelectTopic;

/* --- Styled Components --- */

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10rem;
  color: #666;
  gap: 1rem;
`;

const TopicsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-content: flex-start;
`;

const Spacer = styled.div`
  margin-bottom: 5rem;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  gap: 0.5rem;
  padding: 1rem;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  background-color: var(--background-color);
  z-index: 10;
  border-top: 1px solid var(--hover-color);
`;

const StyledPage = styled.div`
  padding-right: 1rem;
  color: var(--text-color) !important;
  min-width: 30rem;
  min-height: 20rem;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const HeaderTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  width: 100%; /* Ensure title takes full width in the flex container */
`;

const Option = styled.label`
  display: inline-block;
  cursor: pointer;

  input {
    display: none;
  }
`;

const ButtonIconStyled = styled.span`
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: var(--hover-color, #eee);
  transition: all 0.2s ease;
  font-weight: 500;
  border: 1px solid transparent;

  &:hover {
    filter: brightness(0.95);
  }

  input:checked + & {
    background-color: rgb(19, 87, 184);
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;
