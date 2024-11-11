import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedProducts } from "../../utils/pagination";
import searchByString from "../../utils/searchByString";
import { sortData } from "../../utils/sortProducts";
import {
  getProductsByBrand,
  getProductsByCategory,
  getProductsByPriceRange,
  getProductsByRating,
} from "../../utils/filtersProducts";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit }, thunkAPI) => {
    const state = thunkAPI.getState();
    try {
      const response = await fetch("/data/products.json");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      let filters = state.products.filters;

      const data = await response.json();
      let filteredProducts = data;

      if (filters.search) {
        filteredProducts = searchByString(filteredProducts, filters.search);
      }

      if (filters.rating) {
        filteredProducts = getProductsByRating(filteredProducts, filters);
      }

      if (filters.brand) {
        filteredProducts = getProductsByBrand(filteredProducts, filters);
      }

      if (filters.category) {
        filteredProducts = getProductsByCategory(filteredProducts, filters);
      }

      if (filters.priceRange) {
        filteredProducts = getProductsByPriceRange(filteredProducts, filters);
      }

      localStorage.setItem("pagination", JSON.stringify({ page, limit }));
      localStorage.setItem("filters", JSON.stringify(filters));

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
