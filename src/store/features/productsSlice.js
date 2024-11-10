import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedProducts } from "../../utils/pagination";
import searchByString from "../../utils/searchByString";
import { savedFilters, savedPagination } from "../../utils/localStorage";
import { sortData } from "../../utils/sortProducts";

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
    sort: savedFilters.sort || "no_sort",
    rating: savedFilters.rating || "0",
    brand: savedFilters.brand || "",
    category: savedFilters.category || "",
    priceRange: savedFilters.priceRange || [0, 1000],
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
      // ------

      if (filters.rating) {
        filteredProducts = filteredProducts.filter(
          (product) => product.rating >= filters.rating
        );
      }

      if (filters.brand) {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand === filters.brand
        );
      }

      if (filters.category) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filters.category
        );
      }

      if (filters.priceRange) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= filters.priceRange[0] &&
            product.price <= filters.priceRange[1]
        );
      }

      localStorage.setItem(
        "pagination",
        JSON.stringify({ page: 0, limit: 10 })
      );
      localStorage.setItem("filters", JSON.stringify(filters));
      // --------

      let paginatedProducts = getPaginatedProducts(
        filteredProducts,
        page,
        limit
      );

      if (filters.sort) {
        paginatedProducts = sortData(paginatedProducts, filters.sort);
      }

      return {
        products: paginatedProducts,
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
    resetFilters: (state) => {
      state.filters = {};
    },
    sortProducts: (state, action) => {
      localStorage.setItem(
        "filters",
        JSON.stringify({ ...state.filters, sort: action.payload })
      );
      state.products = sortData(state.products, action.payload);
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
