import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const path = "http://localhost:4000/api/v1";

// product thunks
const fetchProductInfoThunk = createAsyncThunk(
  "productInfo/fetch",
  async (params: any) => {
    const { id } = params;
    const URL = `${path}/products/${id}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

const fetchProductsByNameThunk = createAsyncThunk(
  "productsByName/fetch",
  async (name: string) => {
    const URL = `${path}/products/filterByName/${name}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

const fetchProductsByCategoryThunk = createAsyncThunk(
  "productsByCategory/fetch",
  async (category: string) => {
    const URL = `${path}/products/filterByCategory/${category}`;
    const response = await axios.get(URL);
    return { data: response.data, status: response.status };
  }
);

const fetchProductsThunk = createAsyncThunk(
  "products/fetch",
  async (token: string) => {
    const URL = `${path}/products`;
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data: response.data, status: response.status };
  }
);

// User thunks

const fetchUsersThunk = createAsyncThunk("users/fetch", async () => {
  const URL = `${path}/users`;
  const response = await axios.get(URL);
  console.log("response:", response.data);
  return { data: response.data, status: response.status };
});

// Order thunks

const fetchOrdersThunk = createAsyncThunk("users/fetch", async () => {
  const URL = `${path}/orders`;
  const response = await axios.get(URL);
  return { data: response.data, status: response.status };
});

export {
  fetchProductInfoThunk,
  fetchProductsByNameThunk,
  fetchProductsByCategoryThunk,
  fetchProductsThunk,
  fetchUsersThunk,
  fetchOrdersThunk,
};
