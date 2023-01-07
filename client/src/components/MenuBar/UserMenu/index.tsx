import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/joy/Divider";
import Menu from "@mui/material/Menu";
import Face2Icon from "@mui/icons-material/Face2";
import IconButton from "@mui/material/IconButton";

import Can from "services/rbacAuth/Can";
import { AppDispatch } from "../../../redux/store";
import { RootState } from "redux/store";
import { setCurrentUser } from "redux/slices/usersSlice";
import { resetCart } from "redux/slices/cartSlice";

function UserMenu() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => {
    return state;
  });

  const handleGoToDashboard = () => {
    navigate("/admin/dashboard/");
  };

  const [anchorUserMenu, setAnchorUserMenu] =
    React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorUserMenu(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorUserMenu(null);
  };

  const handleLogout = () => {
    //reset currentUser state
    const noUser = {
      userId: "",
      firstname: "",
      permission: "",
      banStatus: "",
      isAdmin: "",
      orders: [],
      iat: 0,
      exp: 0,
    };
    dispatch(setCurrentUser(noUser));
    //close userMenu
    setAnchorUserMenu(null);
    //reset cartSlice
    dispatch(resetCart());
    //remove local storage token
    localStorage.setItem("candy-store-token", "");
    //go go frontpage
    navigate("/");
  };

  const isMenuOpen = Boolean(anchorUserMenu);

  const userMenuId = "user-menu";

  const userMenuList = ["Account", "Setting"];
  const renderUserMenu = (
    <Menu
      anchorEl={anchorUserMenu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={userMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleUserMenuClose}
      sx={{ top: 40, right: 0 }}>
      <Box sx={{ minWidth: 200, flexGrow: 1 }}>
        {userMenuList.map((userMenu, index) => (
          <MenuItem key={index}>
            <Container
              onClick={() => {
                navigate(`/user/${userMenu.toLocaleLowerCase()}`);
              }}
              sx={{
                flexGrow: 1,
                fontSize: 22,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}>
              <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                {userMenu}
              </Typography>
            </Container>
          </MenuItem>
        ))}
        <Can
          role={users.currentUser.isAdmin ? "admin" : "user"}
          perform='products:get'
          yes={() => (
            <MenuItem>
              <Container
                onClick={handleGoToDashboard}
                sx={{
                  flexGrow: 1,
                  fontSize: 22,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}>
                <Divider orientation='horizontal' />
                <Typography sx={{ fontSize: 14, marginRight: 2 }}>
                  DASHBOARD
                </Typography>
              </Container>
            </MenuItem>
          )}
        />

        <MenuItem>
          <Container
            onClick={handleLogout}
            sx={{
              flexGrow: 1,
              fontSize: 22,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <Divider orientation='horizontal' />
            <Typography sx={{ fontSize: 14, marginRight: 2 }}>
              Log out
            </Typography>
          </Container>
        </MenuItem>
      </Box>
    </Menu>
  );
  return (
    <>
      <Typography sx={{ paddingLeft: "8px", color: "#e3f2fd" }}>
        Hi,{" "}
        {users.currentUser.isAdmin
          ? `admin ${users.currentUser.firstname}`
          : users.currentUser.firstname}
      </Typography>
      <IconButton
        size='large'
        aria-label='show user menu'
        color='inherit'
        onClick={handleUserMenuOpen}
        sx={{ paddingLeft: "14px" }}>
        <Face2Icon sx={{ color: "#00897b" }} />
      </IconButton>
      {isMenuOpen && renderUserMenu}
    </>
  );
}

export default UserMenu;
