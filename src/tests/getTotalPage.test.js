import generateProducts from "../utils/generateProducts";
import { getTotalPage } from "../utils/pagination";

describe("Pagination tests", () => {
  it("should return correct number of pages with limit 2", () => {
    const filteredProducts = generateProducts(5);
    const limit = 2;

    const totalPages = getTotalPage(filteredProducts.length, limit);
    expect(totalPages).toBe(3);
  });

  it("should handle empty product list", () => {
    const filteredProducts = [];
    const limit = 2;

    const totalPages = getTotalPage(filteredProducts.length, limit);
    expect(totalPages).toBe(0);
  });

  it("should handle limit greater than product count", () => {
    const filteredProducts = generateProducts(1);
    const limit = 10;

    const totalPages = getTotalPage(filteredProducts.length, limit);
    expect(totalPages).toBe(1);
  });

  it("should correctly calculate total pages for large dataset", () => {
    const filteredProducts = generateProducts(500);
    const limit = 10;

    const totalPages = getTotalPage(filteredProducts.length, limit);
    expect(totalPages).toBe(50);
  });
});
