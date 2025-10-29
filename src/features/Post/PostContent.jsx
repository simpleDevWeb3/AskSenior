import styled from "styled-components";
import { variantSize } from "../../styles/VariantSize";
import Text from "../../components/Text";
import { usePost } from "./PostContext";

function PostContent() {
  const { postData, variant } = usePost();
  const { title, content } = postData;
  return (
    <TextWrapper $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{content}</Text>
    </TextWrapper>
  );
}

const TextWrapper = styled.div`
  display: flex;
  flex-direction: ${({ $vertical }) => ($vertical ? "column" : "row")};
  align-items: ${({ $center }) => ($center ? "center" : "stretch")};
  ${({ $variant }) => variantSize[$variant] || ""}
`;

export default PostContent;
