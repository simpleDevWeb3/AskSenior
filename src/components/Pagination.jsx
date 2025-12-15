import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGE_SIZE } from "../constant/FILE_CONFIG";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1rem;
    width: 1rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--hover-color);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  const offset = (currentPage - 1) * PAGE_SIZE;
  const lastItemCount = Math.min(currentPage * PAGE_SIZE, count);

  function setPage(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  function nextPage() {
    return currentPage === pageCount ? "" : setPage(currentPage + 1);
  }

  function prevPage() {
    return currentPage === 1 ? "" : setPage(currentPage - 1);
  }
  return (
    <StyledPagination>
      <p>
        showing <span>{offset + 1}</span> <span>to</span>{" "}
        <span>{lastItemCount}</span>
        <span> of </span>
        <span>{count} results</span>
      </p>
      <Buttons>
        {currentPage !== 1 && (
          <PaginationButton disabled={currentPage === 1} onClick={prevPage}>
            <HiChevronLeft />
            <span>Previous</span>
          </PaginationButton>
        )}
        {currentPage !== pageCount && (
          <PaginationButton
            disabled={currentPage === pageCount}
            onClick={nextPage}
          >
            <span>Next</span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
