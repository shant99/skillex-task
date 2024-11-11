import { createSlice } from "@reduxjs/toolkit";
import { savedFilters, savedPagination } from "../../utils/localStorage";
import { sortData } from "../../utils/sortProducts";
import { fetchProducts } from "../thunks/fetchProducts";

const initialState = {
  products: [],
  status: "idle",
  isLoading: false,
  error: null,
  page: savedPagination?.page || 0,
  limit: savedPagination?.limit || 10,
  total: 0,
  filters: {
    search: savedFilters?.search || "",
    sort: savedFilters?.sort || "no_sort",
    rating: savedFilters?.rating || "0",
    brand: savedFilters?.brand || "",
    category: savedFilters?.category || "",
    priceRange: savedFilters?.priceRange || [0, 1000],
  },
};

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
    sortProducts: (state, action) => {
      localStorage.setItem(
        "filters",
        JSON.stringify({ ...state.filters, sort: action.payload })
      );
      state.products = sortData(state.products, action.payload);
    },
    resetFilters: (state) => {
      state.page = 0;
      state.limit = 10;
      state.filters = {};
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

export const { setPagination, setFilters, sortProducts, resetFilters } =
  productsSlice.actions;
export default productsSlice.reducer;
