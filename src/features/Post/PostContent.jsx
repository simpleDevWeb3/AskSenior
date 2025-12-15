import styled from "styled-components";
import { variantSize } from "../../styles/VariantSize";
import Text from "../../components/Text";
import { usePost } from "./PostContext";
import Carousel from "../../components/Carousel";

function PostContent() {
  const { postData, variant } = usePost();
  const { title, text, postImage_url, content } = postData;

  const imageEntries = postImage_url ? Object.entries(postImage_url) : [];

  return (
    <TextWrapper $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{text ?? content}</Text>

      {/* 1. Single Image Logic */}
      {imageEntries.length === 1 && (
        <ImageContainer>
          {/* Apply a blurred background effect or solid color */}
          <ImageBackground>
            <Image src={imageEntries[0][1]} alt={title || "Post image"} />
          </ImageBackground>
        </ImageContainer>
      )}

      {/* 2. Carousel Logic */}
      {imageEntries.length > 1 && (
        <Carousel
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%", // Ensure carousel takes full width
          }}
          hideWhenCurrentSlide={true}
          total={imageEntries.length}
        >
          <Carousel.Count />
          <Carousel.Track>
            {imageEntries.map(([key, url]) => (
              <Carousel.Card
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // Remove backgroundSize cover here, handled by internal Image
                  width: "100%",
                }}
              >
                <ImageContainer>
                  <ImageBackground>
                    <Image src={url} alt={title || "Post image"} />
                  </ImageBackground>
                </ImageContainer>
              </Carousel.Card>
            ))}
          </Carousel.Track>

          <Carousel.PrevBtn
            style={{
              backgroundColor: "var(--background-glass)",
              borderRadius: "50%",
            }}
            positionY="center"
          />
          <Carousel.NextBtn
            style={{
              backgroundColor: "var(--background-glass)",
              borderRadius: "50%",
            }}
            positionY="center"
          />
          <Carousel.Tracker type={"img"} />
        </Carousel>
      )}
      <br />
    </TextWrapper>
  );
}

export default PostContent;

// --- STYLED COMPONENTS ---

const TextWrapper = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  gap: 0.5rem;
  ${({ $variant }) => variantSize[$variant] || ""}
  overflow-wrap: break-word;
  word-break: break-word;
  width: 100%; /* Ensure wrapper fills space */
`;

// 1. The Container defines the "Frame"
const ImageContainer = styled.div`
  margin-top: 0.75rem;
  width: 100%;
  max-width: 100%;
  border-radius: 16px;
  overflow: hidden;

  /* Reddit-style consistency: */
  height: 512px; /* Fixed height for consistency */
  /* Alternatively use max-height: 512px; if you want small images to stay small */

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(
    --hover-color,
    #1a1a1b
  ); /* Dark background for empty space */
`;

// 2. Optional: Helper to center image perfectly
const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px); /* Optional: Cool blur effect */
`;

// 3. The Image itself fits INSIDE the frame
const Image = styled.img`
  /* Logic: Fill the container, but don't cut off content */
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;

  /* KEY PROPERTY: contain ensures the whole image is seen */
  object-fit: contain;

  display: block;
`;
