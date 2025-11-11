import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";

function Accordian({ children, title }) {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((open) => !open);
  }

  return (
    <>
      <BreakLine />
      <Section>
        <StyledHeader>
          <SectionTitle>{title}</SectionTitle>
          <ButtonIcon
            variant="text"
            size={"rounded"}
            shape={"circle"}
            action={toggle}
          >
            <FaAngleUp
              style={{
                transform: isOpen ? "rotate(0deg)" : "rotate(-180deg)",
                transition: "transform 0.15s ease",
              }}
            />
          </ButtonIcon>
        </StyledHeader>
        <List isOpen={isOpen}>{children}</List>
      </Section>
    </>
  );
}

export default Accordian;
const Section = styled.section`
  padding: 1rem 0.2rem;
`;
const BreakLine = styled.hr`
  border-bottom: 2px var(--tertiary-color);
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;
`;
const SectionTitle = styled.div`
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;

  text-transform: uppercase;
`;
const List = styled.ul`
  max-height: ${(props) => (props.isOpen ? "1000px" : "0")};
  overflow: hidden;
  transition: max-height 0.15s ease-in-out;
`;
