import ProductCard from "../ProductCard";
import "./styles.css";

const ProductsSection = ({ products = [] }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={`${product.id}_${product.brand}`} product={product} />
      ))}
    </div>
  );
};

export default ProductsSection;
