/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Slider from "rc-slider"; // Import rc-slider
import "rc-slider/assets/index.css"; // Import the CSS for rc-slider
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import useDebounce from "../../../../hooks/useDebounce";
import {
  fetchProducts,
  setFilters,
  setPagination,
} from "../../../../store/features/productsSlice";

const FilterByPriceRange = ({ onPriceRangeChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [showSlider, setShowSlider] = useState(false);
  const [range, setRange] = useState([
    filters?.priceRange?.[0] || 0,
    filters?.priceRange?.[1] || 1000,
  ]);

  const debouncedRange = useDebounce(range, 1500);
  console.log("----");
  useEffect(() => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ ...filters, priceRange: debouncedRange }));
  }, [debouncedRange]);

  const handleSliderChange = (value) => {
    setRange(value);
    if (onPriceRangeChange) {
      onPriceRangeChange({ minPrice: value[0], maxPrice: value[1] });
    }
  };

  const handleToggleSlider = () => {
    setShowSlider(!showSlider);
  };

  useEffect(() => {
    if (!filters.priceRange) {
      setRange([filters.minPrice || 0, filters.maxPrice || 1000]);
    }
  }, [filters.maxPrice, filters.minPrice, filters.priceRange]);

  return (
    <div className="price-range-filter">
      <div className="price-dropdown">
        <button
          type="button"
          onClick={handleToggleSlider}
          className="price-dropdown-btn"
        >
          {t("filter_by_price")}
        </button>
        {showSlider && (
          <div className="slider-container">
            <Slider
              range
              value={range}
              min={0}
              max={2000}
              onChange={handleSliderChange}
              step={1}
            />
            <div className="price-labels">
              <span>${range[0]}</span> - <span>${range[1]}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterByPriceRange;
