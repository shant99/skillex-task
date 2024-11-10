/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/features/productsSlice";
import {
  Filters,
  Loading,
  Pagination,
  ProductsSection,
  Search,
} from "../../components/shared";
import { useTranslation } from "react-i18next";

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, limit, filters, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }));
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
      <Pagination />
    </>
  );
};

export default React.memo(Products);
