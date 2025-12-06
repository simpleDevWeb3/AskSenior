import styled from "styled-components";

function NoExist({ name }) {
  return (
    <MessageContainer>
      <h3>{name} does's not exist</h3>
      <p>Try to create new {name}.</p>
    </MessageContainer>
  );
}

export default NoExist;
const MessageContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: var(--text-color);

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
  }
`;
