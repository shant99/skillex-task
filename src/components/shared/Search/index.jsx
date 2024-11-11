/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "../../icons";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  setPagination,
} from "../../../store/features/productsSlice";
import { fetchProducts } from "../../../store/thunks/fetchProducts";
import { debounce } from "../../../utils/debounce";

const Search = ({ placeholder = "Search" }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState(filters.search || "");

  const debouncedSearch = useCallback(
    debounce((value) => {
      dispatch(setFilters({ search: value }));
      dispatch(fetchProducts({ page: 0, limit: 10 }));
      dispatch(setPagination({ page: 0, limit: 10 }));
    }, 700),
    [dispatch]
  );

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    if (!filters.search) {
      setSearchQuery("");
    }
  }, [filters.search]);

  return (
    <div className="search-wrapper">
      <div className="search-input-container">
        <SearchIcon />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
};

export default Search;
