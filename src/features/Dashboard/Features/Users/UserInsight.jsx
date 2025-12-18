import React from "react";
import styled from "styled-components";
import { useModal } from "../../../../context/ModalContext";
import { useFetchAllBanned } from "../Overview/useFetchAllBanned";
import { useUser } from "../../../Auth/useUser";
import BannedReason from "../../../../components/BannedReason";

// --- Styled Components ---

const CardContainer = styled.div`
  background-color: var(--background-glass); /* zinc-900 */
  border: 1px solid #27272a; /* zinc-800 */
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  width: 100%;
  max-width: 32rem; /* max-w-lg */
  margin: 0 auto;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: var(--text-color);
`;

const BannerWrapper = styled.div`
  height: 8rem; /* h-32 */
  width: 100%;
  position: relative;
  background-color: #27272a;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.8;
`;

const BannerGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, #18181b, transparent, transparent);
`;

const BannerPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #1f2937, #18181b);
`;

const ContentWrapper = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  position: relative;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: -3rem; /* Negative margin for overlap */
  margin-bottom: 1rem;
`;

const Avatar = styled.img`
  width: 6rem; /* w-24 */
  height: 6rem;
  border-radius: 50%;
  border: 5px solid #18181b; /* Matches card bg to look like a cutout */
  background-color: #27272a;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const StatusBadge = styled.span`
  margin-bottom: 0.25rem;
  z-index: 10;
  padding: 0.25rem 0.75rem;
  font-size: 0.625rem; /* text-[10px] */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 9999px;

  /* Conditional Styling based on props */
  background-color: ${(props) =>
    props.$isBanned ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)"};
  color: ${(props) => (props.$isBanned ? "#f87171" : "#4ade80")};
  border: 1px solid
    ${(props) =>
      props.$isBanned ? "rgba(239, 68, 68, 0.2)" : "rgba(34, 197, 94, 0.2)"};
`;

const UserInfoSection = styled.div`
  margin-bottom: 1.5rem;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0;
`;

const UserEmail = styled.p`
  color: var(--text-color);
  font-size: 0.875rem;
  margin: 0.25rem 0 0 0;
`;

const BioCard = styled.div`
  background-color: var(--background-color); /* zinc-800/50 */
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(63, 63, 70, 0.5);
`;

const Label = styled.h3`
  font-size: 0.625rem;
  font-weight: 700;
  color: var(--text-color);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
`;

const BioText = styled.p`
  color: var(--text-color);
  font-style: italic;
  font-size: 0.875rem;
  line-height: 1.6;
`;

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem; /* gap-y-6 */
  border-top: 1px solid #27272a;
  padding-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const DataValue = styled.p`
  font-size: 0.875rem;
 color: var(--text-color); */
`;

const CodeBlock = styled.code`
  display: block;
  font-family: monospace;
  font-size: 0.75rem;
  color: var(--text-color);
  background-color: var(--background-color); /* zinc-950 */
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #27272a;
  word-break: break-all;
  user-select: all;
`;

const EmptyState = styled.div`
  padding: 1rem;
  text-align: center;
  color: var(--text-color);
  background-color: #18181b;
  border-radius: 0.75rem;
  border: 1px solid #27272a;
`;

// --- Component Logic ---

function UserInsight() {
  const { modalData } = useModal();
  const { user } = useUser();
  const { banned, isLoadBanned, errorBanned } = useFetchAllBanned(user?.id);

  const userBanRecord = banned?.data?.find((b) => b.userId === modalData.id);

  const reason = userBanRecord?.reason;
  if (!modalData) {
    return <EmptyState>No user data available.</EmptyState>;
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <CardContainer>
      {/* 1. Banner Image Area */}
      <BannerWrapper>
        {modalData.banner_url ? (
          <BannerImage src={modalData.banner_url} alt="User Banner" />
        ) : (
          <BannerPlaceholder />
        )}
        <BannerGradient />
      </BannerWrapper>

      <ContentWrapper>
        {/* 2. Avatar & Status Badge */}
        <HeaderRow>
          <Avatar src={modalData.avatar_url} alt={modalData.name} />
          <StatusBadge $isBanned={modalData.is_banned}>
            {modalData.is_banned ? "Banned" : "Active"}
          </StatusBadge>
        </HeaderRow>

        {/* 3. Header Info */}
        <UserInfoSection>
          <UserName>{modalData.name}</UserName>
          <UserEmail>{modalData.email}</UserEmail>
        </UserInfoSection>
        {/* 4. Banned Reason */}
        {modalData?.is_banned && <BannedReason reason={reason} />}

        {/* 4. Bio Section */}
        <BioCard>
          <Label>About</Label>
          <BioText>"{modalData.bio || "No bio provided."}"</BioText>
        </BioCard>

        {/* 5. Detailed Meta Data Grid */}
        <MetaGrid>
          {/* User ID */}
          <div>
            <Label>User ID</Label>
            <CodeBlock>{modalData.id}</CodeBlock>
          </div>

          {/* Role */}
          <div>
            <Label>Role</Label>
            <DataValue>
              {modalData.role ? (
                modalData.role
              ) : (
                <span style={{ color: "#71717a", fontStyle: "italic" }}>
                  user
                </span>
              )}
            </DataValue>
          </div>

          {/* Joined Date */}
          <div style={{ gridColumn: "1 / -1" }}>
            <Label>Joined On</Label>
            <DataValue>{formatDate(modalData.created_at)}</DataValue>
          </div>
        </MetaGrid>
      </ContentWrapper>
    </CardContainer>
  );
}

export default UserInsight;
