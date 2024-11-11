export const getProductsByPriceRange = (products, filters) => {
  return products.filter(
    (product) =>
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
  );
};

export const getProductsByCategory = (products, filters) => {
  return products.filter((product) => product.category === filters.category);
};

export const getProductsByRating = (products, filters) => {
  return products.filter((product) => product.rating >= filters.rating);
};

export const getProductsByBrand = (products, filters) => {
  return products.filter((product) => product.brand === filters.brand);
};
