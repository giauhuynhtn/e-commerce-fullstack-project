import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TableCell, TableHead, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import { themePalette } from "components/ThemeProvider";
import { RootState } from "../../redux/store";
import { Product } from "../../redux/slices/productsSlice";
import { AppDispatch } from "../../redux/store";
import { fetchProductsThunk } from "services/thunks.services";

const baseURL = "http://localhost:4000/api/v1/products";

function ProductsDashboard() {
  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { products } = useSelector((state: RootState) => {
    return state;
  });

  const handleEditProduct = (product: Product) => {
    navigate(`/admin/dashboard/product/${product._id}`);
  };

  const handleRemoveProduct = async (product: Product) => {
    await axios.delete(`${baseURL}/${product._id}`);
    const token = localStorage.getItem("candy-store-token") || "";

    dispatch(fetchProductsThunk(token));
  };

  const handleAddNewProduct = () => {
    navigate("/admin/dashboard/product/");
  };
  return (
    <ThemeProvider theme={themePalette}>
      <Button
        color='primary'
        sx={{ marginBottom: "20px", color: "#a7ffeb" }}
        variant='contained'
        onClick={handleAddNewProduct}>
        Add new product
      </Button>
      <Typography variant='subtitle1' sx={{ marginBottom: 1 }}>
        Total: {products.items.length} products
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='products table'>
          <TableHead>
            <TableRow>
              <TableCell
                align='center'
                sx={{ fontSize: 16, color: "#009688", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontSize: 16, color: "#009688", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontSize: 16, color: "#009688", fontWeight: "bold" }}>
                Category
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontSize: 16, color: "#009688", fontWeight: "bold" }}>
                Image
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontSize: 16, color: "#009688", fontWeight: "bold" }}>
                Image link
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontSize: 16, color: "#009688", fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell
                align='center'
                sx={{ fontSize: 24, color: "#333" }}></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.items.map((product) => (
              <TableRow hover={true} key={product._id}>
                <TableCell align='center' sx={{ width: 100 }}>
                  <Typography
                    onClick={() => navigate(`/product/${product._id}`)}
                    sx={{ fontSize: 14, color: "#1769aa" }}>
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell align='center' sx={{ width: 100, color: "#1769aa" }}>
                  {product.price}
                </TableCell>
                <TableCell align='center' sx={{ width: 200, color: "#1769aa" }}>
                  {product.category}
                </TableCell>
                <TableCell align='center' sx={{ width: 200 }}>
                  <img src={product.img} alt={product.name} width='60px' />
                </TableCell>

                <TableCell align='center' sx={{ width: 200 }}>
                  <a
                    href={product.img}
                    target='_blank'
                    rel='noopener noreferrer'>
                    Image link
                  </a>
                </TableCell>

                <TableCell align='center' sx={{ width: 100, color: "#1769aa" }}>
                  {product.quantity}
                </TableCell>
                <TableCell align='center' sx={{ width: 300 }}>
                  <Button
                    color='success'
                    sx={{ color: "#33691e", marginRight: "4px" }}
                    onClick={() => handleEditProduct(product)}
                    variant='contained'>
                    Edit
                  </Button>
                  <Button
                    color='warning'
                    sx={{ color: "#bf360c" }}
                    onClick={() => handleRemoveProduct(product)}
                    variant='contained'>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export default ProductsDashboard;
