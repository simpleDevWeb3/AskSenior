import styled from "styled-components";
import { HiOutlineLightBulb } from "react-icons/hi2";
import { useDarkTheme } from "../context/DarkThemeContext";

function Logo() {
  const { isDarkMode } = useDarkTheme();
  return (
    <StyledLogo
      style={{
        color: isDarkMode ? "#fffbe0" : "var(--text-color)",
      }}
    >
      <HiOutlineLightBulb
        style={{
          color: isDarkMode ? "#fff57f" : "#ffb400",
          filter: isDarkMode
            ? "drop-shadow(0 0 10px #fff9a9) drop-shadow(0 0 20px #fff3a0)"
            : "none",
          transition: "color 0.3s ease, filter 0.3s ease",
        }}
      />
      AskSenior
    </StyledLogo>
  );
}

const StyledLogo = styled.h3`
  display: flex;
  align-items: center;
  gap: 1px;
  font-weight: 600;
  transition: color 0.3s ease;

  @media (max-width: 368px) {
    display: none;
  }
`;

export default Logo;
