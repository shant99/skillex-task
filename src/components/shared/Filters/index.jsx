import "./styles.css";
import { CloseIcon, FiltersIcon } from "../../icons";
import { useState } from "react";
import BaseFilters from "./BaseFilters";

const Filters = () => {
  const [isFiltersVisible, setFiltersVisible] = useState(false);
  const toggleFilters = () => {
    setFiltersVisible((prev) => !prev);
  };

  const closeFilters = () => {
    setFiltersVisible(false);
  };

  return (
    <div>
      <div className="desktop-filters">
        <BaseFilters />
      </div>

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
          <div className="filters-content">
            <BaseFilters />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
