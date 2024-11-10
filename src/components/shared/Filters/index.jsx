import { useDispatch, useSelector } from "react-redux";
import SortDropdown from "./SortDropdown";
import "./styles.css";
import {
  fetchProducts,
  resetFilters,
  setFilters,
  setPagination,
  sortProducts,
} from "../../../store/features/productsSlice";
import FilterByRating from "./FilterByRating";
import { ResetIcon } from "../../icons";
import FilterByBrand from "./FilterByBrand";
import FilterByCategory from "./FilterByCategory";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import FilterByPriceRange from "./FilterByPriceRange";

const Filters = ({ filters }) => {
  const dispatch = useDispatch();

  const handleBrandChange = (brand) => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, brand }));
  };

  const handleRatingChange = (rating) => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, rating }));
  };

  const handleCategoryChange = (category) => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, category }));
  };

  const handlePriceRange = (priceRange) => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, priceRange }));
  };

  const resetFiltersHandler = () => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(resetFilters());
  };

  const sortHandler = (sortOption) => {
    const [field, order] = Object.entries(sortOption)[0];
    dispatch(sortProducts(`${field}_${order}`));
    dispatch(setFilters({ ...filters, sort: `${field}_${order}` }));
  };

  return (
    <div>
      <div className="filters-wrapper">
        <FilterByRating onRatingChange={handleRatingChange} />
        <FilterByBrand onBrandChange={handleBrandChange} />
        <FilterByCategory onCategoryChange={handleCategoryChange} />
        <FilterByPriceRange onPriceRangeChange={handlePriceRange} />
      </div>
      <SortDropdown onSortChange={sortHandler} />
      <button className="reset-button" onClick={resetFiltersHandler}>
        <span>Reset filters</span>
        <ResetIcon className="reset-button-icon" size={24} />
      </button>
    </div>
  );
};

export default Filters;
