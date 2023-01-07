import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { themePalette } from "components/ThemeProvider";
import { ThemeProvider } from "@mui/material/styles";

import { fetchUsersThunk } from "services/thunks.services";
import { AppDispatch } from "../../redux/store";
import { CurrentUser } from "redux/slices/usersSlice";

interface SelectedUser {
  selectedUser: CurrentUser;
}

const baseURL = "http://localhost:4000/api/v1";

function UserAccount({ selectedUser }: SelectedUser) {
  const dispatch = useDispatch<AppDispatch>();
  let navigate = useNavigate();

  const [values, setValues] = React.useState<CurrentUser>({
    userId: selectedUser.userId,
    firstname: selectedUser.firstname,
    permission: selectedUser.permission,
    banStatus: selectedUser.banStatus,
    isAdmin: selectedUser.isAdmin,
    orders: selectedUser.orders,
    iat: selectedUser.iat,
    exp: selectedUser.exp,
  });

  const handleChange =
    (prop: keyof CurrentUser) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSave = async () => {
    const updatedData = {
      firstname: values.firstname,
    };
    await axios.put(`${baseURL}/users/${values.userId}`, updatedData);
    dispatch(fetchUsersThunk());
  };

  return (
    <ThemeProvider theme={themePalette}>
      <Box sx={{ display: "flex", flexDirection: "column", margin: 2 }}>
        <div>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant='h5'
              color='secondary'
              sx={{ margin: "auto", paddingTop: "20px" }}>
              Your account information
            </Typography>
          </Box>

          <TextField
            id='outlined-uncontrolled'
            label='User firstname'
            defaultValue={values.firstname}
            onChange={handleChange("firstname")}
            fullWidth
            sx={{ m: 1 }}
          />

          <TextField
            id='outlined-uncontrolled'
            label='User ban status'
            defaultValue={values.banStatus}
            fullWidth
            disabled
            sx={{ m: 1 }}
          />

          <TextField
            id='outlined-uncontrolled'
            label='User is admin'
            defaultValue={values.isAdmin}
            fullWidth
            disabled
            sx={{ m: 1 }}
          />
        </div>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ margin: "auto", paddingTop: "20px" }}>
            **Note: Please click Save and then Re-login to your account to
            activate new information
          </Typography>
        </Box>

        <Box>
          <Button
            color='secondary'
            variant='contained'
            onClick={handleSave}
            sx={{ margin: 1 }}>
            Save
          </Button>
          <Button
            color='secondary'
            variant='contained'
            onClick={() => navigate("/")}>
            Re-login
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserAccount;
