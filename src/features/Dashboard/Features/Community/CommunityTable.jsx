import styled from "styled-components";
import Table from "../../../../components/Table";
import forumData from "../../../../data/post";
import Menus from "../../../../components/Menus";
import ButtonIcon from "../../../../components/ButtonIcon";
import { HiDotsVertical } from "react-icons/hi";

import { FaBan, FaTrash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useFetchAllCommunity } from "../../../Communities/useFetchAllCommunity";
import Spinner from "../../../../components/Spinner";
import Avatar from "../../../../components/Avatar";
import { useUser } from "../../../Auth/useUser";
import { formatDate_DD_MM_YYY } from "../../../../helpers/dateHelper";
import Pagination from "../../../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../constant/FILE_CONFIG";

function CommunityTable() {
  const [searchParam] = useSearchParams();
  const page = searchParam.get("page") ? searchParam.get("page") : 1;
  const { user } = useUser();
  const { communities, isLoadCommunities, errorCommunities } =
    useFetchAllCommunity(user?.id);

  if (isLoadCommunities) return <Spinner />;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const sliceCommunities = communities.slice(from, to);

  return (
    <>
      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col></Table.Col>
          <Table.Col>Name</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col>Admin</Table.Col>
          <Table.Col>Created At</Table.Col>
          <Table.Col />
        </Table.Row>

        {sliceCommunities.map((community) => (
          <Table.Row key={community.id}>
            <Table.Data>
              <div
                style={{
                  borderRadius: "50%",
                  overflow: "hidden",
                  height: "4rem",
                  width: "4rem",
                }}
              >
                <Avatar src={community.avatarUrl} />
              </div>
            </Table.Data>
            <Table.Data>{community.name}</Table.Data>
            <Table.Data>{community.is_banned ? "banned" : "public"}</Table.Data>
            <Table.Data>Admin</Table.Data>
            <Table.Data>{formatDate_DD_MM_YYY(community.createdAt)}</Table.Data>

            <Table.Data>
              <Menus.MenuToggle id={`community-${community.id}`}>
                <ButtonIcon
                  variant="text"
                  size="rounded"
                  icon={<HiDotsVertical />}
                />
              </Menus.MenuToggle>
              <Menus.MenuList id={`community-${community.id}`}>
                <Menus.MenuBtn>
                  <MenuTxt>
                    <ImProfile />
                    <span>insight</span>
                  </MenuTxt>
                </Menus.MenuBtn>
                <Menus.MenuBtn>
                  <MenuTxt>
                    <FaBan />
                    <span>Ban</span>
                  </MenuTxt>
                </Menus.MenuBtn>
                <Menus.MenuBtn>
                  <MenuTxt>
                    <FaTrash />
                    <span>Delete</span>
                  </MenuTxt>
                </Menus.MenuBtn>
              </Menus.MenuList>
            </Table.Data>
          </Table.Row>
        ))}
      </Table>
      <Pagination count={communities.length} />
      <br />
    </>
  );
}

const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export default CommunityTable;
