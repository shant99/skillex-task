import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/features/productsSlice";
import { PAGINATION_DEFAULT } from "../../config/constants";
import ProductCard from "../../components/shared/ProductCard";
import "./styles.css";
import { BeatLoader } from "react-spinners";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, isLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ ...PAGINATION_DEFAULT, filters: {} }));
  }, [dispatch]);

  if (status === "failed") {
    return <div>Modal</div>;
  }

  return (
    <div>
      {isLoading ? (
        <div className="loading">
          Products Loading <BeatLoader />
        </div>
      ) : (
        <div className="product-list">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
