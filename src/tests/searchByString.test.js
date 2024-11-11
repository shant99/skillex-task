import searchByString from "../utils/searchByString";

describe("searchByString", () => {
  const products = [
    { id: 1, name: "Product 1", category: "Electronics", brand: "Brand A" },
    { id: 2, name: "Product 2", category: "Clothing", brand: "Brand B" },
    { id: 3, name: "Product 3", category: "Electronics", brand: "Brand C" },
    { id: 4, name: "Product 4", category: "Toys", brand: "Brand A" },
    { id: 5, name: "Product 5", category: "Electronics", brand: "Brand B" },
  ];

  it("should return products that match the search string in the name", () => {
    const searchString = "product 1";
    const result = searchByString(products, searchString);

    expect(result).toEqual([
      { id: 1, name: "Product 1", category: "Electronics", brand: "Brand A" },
    ]);
  });

  it("should return products that match the search string in the category", () => {
    const searchString = "electronics";
    const result = searchByString(products, searchString);

    expect(result).toEqual([
      { id: 1, name: "Product 1", category: "Electronics", brand: "Brand A" },
      { id: 3, name: "Product 3", category: "Electronics", brand: "Brand C" },
      { id: 5, name: "Product 5", category: "Electronics", brand: "Brand B" },
    ]);
  });

  it("should return products that match the search string in the brand", () => {
    const searchString = "brand a";
    const result = searchByString(products, searchString);

    expect(result).toEqual([
      { id: 1, name: "Product 1", category: "Electronics", brand: "Brand A" },
      { id: 4, name: "Product 4", category: "Toys", brand: "Brand A" },
    ]);
  });

  it("should return products that match the search string in either name, category, or brand", () => {
    const searchString = "brand b";
    const result = searchByString(products, searchString);

    expect(result).toEqual([
      { id: 2, name: "Product 2", category: "Clothing", brand: "Brand B" },
      { id: 5, name: "Product 5", category: "Electronics", brand: "Brand B" },
    ]);
  });

  it("should return an empty array if no products match the search string", () => {
    const searchString = "nonexistent";
    const result = searchByString(products, searchString);

    expect(result).toEqual([]);
  });

  it("should be case-insensitive for all fields", () => {
    const searchString = "ELECTRONICS";
    const result = searchByString(products, searchString);

    expect(result).toEqual([
      { id: 1, name: "Product 1", category: "Electronics", brand: "Brand A" },
      { id: 3, name: "Product 3", category: "Electronics", brand: "Brand C" },
      { id: 5, name: "Product 5", category: "Electronics", brand: "Brand B" },
    ]);
  });
});
