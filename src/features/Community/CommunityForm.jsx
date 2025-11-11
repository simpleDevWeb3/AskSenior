import styled from "styled-components";
import CommuntiyTopic from "./CommuntiyTopic";
import Carousel from "../../components/Carousel";
import { useSelector } from "../../components/Selector";
import { useEffect, useState } from "react";
import { useLocalStorageState } from "../../hook/useLocalStorageState";

console.log(Carousel);
function CommunityForm() {
  // Main topics with subtopics

  const { selectedItems: topicData } = useSelector();

  const accesibilityData = null;
  const communityData = null;


  return (
    <FormContainer>
      <Carousel total={3} hideWhenCurrentSlide={true}>
        <Carousel.Tracker />
        <br />
        <Carousel.Track>
          <Carousel.Card>
            <CommuntiyTopic />
          </Carousel.Card>
          <Carousel.Card>
            <h1>Second Page</h1>
          </Carousel.Card>
          <Carousel.Card>
            <h1>Third Page</h1>
          </Carousel.Card>
        </Carousel.Track>

        <Carousel.PrevBtn positionY="bottom" />
        <Carousel.NextBtn positionY="bottom" disabled={!topicData.length} />
      </Carousel>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  width: 800px;

  @media (max-width: 800px) {
    width: inherit;
  }
  overflow-y: scroll;
`;

export default CommunityForm;
