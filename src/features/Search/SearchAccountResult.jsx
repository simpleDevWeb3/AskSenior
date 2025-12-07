import styled from "styled-components";
import Spinner from "../../components/Spinner";

import ButtonIcon from "../../components/ButtonIcon";
import CommunityList from "../../components/CommunityList";
import NoResultSearch from "../../components/NoResultSearch";
import { useSearchUser } from "../Users/useSearchUser";
import UserList from "../../components/UserList";

function SearchAccountResult({ query }) {
  const { users, isLoadUsers, errorUsers } = useSearchUser(query);

  if (isLoadUsers)
    return (
      <CenterContainer>
        <Spinner />
      </CenterContainer>
    );

  if (errorUsers)
    return (
      <MessageContainer isError>
        Error: {errorUsers?.message || String(errorUsers)}
      </MessageContainer>
    );

  if (!users || users?.length === 0 || !Array.isArray(users)) {
    return <NoResultSearch query={query} />;
  }

  return (
    <Container>
      <UserList users={users} />
    </Container>
  );
}

export default SearchAccountResult;

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
