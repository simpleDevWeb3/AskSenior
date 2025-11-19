import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import PostList from "../features/Post/PostList";
import forumData from "../data/post";
import { useSearchParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import Filter from "../components/Filter";
import { useScrollRestore } from "../hook/useScrollRestore";

function SearchPage() {
  useScrollRestore();
  const { isSidebarOpen } = useSidebar();
  const { posts } = forumData;
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const options = [
    { key: "POST", label: "Post" },
    { key: "COMMUNITY", label: "Community" },
    { key: "ACCOUNT", label: "Account" },
  ];
  return (
    <SearchList $isSidebarOpen={isSidebarOpen}>
      <OperationRow>
        <Filter
          filterField="type"
          options={options}
          startingOption={"POST"}
          variant={"tabs"}
        />
      </OperationRow>
      <br />
      <Wrapper>
        <PostList postData={posts} />
      </Wrapper>
    </SearchList>
  );
}

export default SearchPage;
const SearchList = styled.ul`
  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? `translateX(17rem)` : `translate(10rem)`};

  @media (max-width: 1000px) {
    padding-top: 1rem;
    transform: none;
  }

  @media (max-width: 800px) {
    padding-top: 4rem;
  }

  transition: transform 0.4s ease;
`;
const Wrapper = styled.div`
  max-width: 800px;
`;

const OperationRow = styled.div`
  margin: 1rem;
  margin-bottom: 0rem;
`;
