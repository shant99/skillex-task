import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFiltersFromLocalStorage,
  saveFiltersToLocalStorage,
} from "../utils/localStorage";
import { setFilters } from "../store/features/productsSlice";

const useFilters = () => {
  // const dispatch = useDispatch();
  // const { filters } = useSelector((state) => state.products);
  // useEffect(() => {
  //   const savedFilters = loadFiltersFromLocalStorage();
  //   console.log(savedFilters, "savedFilters");
  //   if (savedFilters) {
  //     dispatch(setFilters(savedFilters));
  //   }
  // }, [dispatch]);
  // useEffect(() => {
  //   saveFiltersToLocalStorage(filters);
  // }, [filters]);
};

export default useFilters;
