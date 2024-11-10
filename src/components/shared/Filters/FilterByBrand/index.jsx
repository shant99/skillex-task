import React, { useEffect, useState } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const FilterByBrand = ({ onBrandChange }) => {
  const { t } = useTranslation();
  const { filters } = useSelector((state) => state.products);
  const [selectedBrand, setSelectedBrand] = useState(filters.brand);

  const brandOptions = [
    { value: "", label: t("filter_by_brand"), disabled: true },
    { value: "Brand A", label: "Brand A" },
    { value: "Brand B", label: "Brand B" },
    { value: "Brand C", label: "Brand C" },
    { value: "Brand D", label: "Brand D" },
    { value: "Brand E", label: "Brand E" },
  ];

  const handleChange = (e) => {
    const selectedBrand = e.target.value;
    onBrandChange(selectedBrand);
    setSelectedBrand(selectedBrand);
  };

  useEffect(() => {
    if (!filters.rating) {
      setSelectedBrand("");
    }
  }, [filters.rating]);

  return (
    <div className="brand-filter">
      <div className="brand-dropdown">
        <select
          id="brand"
          className="brand-select"
          value={selectedBrand}
          onChange={handleChange}
        >
          {brandOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterByBrand;
