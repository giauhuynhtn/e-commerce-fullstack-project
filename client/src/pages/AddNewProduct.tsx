import React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { Product } from "redux/slices/productsSlice";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { fetchProductsThunk } from "services/thunks.services";
import MenuBar from "components/MenuBar";

const baseURL = "http://localhost:4000/api/v1/products";
const categories = [
  "gummy",
  "candy stick",
  "candy cane",
  "fruit candy",
  "jelly beans",
];

function AddNewProduct() {
  const newProduct = {
    _id: "",
    name: "",
    category: "",
    description: "",
    price: 0,
    quantity: 0,
    img: "",
  };
  const [values, setValues] = React.useState<Product>(newProduct);

  let navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange =
    (prop: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleCreate = async () => {
    const newData = {
      name: values.name,
      category: values.category,
      description: values.description,
      price: values.price,
      quantity: values.quantity,
      img: values.img,
    };

    await axios.post(`${baseURL}`, newData);
    const token = localStorage.getItem("candy-store-token") || "";
    dispatch(fetchProductsThunk(token));
    alert("You have created a new product.");
    setValues(newProduct);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MenuBar />
      <div>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ margin: "auto", paddingTop: "20px" }}>
            Create new product:
          </Typography>
        </Box>

        <TextField
          id='outlined-uncontrolled'
          label='Product name'
          value={values.name}
          onChange={handleChange("name")}
          fullWidth
          sx={{ m: 1 }}
        />

        <TextField
          id='outlined-uncontrolled'
          label='Product description'
          value={values.description}
          onChange={handleChange("description")}
          fullWidth
          multiline
          sx={{ m: 1 }}
        />

        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor='outlined-adornment-price'>Price</InputLabel>
          <OutlinedInput
            id='outlined-adornment-price'
            value={values.price}
            onChange={handleChange("price")}
            startAdornment={
              <InputAdornment position='start'>EURO</InputAdornment>
            }
            label='Price'
          />
        </FormControl>

        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor='outlined-adornment-quantity'>
            Quantity
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-quantity'
            value={values.quantity}
            onChange={handleChange("quantity")}
            endAdornment={<InputAdornment position='end'>Pack</InputAdornment>}
            label='Quantity'
          />
        </FormControl>
        <TextField
          id='outlined-select-category'
          fullWidth
          sx={{ m: 1 }}
          select
          label='Product category'
          value={values.category}
          onChange={handleChange("category")}>
          {categories.map((i, index) => (
            <MenuItem key={index} value={i}>
              {i}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id='outlined-uncontrolled'
          label='Product image link'
          value={values.img}
          onChange={handleChange("img")}
          fullWidth
          multiline
          sx={{ m: 1 }}
        />
        <Box style={{ margin: "10px" }}>
          <Typography sx={{ fontSize: "12px" }}>Image preview:</Typography>
          <img
            src={values.img}
            alt='Uncontrolled'
            width='200px'
            height='200px'
          />
        </Box>
      </div>

      <Box>
        <Button variant='outlined' onClick={handleCreate}>
          Create
        </Button>
        <Button
          variant='outlined'
          onClick={() => navigate("/admin/dashboard/")}>
          Back
        </Button>
      </Box>
    </Box>
  );
}

export default AddNewProduct;
