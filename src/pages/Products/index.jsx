import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/features/productsSlice";
import { PAGINATION_DEFAULT } from "../../config/constants";
import ProductCard from "../../components/shared/ProductCard";
import "./styles.css";
import { BeatLoader } from "react-spinners";
import { Pagination } from "../../components/shared";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status, isLoading, total } = useSelector(
    (state) => state.products
  );

  const onPageChange = (page, limit) => {
    dispatch(fetchProducts({ page: page - 1, limit, filters: {} }));
  };

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
            <ProductCard
              key={`${product.id}_${product.brand}`}
              product={product}
            />
          ))}
        </div>
      )}
      <Pagination totalItems={total} onPageChange={onPageChange} />
    </div>
  );
};

export default Products;
