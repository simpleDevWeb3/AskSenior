import { useState } from "react";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { useSearchCommunity } from "../Communities/useSearchCommunity";
import ButtonIcon from "../../components/ButtonIcon";
import CommunityList from "../../components/CommunityList";
import NoResultSearch from "../../components/NoResultSearch";

function SearchCommunityResult({ query }) {
  const { community, isLoadCommunity, errorCommunity } =
    useSearchCommunity(query);

  if (isLoadCommunity)
    return (
      <CenterContainer>
        <Spinner />
      </CenterContainer>
    );

  if (errorCommunity)
    return <MessageContainer isError>Error: {errorCommunity}</MessageContainer>;

  if (!community || community?.length === 0 || !Array.isArray(community)) {
    return <NoResultSearch query={query} />;
  }

  return (
    <Container>
      <CommunityList communities={community} />
    </Container>
  );
}

export default SearchCommunityResult;

// --- Styled Components ---

const Container = styled.div`
  border-radius: 4px;
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 0;
`;

const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px;
`;

const MessageContainer = styled.div`
  padding: 40px;
  text-align: center;
  color: ${(props) => (props.isError ? "red" : "#7c7c7c")};

  h3 {
    margin-bottom: 8px;
    font-size: 18px;
    color: #1c1c1c;
  }
`;
