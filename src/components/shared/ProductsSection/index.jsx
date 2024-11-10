import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { NotFoundIcon } from "../../icons";

const ProductsSection = () => {
  const { products, total } = useSelector((state) => state.products);
  const { t } = useTranslation();
  return total ? (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={`${product.id}_${product.brand}`} product={product} />
      ))}
    </div>
  ) : (
    <div className="no-products-found">
      <NotFoundIcon />
      {t("no_products_found")}
    </div>
  );
};

export default ProductsSection;
