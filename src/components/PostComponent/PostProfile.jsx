function PostProfile({ avatarSize }) {
  return (
    <ProfileContainer>
      <AvatarContainer $size={avatarSize}>
        <Avatar src="/avatar.jpg" />
      </AvatarContainer>
      <UserName $size={avatarSize}>@c/MalaysiaKini</UserName>
    </ProfileContainer>
  );
}

export default PostProfile;
