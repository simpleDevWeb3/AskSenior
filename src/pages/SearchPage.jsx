import styled from "styled-components";
import useSidebar from "../hook/useSidebar";
import PostList from "../features/Post/PostList";
import forumData from "../data/post";
import { Outlet, useSearchParams } from "react-router-dom";
import Tabs from "../components/Tabs";
import Filter from "../components/Filter";
import { useScrollRestore } from "../hook/useScrollRestore";
import SearchPostResult from "../features/Search/SearchPostResult";
import SearchCommunityResult from "../features/Search/SearchCommunityResult";
import SearchAccountResult from "../features/Search/SearchAccountResult";
function SearchPage() {
  useScrollRestore();
  const { $isSidebarOpen } = useSidebar(); // FIX: do not destructure with $

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "POST";

  const options = [
    { key: "POST", label: "Post" },
    { key: "COMMUNITY", label: "Community" },
    { key: "ACCOUNT", label: "Account" },
  ];

  return (
    <SearchList $isSidebarOpen={$isSidebarOpen}>
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
        {type === "POST" && <SearchPostResult query={query} />}
        {type === "COMMUNITY" && <SearchCommunityResult query={query} />}
        {type === "ACCOUNT" && <SearchAccountResult query={query} />}
      </Wrapper>
    </SearchList>
  );
}

export default SearchPage;
const SearchList = styled.ul`
  transform: ${({ $isSidebarOpen }) =>
    $isSidebarOpen ? `translateX(25rem)` : `translate(10rem)`};

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
