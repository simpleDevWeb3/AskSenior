import styled from "styled-components";
import CommuntiyTopic from "./CommuntiyTopic";
import CommunityIntro from "./CommunityIntro";
import Carousel from "../../components/Carousel";
import { useSelector } from "../../components/Selector";
import { useState } from "react";
import CommunityStyling from "./CommunityStyling";
import ButtonIcon from "../../components/ButtonIcon";

function CommunityForm() {
  const { selectedItems: topicData } = useSelector();

  // Centralized form data
  const [formData, setFormData] = useState({
    communityName: "",
    communityDescription: "",
  });

  // Track current carousel slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Update form data
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Validation for each page
  const canMoveNext = (index) => {
    if (index === 0) return topicData.length > 0;
    if (index === 1) return formData.communityName.trim() !== "";
    return true; // Page 3
  };

  const isNextDisabled = () => !canMoveNext(currentSlide);

  return (
    <FormContainer>
      <Carousel
        total={3}
        hideWhenCurrentSlide={true}
        onSlideChange={(index) => setCurrentSlide(index)}
        canMoveNext={canMoveNext}
      >
        <Carousel.Tracker />
        <br />
        <Carousel.Track>
          {/* Page 1 - Topics */}
          <Carousel.Card>
            <CommuntiyTopic
              selectedTopics={topicData}
              onChange={(data) => handleChange("topics", data)}
            />
          </Carousel.Card>

          {/* Page 2 - Community Intro */}
          <Carousel.Card>
            <CommunityIntro
              name={formData.communityName}
              description={formData.communityDescription}
              onChange={handleChange}
            />
          </Carousel.Card>

          {/* Page 3 - Summary or final step */}
          <Carousel.Card>
            <CommunityStyling topicData={topicData} formData={formData} />
          </Carousel.Card>
        </Carousel.Track>

        {/* Navigation Buttons */}
        <Carousel.PrevBtn positionY="bottom" disabled={currentSlide === 0} />
        <Carousel.NextBtn positionY="bottom" disabled={isNextDisabled()} />
        {currentSlide === 2 && (
          <CreateContainer>
            <ButtonIcon>Create</ButtonIcon>
          </CreateContainer>
        )}
      </Carousel>
    </FormContainer>
  );
}

const CreateContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 1.5rem;
`;

const FormContainer = styled.div`
  width: 800px;

  @media (max-width: 800px) {
    width: inherit;
  }
  overflow-y: hidden; /* prevent scrolling between cards */
`;

export default CommunityForm;
