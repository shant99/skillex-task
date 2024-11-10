/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setPagination,
} from "../../store/features/productsSlice";
import Pagination from "../../components/shared/Pagination";
import {
  Filters,
  Loading,
  ProductsSection,
  Search,
} from "../../components/shared";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, limit, filters, isLoading, total } = useSelector(
    (state) => state.products
  );

  const handlePageChange = (pageNum, limitNum) => {
    dispatch(fetchProducts({ page: pageNum - 1, limit: limitNum, filters }));
    dispatch(setPagination({ page: pageNum - 1, limit: limitNum }));
    localStorage.setItem(
      "pagination",
      JSON.stringify({ page: pageNum - 1, limit: limitNum })
    );
  };

  useEffect(() => {
    dispatch(fetchProducts({ page: 0, limit }));
  }, []);

  return (
    <>
      <Search defaultSearch={filters.search} />
      <Filters filters={filters} />
      {isLoading ? (
        <Loading text={t("loading_products")} />
      ) : (
        <ProductsSection />
      )}
      <Pagination
        totalItems={total}
        onPageChange={handlePageChange}
        defaultPage={page + 1}
        defaultLimit={limit}
      />
    </>
  );
};

export default React.memo(Products);
