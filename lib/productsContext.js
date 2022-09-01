import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
const ProductsContext = createContext({});
export function useProducts() {
  return useContext(ProductsContext);
}
export function ProductsProvider({ children }) {
  const [products, setProducts] = useLocalStorage("products", []);
  async function getProducts() {
    if (products.length === 0) {
      const res = await fetch("/api/rest/WebSite/Shop", {
        method: "POST",
        body: JSON.stringify({
          LoginToken: "",
        }),
      });
      const data = await res.json();
      const prds = data.Shop;

      setProducts(prds);
      return prds;
    }
    return products;
  }
  function getPayments() {
    return products.payments;
  }
  function getProduct(productId) {
    return products.products.find((product) => product.id === productId);
  }
  function getPayment(paymentId) {
    return products.payments.find((payment) => payment.id === payment);
  }
  return (
    <ProductsContext.Provider
      value={{ products, getProducts, getProduct, getPayment, getPayments }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
