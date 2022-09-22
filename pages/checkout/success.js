import { useEffect, useRef } from "react";
import Link from "next/link";
import { cartState } from "../../lib/cartContext";
import { formatProductsForCart } from "../../lib/addProductsToCheckout";
import OrderSummary from "../../components/checkout/OrderSummary";
export default function PaymentSuccessful() {
  const { cState, dispatch } = cartState();
  const cartRef = useRef({ ...cState });
  useEffect(() => {
    console.log("cartRef.current", cartRef.current.items);
    dispatch({ type: "CLEAR_CART" });
  }, []);
  return (
    <div className="section offset-top">
      <style jsx>{`
        .order-successful-title {
          font-size: 2rem;
          font-weight: 600;
        }
        .order-successful-text {
          font-size: 1.5rem;
          font-weight: 400;
        }
      `}</style>
      <div className="container flex-center-center-column">
        {cartRef.current.paymentMethod !== "BankTransfer" && (
          <>
            {" "}
            <h1 className="order-successful-title">Payment Succesful</h1>
            <p className="order-successful-text">
              Thank you for your purchase. Your order is being processed.
            </p>
          </>
        )}
        {cartRef.current.paymentMethod === "BankTransfer" && (
          <>
            {" "}
            <h1 className="order-successful-title">
              Bank Transfer request sent
            </h1>
            <p className="order-successful-text">
              Thank you for your order. Your bank transfer request is being
              processed.
            </p>
            <p>We will send you an email with the bank transfer details.</p>
          </>
        )}

        <Link href="/">
          <a
            className="
        underlined_link
        "
            style={{ marginBottom: 80 }}
          >
            Go to Homepage
          </a>
        </Link>
        <OrderSummary cart={cartRef.current} />
      </div>
    </div>
  );
}
