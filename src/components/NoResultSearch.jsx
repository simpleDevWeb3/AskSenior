import styled from "styled-components";

function NoResultSearch({ query }) {
  return (
    <MessageContainer>
      <h3>No results for "{query}"</h3>
      <p>Try checking your spelling or search for a different topic.</p>
    </MessageContainer>
  );
}

export default NoResultSearch;
const MessageContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: var(--text-color);

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
  }
`;
