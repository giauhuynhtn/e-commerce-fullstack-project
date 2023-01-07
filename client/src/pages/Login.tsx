import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import CardMedia from "@mui/material/CardMedia";

import { CurrentUser, setCurrentUser } from "../redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";

const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
      light: "#e0f7fa",
    },
    text: {
      primary: "#173A5E",
      secondary: "#1b5e20",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#4db6ac",
    },
  },
});

export default function Login() {
  const [userToken, setToken] = useState("");
  console.log("userToken:", userToken);
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleGoogleOnSuccess = async (response: any) => {
    console.log("response:", response);

    const res = await axios.post(
      "http://localhost:4000/api/v1/login",
      {},
      {
        headers: {
          id_token: response.credential,
        },
      }
    );
    const userToken = res.data.token;
    localStorage.setItem("candy-store-token", userToken);
    setToken(userToken);
  };

  useEffect(() => {
    const storageToken = localStorage.getItem("candy-store-token") || "";
    if (storageToken !== "") {
      const decoded = jwt_decode(storageToken) as CurrentUser;
      dispatch(setCurrentUser(decoded));
    }
  }, [dispatch, userToken]);

  const { users } = useSelector((state: RootState) => {
    return state;
  });

  console.log("currentUser:", users.currentUser);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.light",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          width: "100%",
          margin: "auto",
        }}>
        <Box
          sx={{
            color: "success.dark",
            fontSize: 34,
            fontWeight: "medium",
            height: "60px",
          }}>
          Hi, let's login to your account ...
        </Box>
        <Box>
          <GoogleLogin
            onSuccess={handleGoogleOnSuccess}
            onError={() => {
              console.log("Login Failed");
            }}
          />

          <button
            style={{
              marginTop: "20px",
              border: "1px solid #80cbc4",
              backgroundColor: "#e0f7fa",
              color: "#009688",
              fontSize: "16px",
              fontWeight: "600",
              width: "150px",
              height: "30px",
            }}
            onClick={() => navigate("/home")}>
            Go shopping ...
          </button>
        </Box>
        <Box sx={{ marginTop: "20px" }}>
          <CardMedia
            component='img'
            height='600'
            image='https://images.pexels.com/photos/1289363/pexels-photo-1289363.jpeg?cs=srgb&dl=pexels-somben-chea-1289363.jpg&fm=jpg'
            alt='login-image'
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
