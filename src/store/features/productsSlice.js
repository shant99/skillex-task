import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedProducts } from "../../utils/pagination";
import searchByString from "../../utils/searchByString";
import { savedFilters, savedPagination } from "../../utils/localStorage";

const initialState = {
  products: [],
  status: "idle",
  isLoading: false,
  error: null,
  page: savedPagination.page,
  limit: savedPagination.limit,
  total: 0,
  filters: {
    search: savedFilters.search || "",
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }, thunkAPI) => {
    try {
      const response = await fetch("/data/products.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const state = thunkAPI.getState();
      const filters = state.products.filters;

      const data = await response.json();
      let filteredProducts = data;

      if (filters.search) {
        filteredProducts = searchByString(filteredProducts, filters.search);
      }

      return {
        products: getPaginatedProducts(filteredProducts, page, limit),
        total: filteredProducts.length,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPagination: (state, action) => {
      state.limit = action.payload.limit;
      state.page = action.payload.page;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPagination, setFilters } = productsSlice.actions;
export default productsSlice.reducer;
