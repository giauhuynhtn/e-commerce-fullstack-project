import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Paper, Typography, Box, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { fetchProductInfoThunk } from "../services/thunks.services";
import { AppDispatch, RootState } from "../redux/store";
import { addCartItem } from "redux/slices/cartSlice";
import MenuBar from "components/MenuBar";
import { themePalette } from "components/ThemeProvider";
import { ThemeProvider } from "@mui/material/styles";

const ProductInfo = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useSelector((state: RootState) => {
    return state;
  });
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    dispatch(fetchProductInfoThunk({ id: productId }));
  }, [dispatch, productId]);

  const [quantity, setQuantity] = useState(1);
  const handleClickIncrease = () => {
    setQuantity((prev) => {
      if (prev + 1 > products.productInfo.quantity) {
        return products.productInfo.quantity;
      } else {
        return prev + 1;
      }
    });
  };

  const handleClickDecrease = () => {
    setQuantity((prev) => {
      if (prev - 1 < 1) {
        return 1;
      } else {
        return prev - 1;
      }
    });
  };

  const handleAdd = () => {
    dispatch(
      addCartItem({
        product: products.productInfo,
        quantity: Number(quantity),
      })
    );
  };

  return (
    <ThemeProvider theme={themePalette}>
      <MenuBar />
      <Paper sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            width: 400,
            height: 400,
            padding: 10,
          }}>
          <img
            src={products.productInfo.img}
            alt={products.productInfo.name}
            style={{ width: "400px" }}
          />
        </Box>
        <Box sx={{ margin: "40px" }}>
          <Typography variant='h4' color='secondary'>
            {products.productInfo.name}
          </Typography>
          <Typography
            variant='h6'
            color='secondary.dark'
            sx={{ marginTop: "40px" }}>
            Price: {products.productInfo.price} Euro/pack
          </Typography>
          <Typography variant='h6' color='secondary.dark'>
            {products.productInfo.quantity} packs left
          </Typography>
          <Typography>Free shipping**</Typography>
          <Box
            sx={{
              minWidth: "200",
              display: "flex",
              marginTop: "30px",
            }}>
            <Box
              sx={{
                display: "flex",
                backgroundColor: "success.light",
              }}>
              <IconButton
                aria-label='add quantity'
                onClick={handleClickDecrease}>
                <RemoveIcon
                  color='primary'
                  sx={{ fontWeight: "bold", fontSize: "24px" }}
                />
              </IconButton>

              <input
                value={quantity}
                style={{
                  width: "140px",
                  backgroundColor: "#e0f2f1",
                  fontSize: "14px",
                  fontWeight: "bold",
                  color: "#00796b",
                  lineHeight: "20px",
                  textAlign: "center",
                  border: "1px solid #b2dfdb",
                  margin: "0 2px 0 2px",
                }}></input>

              <IconButton
                aria-label='add quantity'
                onClick={handleClickIncrease}>
                <AddIcon
                  color='primary'
                  sx={{ fontWeight: "bold", fontSize: "24px" }}
                />
              </IconButton>
            </Box>

            <Button
              // fullWidth
              variant='contained'
              onClick={handleAdd}
              color='primary'
              sx={{ marginLeft: 1, color: "#a7ffeb", fontWeight: "bold" }}>
              Add to cart
            </Button>
          </Box>
          <Box sx={{ marginTop: "30px" }}>
            <Typography variant='h6'>Product description:</Typography>
            <Typography variant='subtitle1' sx={{ textAlign: "justify" }}>
              {products.productInfo.description}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};

export default ProductInfo;
