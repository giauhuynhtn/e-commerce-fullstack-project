import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import MenuBar from "components/MenuBar";
import { removeCartItem, resetCart } from "redux/slices/cartSlice";
import { themePalette } from "components/ThemeProvider";

function Checkout() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartList, products, users } = useSelector((state: RootState) => {
    return state;
  });
  console.log("cartList:", cartList);
  const baseURL = "http://localhost:4000/api/v1";

  const handlePayment = async () => {
    // update quantity of Products collection
    cartList.items.forEach(async (item) => {
      const productId = item.product._id;
      const currentQnt = Number(
        products.items.find((item) => item._id === productId)?.quantity
      );

      const orderQnt = Number(item.quantity);
      const newQnt = currentQnt - orderQnt;
      const updatedData = {
        quantity: newQnt,
      };
      await axios.put(`${baseURL}/products/${productId}`, updatedData);
    });

    // create Order with user id - database
    const productsList = cartList.items.map((item) => {
      return {
        productId: item.product._id,
        productQnt: item.quantity,
      };
    });
    const currentUserId = users.currentUser.userId;
    const orderData = {
      products: productsList,
      userId: currentUserId,
    };
    await axios.post(`${baseURL}/orders`, orderData);

    // clear cartList
    dispatch(resetCart());
    alert(
      `Hi ${users.currentUser.firstname}, your order has been created. Thank you.`
    );
  };

  return (
    <ThemeProvider theme={themePalette}>
      <MenuBar />
      <Box sx={{ margin: 2 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='checkout table'>
            <TableHead>
              <TableRow>
                <TableCell
                  align='center'
                  sx={{ fontSize: 16, color: "secondary" }}>
                  Number
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontSize: 16, color: "secondary" }}>
                  Image
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontSize: 16, color: "secondary" }}>
                  Name
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontSize: 16, color: "secondary" }}>
                  Price
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontSize: 16, color: "secondary" }}>
                  Quantity
                </TableCell>
                <TableCell
                  align='center'
                  sx={{ fontSize: 16, color: "secondary" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cartList.items.map((item, index) => (
                <TableRow hover={true} key={item.product._id}>
                  <TableCell align='center' sx={{ width: 100 }}>
                    <Typography sx={{ fontSize: 14 }}>{index + 1}</Typography>
                  </TableCell>

                  <TableCell align='center' sx={{ width: 80 }}>
                    <img
                      src={item.product.img}
                      alt={item.product.name}
                      width='60px'
                    />
                  </TableCell>

                  <TableCell align='center' sx={{ width: 200 }}>
                    {item.product.name}
                  </TableCell>

                  <TableCell align='center' sx={{ width: 100 }}>
                    {item.product.price}
                  </TableCell>

                  <TableCell align='center' sx={{ width: 100 }}>
                    {item.quantity}
                  </TableCell>
                  <TableCell align='center' sx={{ width: 100 }}>
                    <Button
                      onClick={() => {
                        dispatch(removeCartItem(item));
                      }}
                      variant='contained'
                      color='success'
                      sx={{ color: "primary.dark" }}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          variant='contained'
          sx={{ marginTop: 2 }}
          color='primary'
          onClick={handlePayment}>
          Pay for your order
        </Button>
      </Box>
    </ThemeProvider>
  );
}

export default Checkout;
