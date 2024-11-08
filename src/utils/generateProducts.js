const generateProducts = (count) =>
  Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
  }));

export default generateProducts;
