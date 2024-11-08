import generateProducts from "../utils/generateProducts";
import { getPaginatedProducts } from "../utils/pagination";

describe("Pagination function tests", () => {
  const filteredProducts = generateProducts(5);

  const runPaginationTest = (page, limit, expectedResult) => {
    const paginated = getPaginatedProducts(filteredProducts, page, limit);
    expect(paginated).toEqual(expectedResult);
  };

  it("should paginate products correctly with limit 2", () => {
    runPaginationTest(1, 2, [
      { id: 3, name: "Product 3" },
      { id: 4, name: "Product 4" },
    ]);
  });

  it("should return correct products for the first page with limit 2", () => {
    runPaginationTest(0, 2, [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ]);
  });

  it("should return correct products for the last page", () => {
    runPaginationTest(2, 2, [{ id: 5, name: "Product 5" }]);
  });

  it("should return empty array when page is out of bounds", () => {
    runPaginationTest(3, 2, []);
  });

  it("should handle pagination with large number of products", () => {
    const largeProductList = Array.from({ length: 500 }, (_, index) => ({
      id: index + 1,
      name: `Product ${index + 1}`,
    }));

    const paginated = getPaginatedProducts(largeProductList, 49, 10);

    expect(paginated).toEqual([
      { id: 491, name: "Product 491" },
      { id: 492, name: "Product 492" },
      { id: 493, name: "Product 493" },
      { id: 494, name: "Product 494" },
      { id: 495, name: "Product 495" },
      { id: 496, name: "Product 496" },
      { id: 497, name: "Product 497" },
      { id: 498, name: "Product 498" },
      { id: 499, name: "Product 499" },
      { id: 500, name: "Product 500" },
    ]);
  });
});
