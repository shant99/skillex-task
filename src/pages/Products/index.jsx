/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setPagination,
} from "../../store/features/productsSlice";
import Pagination from "../../components/shared/Pagination";
import { Loading, Search } from "../../components/shared";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProductsSection from "../../components/shared/ProductsSection";

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, limit, filters, isLoading, products, total } = useSelector(
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
      {isLoading ? (
        <Loading text={t("loading_products")} />
      ) : (
        <ProductsSection products={products} />
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
