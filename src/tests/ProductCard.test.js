import { render, screen } from "@testing-library/react";
import ProductCard from "../components/shared/ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    name: "Wireless Headphones",
    category: "Electronics",
    brand: "BrandName",
    price: 199.99,
    rating: 4.5,
    imageUrl: "https://example.com/images/headphones.jpg",
  };

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    // Check if the product image is rendered
    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute("src", mockProduct.imageUrl);

    // Check if the product name is rendered
    const name = screen.getByText(mockProduct.name);
    expect(name).toBeInTheDocument();

    // Check if the product category is rendered
    const category = screen.getByText(`Category: ${mockProduct.category}`);
    expect(category).toBeInTheDocument();

    // Check if the product brand is rendered
    const brand = screen.getByText(`Brand: ${mockProduct.brand}`);
    expect(brand).toBeInTheDocument();

    // Check if the product price is rendered correctly
    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toBeInTheDocument();

    // Check if the product rating is rendered
    const rating = screen.getByText(`Rating: ${mockProduct.rating} ★`);
    expect(rating).toBeInTheDocument();

    // Check if the "Add to Cart" button is rendered
    const addToCartButton = screen.getByText(/Add to Cart/i);
    expect(addToCartButton).toBeInTheDocument();
  });

  it("displays the correct product price format", () => {
    render(<ProductCard product={mockProduct} />);

    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toHaveTextContent(`$199.99`);
  });
});
