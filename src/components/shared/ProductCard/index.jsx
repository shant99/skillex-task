import React from "react";
import "./styles.css";

const ProductCard = ({ product }) => {
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
            <span>Category:</span> {product.category}
          </p>
          <p className="product-brand">
            <span>Brand:</span> {product.brand}
          </p>
          <div className="rating-price-wrapper">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-rating">
              <span>Rating:</span> <span>{product.rating}</span>
              <span>★</span>{" "}
            </p>
          </div>
        </div>
      </>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
