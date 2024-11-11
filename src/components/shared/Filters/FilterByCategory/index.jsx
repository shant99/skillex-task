import React, { useEffect, useState } from "react";
import "./styles.css";
import { useSelector } from "react-redux";

const FilterByCategory = ({ onCategoryChange }) => {
  const { filters } = useSelector((state) => state.products);
  const [selectedCategory, setSelectedCategory] = useState(filters.category);

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Electronics", label: "Electronics" },
    { value: "Footwear", label: "Footwear" },
    { value: "Clothing", label: "Clothing" },
  ];

  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    onCategoryChange(selectedCategory);
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    if (!filters.category) {
      setSelectedCategory("");
    }
  }, [filters.category]);

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
              key={option.label}
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
