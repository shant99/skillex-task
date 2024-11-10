import { useDispatch } from "react-redux";
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
import { CloseIcon, FiltersIcon, ResetIcon } from "../../icons";
import FilterByBrand from "./FilterByBrand";
import FilterByCategory from "./FilterByCategory";
import "rc-slider/assets/index.css";
import FilterByPriceRange from "./FilterByPriceRange";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Filters = ({ filters }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const updateFilter = (newFilter) => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, ...newFilter }));
  };

  const handleBrandChange = (brand) => updateFilter({ brand });
  const handleRatingChange = (rating) => updateFilter({ rating });
  const handleCategoryChange = (category) => updateFilter({ category });
  const handlePriceRange = (priceRange) => updateFilter({ priceRange });

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

  const [isFiltersVisible, setFiltersVisible] = useState(false);

  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  const closeFilters = () => {
    setFiltersVisible(false);
  };

  const flt = () => (
    <>
      <div className="filters-wrapper">
        <FilterByRating onRatingChange={handleRatingChange} />
        <FilterByBrand onBrandChange={handleBrandChange} />
        <FilterByCategory onCategoryChange={handleCategoryChange} />
        <FilterByPriceRange onPriceRangeChange={handlePriceRange} />
      </div>
      <SortDropdown onSortChange={sortHandler} />
      <button className="reset-button" onClick={resetFiltersHandler}>
        <span>{t("reset_filters")}</span>
        <ResetIcon className="reset-button-icon" size={24} />
      </button>
    </>
  );

  return (
    <div>
      <div className="desktop-filters">{flt()}</div>

      <div className="mobile-filters-wrapper">
        <div className="filters-icon-wrapper">
          <FiltersIcon className="filters-icon" onClick={toggleFilters} />
        </div>

        <div className={`mobile-filters ${isFiltersVisible ? "active" : ""}`}>
          <div className="close-filters-btn_wrapper">
            <button className="close-filters-btn" onClick={closeFilters}>
              Close Filters
              <CloseIcon />
            </button>
          </div>
          <div className="filters-content">{flt()}</div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
