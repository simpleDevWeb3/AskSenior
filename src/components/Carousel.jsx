import { createContext, useContext, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styled, { css } from "styled-components";
import { VscNoNewline } from "react-icons/vsc";

/* eslint-disable react-refresh/only-export-components */
const CarouselContext = createContext();

function Carousel({ children, total, hideWhenCurrentSlide = false }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));
  const restoreSlide = () => setIndex(0);

  return (
    <CarouselContext.Provider
      value={{ next, prev, index, total, hideWhenCurrentSlide, restoreSlide }}
    >
      <Container>{children}</Container>
    </CarouselContext.Provider>
  );
}

function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (ctx === undefined)
    throw new Error("useCarousel is used outside the Carousel");
  return ctx;
}

function Track({ children }) {
  const { index } = useCarousel();
  return <Section $index={index}>{children}</Section>;
}

function NextBtn({ positionX = "right", positionY = "center", disabled }) {
  const { next, index, total, hideWhenCurrentSlide } = useCarousel();
  if (hideWhenCurrentSlide && index + 1 === total) return;
  return (
    <BtnContainer positionX={positionX} positionY={positionY}>
      <ButtonIcon
        disabled={disabled}
        action={() => next()}
        variant="text"
        size="rounded"
        icon={
          <HiArrowRight
            style={
              disabled ? { opacity: 0.2, pointerEvents: VscNoNewline } : {}
            }
          />
        }
      ></ButtonIcon>
    </BtnContainer>
  );
}

function PrevBtn({ positionX = "left", positionY = "center" }) {
  const { prev, index, hideWhenCurrentSlide } = useCarousel();
  if (hideWhenCurrentSlide && index === 0) return;
  return (
    <BtnContainer positionX={positionX} positionY={positionY}>
      <ButtonIcon
        action={() => prev()}
        size="rounded"
        variant="text"
        icon={<HiArrowLeft />}
      ></ButtonIcon>
    </BtnContainer>
  );
}

function Card({ children }) {
  return <CardContainer>{children}</CardContainer>;
}

function Tracker() {
  const { index, total } = useCarousel();
  return (
    <TrackerContainer>
      <TrackerContainer>
        {Array.from({ length: total }).map((_, i) => (
          <StepBar key={i} $active={i <= index} />
        ))}
      </TrackerContainer>
    </TrackerContainer>
  );
}

export default Carousel;
const positionX = {
  left: css`
    left: 0;
  `,

  right: css`
    right: 0;
  `,
};

const positionY = {
  center: css`
    top: 50%;
  `,

  top: css`
    top: 0%;
  `,

  bottom: css`
    bottom: 0%;
  `,
};

const Container = styled.div`
  & * {
    color: var(--text-color);
  }
  position: relative;
`;
const Section = styled.div`
  //overflow: hidden;
  width: 100%;
  display: flex;
  transform: ${({ $index }) => `translateX(-${$index * 100}%)`};
  transition: transform 0.5s ease;
`;

const BtnContainer = styled.div`
  position: absolute;
  ${(props) => positionX[props.positionX]}
  ${(props) => positionY[props.positionY]}
`;
const CardContainer = styled.div`
  min-width: 100%;
  flex-shrink: 0;
`;

const TrackerContainer = styled.div`
  display: flex;
  gap: 4px;
  width: 100%;
  margin-top: 8px;
`;
const StepBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${({ $active }) =>
    $active ? "rgb(17, 127, 195)" : "var(--hover-color)"};
  border-radius: 2px;
  transition: background-color 0.3s ease;
`;
Carousel.Track = Track;
Carousel.Card = Card;
Carousel.NextBtn = NextBtn;
Carousel.PrevBtn = PrevBtn;
Carousel.Tracker = Tracker;
