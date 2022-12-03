import React, { useEffect } from "react";
// import { products } from "../../data";
import Product from "../../components/Product/Product";
import Headers from "../../components/Indicators";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/actions/productActions";
import Loading from "../../components/Loading/Loading";
import Load from "../../components/Loading/Load";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.allProducts
  );
  const allProducts =
    products && products.filter((product) => product.inStock > 0);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="w-full">
      <Headers title="Latest products" to="/shop" />
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-center text-sm text-gray-500 font-light flex items-center justify-center space-x-3">
          <span>0 items found</span>
        </p>
      ) : allProducts && allProducts.length ? (
        <div className="grid gap-5 lg:grid-cols-4 md:grid-cols-3 xs:grid-cols-1 ">
          {allProducts.map((product) => (
            <Product key={product.productId} pro={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500 font-light flex items-center justify-center space-x-3">
          <span>0 items found</span>
        </p>
      )}
    </div>
  );
};

export default Products;
