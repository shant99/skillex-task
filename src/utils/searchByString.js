function searchByString(products, searchString) {
  const lowercasedSearch = searchString.trim().toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercasedSearch) ||
      product.category.toLowerCase().includes(lowercasedSearch) ||
      product.brand.toLowerCase().includes(lowercasedSearch)
  );
}

export default searchByString;
