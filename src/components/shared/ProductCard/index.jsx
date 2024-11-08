import React from "react";
import "./styles.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-category">Category: {product.category}</p>
        <p className="product-brand">Brand: {product.brand}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-rating">Rating: {product.rating} ★</p>
      </div>
      <button className="add-to-cart">Add to Cart</button>
    </div>
  );
};

export default ProductCard;
