import styled, { css } from "styled-components";

// ✅ Responsive size styles
const sizeStyles = {
  small: css`
    padding: 0.3rem 0.8rem;
    font-size: 0.8rem;

    @media (max-width: 600px) {
      padding: 0.25rem 0.6rem;
      font-size: 0.7rem;
    }

    @media (min-width: 1200px) {
      padding: 0.35rem 0.8rem;
      font-size: 0.85rem;
    }
  `,
  medium: css`
    padding: 0.6rem 1rem;
    font-size: 1rem;

    @media (max-width: 600px) {
      padding: 0.5rem 0.8rem;
      font-size: 0.9rem;
    }

    @media (min-width: 1200px) {
      padding: 0.7rem 1.1rem;
      font-size: 1.05rem;
    }
  `,
  large: css`
    padding: 0.9rem 1.2rem;
    font-size: 1.1rem;

    @media (max-width: 600px) {
      padding: 0.7rem 1rem;
      font-size: 1rem;
    }

    @media (min-width: 1200px) {
      padding: 1rem 1.3rem;
      font-size: 1.15rem;
    }
  `,
  rounded: css`
    padding: 0.6rem;
    font-size: 1.1rem;

    @media (max-width: 600px) {
      padding: 0.45rem;
      font-size: 1rem;
    }

    @media (min-width: 1200px) {
      padding: 0.7rem;
      font-size: 1.15rem;
    }
  `,
  rounded_small: css`
    padding: 0.3rem;
    font-size: 1rem;

    @media (max-width: 600px) {
      padding: 0.25rem;
      font-size: 0.9rem;
    }

    @media (min-width: 1200px) {
      padding: 0.4rem;
      font-size: 1.05rem;
    }
  `,
};

const variantStyles = {
  primary: css`
    background-color: var(--primary-color);
    color: #fff;
    border: none;

    &:hover {
      background-color: var(--primary-color-hover, #5a382a);
    }
  `,
  secondary: css`
    background-color: var(--secondary-color, #f5f5f5);
    color: var(--text-color, #333);
    border: 1px solid rgba(0, 0, 0, 0.2);

    &:hover {
      background-color: var(--secondary-hover, #e2e2e2);
    }
  `,
  outline: css`
    background: none;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);

    &:hover {
      background-color: var(--primary-color);
      color: #fff;
    }
  `,
  text: css`
    background: none;
    border: none;
    color: var(--primary-color);

    &:hover {
      background-color: var(--hover-regular);
    }
  `,
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: ${({ $margin }) => $margin || "0"};
  cursor: pointer;
  border-radius: ${({ $shape }) => ($shape === "circle" ? "50%" : "25px")};
  transition: all 0.15s ease;

  ${({ $size }) => sizeStyles[$size] || sizeStyles.medium}
  ${({ $variant }) => variantStyles[$variant] || variantStyles.primary};

  ${({ $active }) =>
    $active &&
    css`
      background-color: var(--primary-color);
      color: #fff;
      border: 2px solid var(--primary-color);

      /* Keep hover consistent */
      &:hover {
        background-color: var(--primary-color-hover, #5a382a);
        color: #fff;
      }
    `}

  /* Optional icon hover effect */
  &:hover svg {
    color: ${({ $hoverIcon }) =>
      $hoverIcon ? "var(--secondary-color)" : "inherit"};
  }

  span {
    font-weight: 700;
  }
`;

function ButtonIcon({
  icon,
  children,
  action,
  size = "medium",
  variant = "primary",
  shape,
  hoverIcon,
  margin,
  active,
}) {
  return (
    <StyledButton
      onClick={action}
      $size={size}
      $variant={variant}
      $shape={shape}
      $hoverIcon={hoverIcon}
      $margin={margin}
      $active={active}
    >
      {icon} {children}
    </StyledButton>
  );
}

export default ButtonIcon;
