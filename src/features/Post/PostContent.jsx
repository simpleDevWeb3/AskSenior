import styled from "styled-components";
import { variantSize } from "../../styles/VariantSize";
import Text from "../../components/Text";
import { usePost } from "./PostContext";
import Carousel from "../../components/Carousel";

function PostContent() {
  const { postData, variant } = usePost();
  // Ensure image is treated as an array for safety
  const { title, text, postImage_url: image } = postData;

  return (
    <TextWrapper $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{text}</Text>

      {/* 1. Single Image Logic */}
      {image && image.length === 1 && (
        <ImageContainer>
          <Image src={image[0]} alt={title || "Post image"} />
        </ImageContainer>
      )}

      {/* 2. Carousel Logic (More than 1 image) */}
      {image && image.length > 1 && (
       
        <Carousel total={image.length}>
        
          <Carousel.Track>
            {image.map((img, index) => (
              <Carousel.Card key={index}>
                <ImageContainer>
                  <Image src={img} alt={title || "Post image"} />
                </ImageContainer>
              </Carousel.Card>
            ))}
          </Carousel.Track>

       
          <Carousel.PrevBtn positionY="center" />
          <Carousel.NextBtn positionY="center" />

      
          <Carousel.Tracker />
        </Carousel>
      )}
    </TextWrapper>
  );
}

export default PostContent;


const TextWrapper = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  gap: 0.5rem;
  ${({ $variant }) => variantSize[$variant] || ""}
`;

const ImageContainer = styled.div`
  margin-top: 0.75rem;
  border-radius: 10px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
`;
