import { render, screen } from "@testing-library/react";
import ProductCard from "../components/shared/ProductCard";

jest.spyOn(console, "error").mockImplementation((msg) => {
  if (msg.includes("ReactDOMTestUtils.act")) return;
  console.error(msg);
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

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

    expect(screen.getByText(`category:`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();

    expect(screen.getByText(`brand:`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();

    expect(
      screen.getByText(`$${mockProduct.price.toFixed(2)}`)
    ).toBeInTheDocument();

    expect(screen.getByText(`rating:`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.rating.toString())).toBeInTheDocument();

    const addToCartButton = screen.getByText("add_to_card");
    expect(addToCartButton).toBeInTheDocument();
  });
});
