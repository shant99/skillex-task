import React, { useEffect, useState } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const FilterByCategory = ({ onCategoryChange }) => {
  const { t } = useTranslation();
  const { filters } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(filters.category);

  const categoryOptions = [
    { value: "", label: t("filter_by_category"), disabled: true },
    { value: "Electronics", label: "Electronics" },
    { value: "Footwear", label: "Footwear" },
    { value: "Clothing", label: "Clothing" },
  ];

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory); // Notify parent component about the category selection
    setSelectedCategory(selectedCategory); // Update the local state
  };

  useEffect(() => {
    if (!filters.rating) {
      setSelectedCategory("");
    }
  }, [filters.rating]);

  return (
    <div className="category-filter">
      <div className="category-dropdown">
        <select
          id="category"
          className="category-select"
          value={selectedCategory}
          onChange={handleChange}
        >
          {categoryOptions.map((option) => (
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

export default FilterByCategory;
