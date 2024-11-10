/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { SearchIcon } from "../../icons";
import "./styles.css";
import useDebounce from "../../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import {
  fetchProducts,
  setFilters,
  setPagination,
} from "../../../store/features/productsSlice";

const Search = ({ placeholder = "Search", defaultSearch }) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(defaultSearch);
  const debouncedSearchQuery = useDebounce(searchQuery, 700);

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, limit: 10 }));
    dispatch(setPagination({ page: 0, limit: 10 }));
    dispatch(setFilters({ search: debouncedSearchQuery }));
  }, [debouncedSearchQuery]);

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
