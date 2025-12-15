import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Tabs({ links, basePath }) {
  const location = useLocation();
  const navigate = useNavigate();
  const indexLink = links.find((link) => link.index) || links;

  // 1.Get the last part of the path after basePath
  const pathAfterBase =
    location.pathname === basePath
      ? "" // no tab in URL
      : location.pathname.replace(`${basePath}/`, "");

  const activeValue = pathAfterBase || indexLink.key;
  console.log(activeValue);

  //1.append params

  return (
    <TabContainer>
      {links.map((link) => (
        <Tab
          key={link.key}
          $active={link.key === activeValue}
          onClick={() => navigate(`${basePath}/${link.key}`)}
        >
          {link.label}
        </Tab>
      ))}
    </TabContainer>
  );
}

export default Tabs;

const TabContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Tab = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 25px;

  background-color: ${(props) =>
    props.$active ? "var(--tertiary-color)" : ""};
  font-weight: 600;
  color: var(--text-color);
  cursor: pointer;

  transition: background-color 0.2s;
  &:hover {
    background-color: var(--hover-color);
  }
`;
