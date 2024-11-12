/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Filters,
  Loading,
  Pagination,
  ProductsSection,
  Search,
} from "../../components/shared";
import { useTranslation } from "react-i18next";
import { fetchProducts } from "../../store/thunks/fetchProducts";

const Products = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { page, limit, isLoading } = useSelector((state) => state.products);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      dispatch(fetchProducts({ page, limit }));
    });
  }, []);

  return (
    <>
      <Search />
      <Filters />
      {isPending || isLoading ? (
        <Loading text={t("loading_products")} />
      ) : (
        <>
          <ProductsSection />
          <Pagination />
        </>
      )}
    </>
  );
};

export default React.memo(Products);
