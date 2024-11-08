import { render, screen } from "@testing-library/react";
import ProductCard from "../components/shared/ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    name: "Wireless Headphones",
    category: "Electronics",
    brand: "BrandName",
    price: 199.99,
    rating: 4.5,
    imageUrl: "/images/headphones.jpg",
  };

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute("src", mockProduct.imageUrl);

    const name = screen.getByText(mockProduct.name);
    expect(name).toBeInTheDocument();

    const category = screen.getByText(`Category: ${mockProduct.category}`);
    expect(category).toBeInTheDocument();

    const brand = screen.getByText(`Brand: ${mockProduct.brand}`);
    expect(brand).toBeInTheDocument();

    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toBeInTheDocument();

    const rating = screen.getByText(`Rating: ${mockProduct.rating} ★`);
    expect(rating).toBeInTheDocument();

    const addToCartButton = screen.getByText(/Add to Cart/i);
    expect(addToCartButton).toBeInTheDocument();
  });

  it("displays the correct product price format", () => {
    render(<ProductCard product={mockProduct} />);

    const price = screen.getByText(`$${mockProduct.price.toFixed(2)}`);
    expect(price).toHaveTextContent(`$199.99`);
  });
});
