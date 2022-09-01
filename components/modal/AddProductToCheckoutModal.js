import { useEffect, useRef, useState } from "react";

import Loader from "../utils/Loader";

import { cartState, saveState } from "../../lib/cartContext";

import ProductCard from "../checkout/ProductCard";
import { useProducts } from "../../lib/productsContext";
export default function AddProductToCheckoutModal({
  setIsAddProductModalOpen,
}) {
  const { cState, dispatch } = cartState();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { getProducts, getPayments } = useProducts();
  useEffect(() => {
    setIsLoading(true);

    const loadProducts = async () => {
      const prds = await getProducts();
      console.log("prds", prds);
      setProducts(prds);
      setIsLoading(false);
    };
    loadProducts();

    console.log("AddProductToCheckoutModal mounted");
    return () => {
      console.log("AddProductToCheckoutModal unmounted");
    };
  }, []);

  return (
    <div className="add_product_wrapper flex-center-center-column">
      <style jsx>{`
        .add_product_wrapper {
        }

        .add_product-title {
          font-size: 1.38rem;
          font-weight: 400;
          color: var(--clr-neutral-800);
        }
        .add_product-subtitle {
          font-size: 1rem;
          color: var(--clr-neutral-700);
        }
        .products {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
          grid-template-rows: auto;
          grid-gap: 1.3em;
          padding: 1.3em;
        }
      `}</style>
      <h2 className="add_product-title">Add Product</h2>
      <p className="add_product-subtitle">
        Choose a product to add to your installment paln
      </p>
      {!isLoading ? (
        <div className="products">
          {products.products.map((product, index) => {
            if (product.visible) {
              return (
                <ProductCard
                  key={index + product.id}
                  paymentPlans={products.payments}
                  paymentTaxes={products.paymentTaxes}
                  index={index}
                  product={product}
                  setIsAddProductModalOpen={setIsAddProductModalOpen}
                />
              );
            }
          })}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
