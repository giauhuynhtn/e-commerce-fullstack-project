import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import { AppDispatch } from "../redux/store";
import ProductCard from "../components/ProductCard";
import MenuBar from "../components/MenuBar";
import SearchBox from "../components/SearchBox";
import FilterByCategory from "../components/FilterByCategory";
import { RootState } from "../redux/store";
import { fetchProductsThunk } from "../services/thunks.services";
import { CurrentUser, setCurrentUser } from "redux/slices/usersSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
// interface CredentialResponse {
//   /** This field is the returned ID token */
//   credential?: string;
//   /** This field sets how the credential is selected */
//   select_by?:
//     | "auto"
//     | "user"
//     | "user_1tap"
//     | "user_2tap"
//     | "btn"
//     | "btn_confirm"
//     | "brn_add_session"
//     | "btn_confirm_add_session";
//   clientId?: string;
// }

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();

  const token = localStorage.getItem("candy-store-token") || "";
  useEffect(() => {
    dispatch(fetchProductsThunk(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (token !== "") {
      const decoded = jwt_decode(token) as CurrentUser;
      dispatch(setCurrentUser(decoded));
    }
  }, [dispatch, token]);

  const { products } = useSelector((state: RootState) => {
    return state;
  });

  const renderList =
    products.filteredItems.length === 0
      ? products.items
      : products.filteredItems;

  return (
    <Container
      sx={{
        backgroundColor: "#e0f7fa",
        maxWidth: "1400",
        padding: "0",
        margin: "auto",
      }}>
      <MenuBar />

      <Stack
        direction='row'
        spacing={2}
        sx={{ margin: "40px" }}
        alignItems='center'
        justifyContent='center'>
        <Item>
          <SearchBox />
        </Item>
        <Item>
          <FilterByCategory />
        </Item>
      </Stack>

      {/* <Paper sx={{ width: "100%", backgroundColor: "#e0f7fa" }}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ margin: "auto" }}>
          {renderList.map((item) => (
            <Grid item xs={3} key={item._id}>
              <ProductCard product={item} key={item._id} />
            </Grid>
          ))}
        </Grid>
      </Paper> */}

      <Box sx={{ flexGrow: 1, marginTop: "60px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {renderList.map((item) => (
            <Grid xs={3} sm={3} md={3} key={item._id}>
              <>
                <ProductCard product={item} key={item._id} />
              </>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
