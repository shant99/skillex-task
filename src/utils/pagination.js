export const getTotalPage = (count, limit) => Math.ceil(count / limit);

export const getPaginatedProducts = (products, page, limit) => {
  const startIndex = page * limit;
  const endIndex = startIndex + limit;
  return products.slice(startIndex, endIndex);
};
