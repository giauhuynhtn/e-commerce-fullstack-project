import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import UserAccount from "components/UserAccount";
import MenuBar from "components/MenuBar";

function UserAccountInfo() {
  const { users } = useSelector((state: RootState) => {
    return state;
  });
  return (
    <>
      <MenuBar />
      <UserAccount selectedUser={users.currentUser} />
    </>
  );
}

export default UserAccountInfo;
