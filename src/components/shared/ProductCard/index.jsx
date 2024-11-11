import React from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
  const { t } = useTranslation();

  return (
    <div className="product-card">
      <>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        <div className="product-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-category">
            <span>{t("category")}:</span> {product.category}
          </p>
          <p className="product-brand">
            <span>{t("brand")}:</span> {product.brand}
          </p>
          <div className="rating-price-wrapper">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-rating">
              <span>{t("rating")}:</span> <span>{product.rating}</span>
              <span>★</span>{" "}
            </p>
          </div>
        </div>
      </>
      <button className="add-to-cart">{t("add_to_card")}</button>
    </div>
  );
};

export default ProductCard;
