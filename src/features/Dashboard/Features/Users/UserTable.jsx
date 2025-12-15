import styled from "styled-components";
import Table from "../../../../components/Table";
import forumData from "../../../../data/post";
import Menus from "../../../../components/Menus";
import ButtonIcon from "../../../../components/ButtonIcon";
import { HiDotsVertical } from "react-icons/hi";

import { FaBan, FaTrash } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useFetchUsers } from "./useFetchUsers";
import Spinner from "../../../../components/Spinner";
import Avatar from "../../../../components/Avatar";
import {
  formatDate_DD_MM_YYY,
  formatTimeAgo,
} from "../../../../helpers/dateHelper";
import Status from "../../../../components/Status";
import { useModal } from "../../../../context/ModalContext";
import { useUnbanUser } from "./useUnbanUser";
import Pagination from "../../../../components/Pagination";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../../../constant/FILE_CONFIG";

function UserTable() {
  const [searchParam] = useSearchParams();
  const page = searchParam.get("page") ? searchParam.get("page") : 1;
  const { openModal } = useModal();
  const { users, isLoadUsers, errorUsers } = useFetchUsers();
  const { unbanUser, isLoadUnbanUser, errorUnbanUser } = useUnbanUser();

  if (isLoadUsers) return <Spinner />;
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const sliceUser = users.slice(from, to);
  return (
    <>
      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col>Avatar</Table.Col>
          <Table.Col>Username</Table.Col>
          <Table.Col>Email</Table.Col>
          <Table.Col>Joined At</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col />
        </Table.Row>

        {sliceUser.map((user) => (
          <Table.Row key={user.id}>
            <Table.Data>
              <div
                style={{
                  borderRadius: "50%",
                  height: "4rem",
                  width: "4rem",
                  overflow: "hidden",
                }}
              >
                <Avatar src={user.avatar_url} />
              </div>
            </Table.Data>
            <Table.Data>{user.name}</Table.Data>
            <Table.Data>{user.email}</Table.Data>
            <Table.Data>{formatDate_DD_MM_YYY(user.created_at)}</Table.Data>
            <Table.Data>
              <Status isBanned={user?.is_banned} notBan="Active" />
            </Table.Data>
            <Table.Data>
              <Menus.MenuToggle id={`user-${user.id}`}>
                <ButtonIcon
                  variant="text"
                  size="rounded"
                  icon={<HiDotsVertical />}
                />
              </Menus.MenuToggle>
              <Menus.MenuList id={`user-${user.id}`}>
                <Menus.MenuBtn>
                  <MenuTxt>
                    <ImProfile />
                    <span>insight</span>
                  </MenuTxt>
                </Menus.MenuBtn>
                <Menus.MenuBtn
                  onClickAction={() =>
                    !user?.is_banned
                      ? openModal("ban-user", { user_id: user?.id })
                      : unbanUser({ user_id: user?.id, reason: "unban user" })
                  }
                >
                  <MenuTxt>
                    <FaBan />
                    {user?.is_banned ? <span>Unban</span> : <span>Ban</span>}
                  </MenuTxt>
                </Menus.MenuBtn>
              </Menus.MenuList>
            </Table.Data>
          </Table.Row>
        ))}
      </Table>
      <Pagination count={users.length} />
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

export default UserTable;
