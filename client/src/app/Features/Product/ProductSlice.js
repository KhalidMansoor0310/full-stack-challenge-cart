import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
export const getAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async () => {
    try {
      let { data } = await axios.get(
        "http://localhost:5000/api/items/getitems"
      );
      console.log("data: ", data);
      localStorage.setItem("carts", JSON.stringify(data?.items));
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const getSingleProducts = createAsyncThunk(
  "products/getSingleProduct",
  async (id) => {
    try {
      let { data } = await axios.get(`http://localhost:5000/api/items/${id}`);
      console.log("data: ", data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData) => {
    try {
      let { data } = await axios.post(
        `http://localhost:5000/api/items/createitem`,
        formData
      );

      toast.success("Product Added Successfully");
      return data?.item;
    } catch (error) {
      return error;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      let { data } = await axios.delete(
        `http://localhost:5000/api/items/deleteitem/${id}`
      );

      toast.error("Product Deleted Successfully");
      return data?.id;
    } catch (error) {
      return error;
    }
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    singleProduct: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.error = null;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });

    builder.addCase(getSingleProducts.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSingleProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.singleProduct = action.payload;
      state.error = null;
    });
    builder.addCase(getSingleProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.singleProduct = [];
      state.error = action.error.message;
    });
    builder.addCase(addProduct.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = [...state.products, action.payload];
      state.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteProduct.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default productSlice.reducer;
