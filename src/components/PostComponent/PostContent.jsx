function PostContent({ variant, title, content }) {
    return (
    <TextWrapper $vertical={true} $variant={variant}>
      {title && <Text as="Title">{title}</Text>}
      <Text variant={variant}>{content}</Text>
    </TextWrapper>
  );
}

export default PostContent
