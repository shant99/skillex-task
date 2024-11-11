import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ProductsSection } from "../components/shared";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockReducer = (
  state = { products: { products: [], total: 0 } },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};

describe("ProductsSection Component", () => {
  it("renders product list when there are products", () => {
    const store = configureStore({
      reducer: {
        products: mockReducer,
      },
      preloadedState: {
        products: {
          products: [
            {
              id: 1,
              name: "Product 1",
              brand: "Brand 1",
              category: "Category 1",
              price: 100,
              imageUrl: "/path1",
              rating: 4.5,
            },
            {
              id: 2,
              name: "Product 2",
              brand: "Brand 2",
              category: "Category 2",
              price: 200,
              imageUrl: "/path2",
              rating: 4.0,
            },
          ],
          total: 2,
        },
      },
    });

    render(
      <Provider store={store}>
        <ProductsSection />
      </Provider>
    );

    expect(screen.getAllByText(/Product /i)).toHaveLength(2);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("renders 'no products found' message when there are no products", () => {
    const store = configureStore({
      reducer: {
        products: mockReducer,
      },
      preloadedState: {
        products: {
          products: [],
          total: 0,
        },
      },
    });

    render(
      <Provider store={store}>
        <ProductsSection />
      </Provider>
    );

    expect(screen.getByText("no_products_found")).toBeInTheDocument();
  });
});
