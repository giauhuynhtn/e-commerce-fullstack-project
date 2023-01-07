import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";

import Cart from "./Cart";
import { RootState } from "redux/store";
import UserMenu from "./UserMenu";

const MenuBar = () => {
  let navigate = useNavigate();
  const { users } = useSelector((state: RootState) => {
    return state;
  });

  return (
    <AppBar position='static'>
      <Container maxWidth='xl' sx={{ backgroundColor: "#80cbc4" }}>
        <Toolbar disableGutters>
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#00897b",
            }}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Button
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#00897b",
                textDecoration: "none",
                fontSize: 16,
              }}
              onClick={() => navigate("/home")}>
              CANDY
            </Button>
          </Box>

          {users.currentUser.firstname === "" ? (
            <IconButton
              size='large'
              aria-label='show user menu'
              color='inherit'
              onClick={() => navigate("/")}
              sx={{ paddingLeft: "14px" }}>
              <Typography sx={{ paddingLeft: "8px" }}>Login</Typography>
            </IconButton>
          ) : (
            <UserMenu />
          )}
          <Cart />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MenuBar;
