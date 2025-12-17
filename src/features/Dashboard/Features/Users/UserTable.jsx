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
import { useEffect, useRef, useState } from "react";
import Filter from "../../../../components/Filter";
import Search from "../../../../components/Search";
import { Dropdown } from "../../../../components/Dropdown";
import SortBy from "../../../../components/SortBy";

function UserTable() {
  const [searchParam, setSearchParam] = useSearchParams();
  const page = searchParam.get("page") ? searchParam.get("page") : 1;
  const { openModal } = useModal();
  const { users, isLoadUsers, errorUsers } = useFetchUsers();
  const { unbanUser, isLoadUnbanUser, errorUnbanUser } = useUnbanUser();

  const [userList, setUserList] = useState(users ?? []);

  useEffect(() => {
    if (users) setUserList(users);
  }, [users]);

  //filter
  const filterVal = searchParam.get("type");
  const filteredUser = userList?.filter((user) => {
    if (!filterVal || filterVal === "All") return true;

    switch (filterVal) {
      case "BANNED":
        return user.is_banned === true;
      case "ACTIVE":
        return user.is_banned === false;
    }
  });

  const options = [
    { key: "All", label: "All" },
    { key: "BANNED", label: "Banned" },
    { key: "ACTIVE", label: "Active" },
  ];

  //sort

  const optionSort = [
    { value: "created_at-desc", label: "Date (Newest first)" },
    { value: "created_at-asc", label: "Date (Oldest first)" },
  ];
  const sortBy = searchParam.get("sortBy") || "created_at-desc";
  // 2. Split the value "created_at-desc" into ["created_at", "desc"]
  const [field, direction] = sortBy.split("-");

  // 3. Determine modifier: 1 for ascending, -1 for descending
  const modifier = direction === "asc" ? 1 : -1;

  const sortedUsers = [...filteredUser].sort((a, b) => {
    // A. Handle Date Sorting
    if (field === "created_at") {
      return (new Date(a[field]) - new Date(b[field])) * modifier;
    }

    const valA = a[field] || 0;
    const valB = b[field] || 0;

    return (valA - valB) * modifier;
  });

  //pagination
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE;
  const sliceUser = sortedUsers.slice(from, to);

  //search
  const handleSearch = function (query) {
    if (!query) return setUserList(users);

    if (page > 1) {
      searchParam.set("page", 1);
      setSearchParam(searchParam);
    }

    const result = users.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    setUserList(result);
  };

  const filterRef = useRef(filterVal);
  useEffect(() => {
    if (filterRef.current !== filterVal) {
      if (page > 1) {
        searchParam.set("page", 1);
        setSearchParam(searchParam);
      }
      filterRef.current = filterVal;
    }
  }, [filterVal, setSearchParam, searchParam, page]);

  if (isLoadUsers) return <Spinner />;
  return (
    <StyledContainer>
      <Header>
        <Dropdown>
          <div>
            <Search dropdown={false} onInput={handleSearch} />
          </div>
        </Dropdown>
        <OperationRow>
          <Filter
            filterField="type"
            options={options}
            startingOption={"All"}
            variant={"tabs"}
          />
          <SortBy options={optionSort} />
        </OperationRow>
      </Header>
      <Table>
        <Table.Row style={{ backgroundColor: "var(--background-color)" }}>
          <Table.Col>Username</Table.Col>
          <Table.Col>Status</Table.Col>
          <Table.Col>Email</Table.Col>
          <Table.Col>Joined At</Table.Col>

          <Table.Col />
        </Table.Row>

        {sliceUser.map((user) => (
          <Table.Row key={user.id}>
            <Table.Data>{user.name}</Table.Data>
            <Table.Data>
              <Status isBanned={user?.is_banned} notBan="Active" />
            </Table.Data>
            <Table.Data>{user.email}</Table.Data>
            <Table.Data>{formatDate_DD_MM_YYY(user.created_at)}</Table.Data>

            <Table.Data>
              <Menus.MenuToggle id={`user-${user.id}`}>
                <ButtonIcon
                  variant="text"
                  size="rounded"
                  icon={<HiDotsVertical />}
                />
              </Menus.MenuToggle>
              <Menus.MenuList id={`user-${user.id}`}>
                <Menus.MenuBtn
                  onClickAction={() => openModal("user-insight", user)}
                >
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
      <br />
      <Pagination count={sortedUsers.length} />
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  margin-bottom: 5rem;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
const OperationRow = styled.div`
  display: flex;
  gap: 2rem;
`;
const MenuTxt = styled.div`
  margin: 0.5rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

export default UserTable;
