import React, { useEffect, useState } from "react";
import "./sortDropdown.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const SortDropdown = ({ onSortChange }) => {
  const { t } = useTranslation();
  const { filters } = useSelector((state) => state.products);
  const [selectedOption, setSelectedOption] = useState(filters.sort);

  const SORT_OPTIONS = [
    { label: t("sort_products"), value: "no_sort" },
    { label: t("price_asc"), value: "price_asc" },
    { label: t("price_desc"), value: "price_desc" },
    { label: t("rating_asc"), value: "rating_asc" },
    { label: t("rating_desc"), value: "rating_desc" },
    { label: t("popularity_asc"), value: "popularity_asc" },
    { label: t("popularity_desc"), value: "popularity_desc" },
  ];

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "no_sort") {
      onSortChange({});
    } else {
      const [field, order] = selectedValue.split("_");
      onSortChange({ [field]: order });
    }
  };

  useEffect(() => {
    if (!filters.sort) {
      setSelectedOption("no_sort");
    }
  }, [filters.sort]);

  return (
    <div className="sort-dropdown">
      <select
        value={selectedOption}
        onChange={handleSelectChange}
        className="sort-select"
      >
        {SORT_OPTIONS.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.value === "no_sort"}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown;
