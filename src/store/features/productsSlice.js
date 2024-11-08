import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedProducts, getTotalPage } from "../../utils/pagination";

const initialState = {
  products: [],
  status: "idle",
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  totalPages: 0,
  filters: {},
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit, filters }, thunkAPI) => {
    try {
      const response = await fetch("/data/products.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      let filteredProducts = data;

      // Filter by category
      //   if (filters.category) {
      //     filteredProducts = filteredProducts.filter(
      //       (product) => product.category === filters.category
      //     );
      //   }

      return {
        products: getPaginatedProducts(filteredProducts, page, limit),
        totalPages: getTotalPage(filteredProducts.length, limit),
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
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
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
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setPage, setLimit, setFilters } = productsSlice.actions;
export default productsSlice.reducer;
