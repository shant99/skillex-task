import { useEffect, useState } from "react";
import "./styles.css";
import generatePageNumbers from "../../../utils/generatePageNumbers";

const Pagination = ({
  totalItems,
  onPageChange,
  defaultPage,
  defaultLimit,
}) => {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [itemsPerPage, setItemsPerPage] = useState(defaultLimit);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page, itemsPerPage);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    onPageChange(1, newItemsPerPage);
  };

  if (!totalItems) return null;

  return (
    <div className="pagination-container">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        &lt;
      </button>

      {generatePageNumbers(totalPages, currentPage).map((number) => (
        <button
          key={number}
          disabled={number === currentPage}
          onClick={() => handlePageChange(number)}
          className={`pagination-button ${
            number === currentPage ? "active" : ""
          }`}
        >
          {number}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        &gt;
      </button>

      <select
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
        className="pagination-select"
      >
        {[10, 20, 30, 50].map((size) => (
          <option key={size} value={size}>
            {size} / page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
