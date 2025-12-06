import styled from "styled-components";
import { HiOutlineSearch } from "react-icons/hi";
import { Dropdown, useDropdown } from "./Dropdown";
import { useState } from "react";
import Avatar from "./Avatar";

const StyledSearchBar = styled.form`
  background-color: var(--tertiary-color);
  border-radius: 25px;
  border: 1px solid #ccc;
  padding: 0.2rem 1rem;
  max-height: 2.8rem;

  width: 100%;
  text-align: center;
  margin-right: 1rem;
  position: relative;

  @media (max-width: 1300px) {
    flex: 1;
  }

  &:active {
    outline: blue 1px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  outline: none;
  width: 100%;
  color: var(--primary-color);

  &::placeholder {
  }
`;

const SearchIcon = styled(HiOutlineSearch)`
  font-size: 1rem;
  color: var(--primary-color);
`;

const Layout = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

function Search({ onSearch, onInput, useSearch, placeholder, initialData }) {
  const [query, setQuery] = useState("");
  const { close } = useDropdown();
  useSearch?.();
  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch?.(query);
    close();
  }

  function handleInput(e) {
    const { value } = e.target;

    setQuery(value);
    onInput?.();
  }
  return (
    <StyledSearchBar onSubmit={(e) => handleSearch(e)}>
      <Dropdown.Trigger>
        <Layout>
          <SearchIcon />
          <StyledInput
            type="text"
            placeholder={placeholder}
            onChange={(e) => handleInput(e)}
            value={query}
          />
        </Layout>
      </Dropdown.Trigger>

      {
        /* Dropdown suggestion list */
        initialData && (
          <Dropdown.List>
            {initialData.map((data) => (
              <Dropdown.Item>
                <div
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    overflow: "hidden",
                  }}
                >
                  <Avatar src={data.avatar_url} />
                </div>
                {data.name}
              </Dropdown.Item>
            ))}
          </Dropdown.List>
        )
      }
    </StyledSearchBar>
  );
}

export default Search;
