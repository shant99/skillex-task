/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import {
  setFilters,
  setPagination,
} from "../../../../store/features/productsSlice";
import { fetchProducts } from "../../../../store/thunks/fetchProducts";
import { debounce } from "../../../../utils/debounce";

const FilterByPriceRange = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [showSlider, setShowSlider] = useState(false);
  const [range, setRange] = useState([
    filters?.priceRange?.[0] || 0,
    filters?.priceRange?.[1] || 1000,
  ]);

  const debouncedPriceRange = useCallback(
    debounce((value) => {
      dispatch(setFilters({ priceRange: value }));
      dispatch(fetchProducts({ page: 0, limit: 10 }));
      dispatch(setPagination({ page: 0, limit: 10 }));
    }, 700),
    [dispatch]
  );

  const handleSliderChange = (value) => {
    setRange(value);
    debouncedPriceRange(value);
  };

  const handleToggleSlider = () => {
    setShowSlider(!showSlider);
  };
  useEffect(() => {
    if (!filters.priceRange) {
      setRange([0, 1000]);
    }
  }, [filters.priceRange]);
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
