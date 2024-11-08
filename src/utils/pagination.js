export const getPaginatedProducts = (products, page, limit) => {
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  return products.slice(startIndex, endIndex);
};
