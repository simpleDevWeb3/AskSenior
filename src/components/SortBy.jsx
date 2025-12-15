import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  // Get current value to control the select input
  const sortBy = searchParams.get("sortBy") || "";

  function handleSelect(e) {
    // 1. Set the new key in the existing params object
    searchParams.set("sortBy", e.target.value);

    // 2. Update the URL (this keeps your other filters like 'type' alive)
    setSearchParams(searchParams);
  }
  if (options)
    return (
      <StyledSelect onChange={handleSelect} value={sortBy}>
        {options.map((opt) => (
          <option value={opt.value}>{opt.label}</option>
        ))}
      </StyledSelect>
    );
}

export default SortBy;
const StyledSelect = styled.select`
  color: var(--text-color);
  background-color: var(--background-glass);
  padding: 0.6rem 1.2rem;

  border-radius: 8px;
  border: solid 1px var(--background-color);
  font-weight: 500;

  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--color-grey-300, #ccc);
  }
`;
