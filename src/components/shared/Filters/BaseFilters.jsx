import { useDispatch, useSelector } from "react-redux";
import SortDropdown from "./SortDropdown";
import "./styles.css";
import {
  resetFilters,
  setFilters,
  setPagination,
  sortProducts,
} from "../../../store/features/productsSlice";
import FilterByRating from "./FilterByRating";
import { ResetIcon } from "../../icons";
import FilterByBrand from "./FilterByBrand";
import FilterByCategory from "./FilterByCategory";
import "rc-slider/assets/index.css";
import FilterByPriceRange from "./FilterByPriceRange";
import { useTranslation } from "react-i18next";
import { fetchProducts } from "../../../store/thunks/fetchProducts";

const BaseFilters = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { filters } = useSelector((state) => state.products);

  const updateFilter = (newFilter) => {
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, ...newFilter }));
    dispatch(fetchProducts({ page: 0, limit: 10 }));
  };

  const handleBrandChange = (brand) => updateFilter({ brand });
  const handleRatingChange = (rating) => updateFilter({ rating });
  const handleCategoryChange = (category) => updateFilter({ category });

  const resetFiltersHandler = () => {
    dispatch(resetFilters());
    dispatch(fetchProducts({ page: 0, limit: 10 }));
  };

  const sortHandler = (sortOption) => {
    const [field, order] = Object.entries(sortOption)[0];
    dispatch(sortProducts(`${field}_${order}`));
    dispatch(setFilters({ ...filters, sort: `${field}_${order}` }));
  };

  return (
    <>
      <div className="filters-wrapper">
        <FilterByRating onRatingChange={handleRatingChange} />
        <FilterByBrand onBrandChange={handleBrandChange} />
        <FilterByCategory onCategoryChange={handleCategoryChange} />
        <FilterByPriceRange />
      </div>
      <SortDropdown onSortChange={sortHandler} />
      <button className="reset-button" onClick={resetFiltersHandler}>
        <span>{t("reset_filters")}</span>
        <ResetIcon className="reset-button-icon" size={24} />
      </button>
    </>
  );
};

export default BaseFilters;
