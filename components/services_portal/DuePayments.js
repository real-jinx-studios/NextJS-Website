import styles from "./services_portal.module.css";
import React, { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
import LoaderDots from "../utils/loaderDots";

import priceFormatter from "../utils/priceFormatter";
import { cartState } from "../../lib/cartContext";

import CartItem from "../checkout/CartItem";
import { useProducts } from "../../lib/productsContext";
import addProductsToCheckout, {
  formatProductsForCart,
} from "../../lib/addProductsToCheckout";
import { toast } from "react-toastify";

export default function DuePayments({ duePayments, handleFetchDuePayments }) {
  const { dispatch } = cartState();
  const [isLoading, setIsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const { getProducts } = useProducts();

  const router = useRouter();

  let payments = <p style={{ color: "var(--clr-neutral-800" }}>empty</p>;

  const handleDuePaymentClick = async (OrderId, items, Name) => {
    setIsLoading(true);
    //load all products from server and set them to the cState
    const currentPayments = await handleFetchDuePayments();

    let doesntExist = true;
    currentPayments.Payments.forEach((payment) => {
      if (payment.Order.OrderId === OrderId) {
        doesntExist = false;
      }
    });

    if (doesntExist) {
      toast.error("Sorry. This due payment is no longer available!", {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      return;
    }

    setProductsLoading(true);

    const res = await getProducts();

    dispatch({ type: "CLEAR_CART" });

    dispatch({ type: "SET_DUE_PAYMENTS", payload: { OrderId, Name } });

    addProductsToCheckout(
      res.paymentTaxes,
      res.products,
      res.payments,
      items,
      dispatch,
      res.patymentText
    );

    dispatch({ type: "FIX_OPTIONAL_ITEMS_IN_CART" });

    router.push("/checkout");
    setProductsLoading(false);
  };

  useEffect(() => {
    const loadProducts = async () => {
      const prds = await getProducts();

      setProducts(prds);
      setIsLoading(false);
      setProductsLoading(false);
    };
    loadProducts();
  }, []);

  payments =
    !isLoading && !productsLoading ? (
      duePayments?.Payments?.map((Payment, index) => {
        return (
          <div className="due-payment-wrapper" key={Payment.Order.OrderId}>
            {productsLoading && (
              <div className="loader-overlay">
                <div className="overlay-inner">
                  <div className="overlay-loader-wrapper">
                    {" "}
                    <LoaderDots
                      size="l"
                      style={{
                        borderColor: "var(--clr-warn-opacity-50)",
                        borderTopColor: "var(--clr-warn)",

                        backgroundColor: "#fefefe00",
                      }}
                    />
                  </div>
                  <div className="overlay-background" />
                </div>
              </div>
            )}
            <style jsx>{`
              .overlay-inner {
                position: relative;
                width: 100%;
                height: 100%;
              }
              .overlay-loader-wrapper {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              }
              .overlay-background {
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                opacity: 0.85;
                z-index: -1;
                user-select: none;
                pointer-events: none;
                background-color: var(--clr-neutral-800);
              }

              .loader-overlay {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                z-index: 2;
                position: absolute;
                top: 0;
                left: 0;
              }

              .due-payment-wrapper {
                border: 2px solid var(--clr-primary);
                border-radius: 9px;
                padding: 1rem;
                margin-bottom: 3rem;
                box-shadow: var(--shadow-1);
              }
              .due-payment_items-wrapper {
              }
              .due {
                margin-top: 1rem;
                text-align: center;
              }
              .price {
                font-size: 1.3rem;
                font-weight: 500;
                text-decoration: underline;
              }
              .due-payment-title {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                margin-bottom: 1.5em;
              }
              .due-payment-title h3 {
                text-align: center;
                font-size: 0.98rem;
                font-weight: 500;
                margin-bottom: 0.5rem;
                color: var(--clr-neutral-800);
              }
              .due-payment-title h3 span {
                font-size: 0.8rem;
                font-weight: 400;
                color: var(--clr-neutral-800);
              }
              .due-payment-actions {
                display: flex;
                justify-content: space-around;
                align-items: center;
              }
              .no-vat {
                font-size: 0.8rem;
                font-weight: initial;
              }
            `}</style>
            <div className="due-payment-title">
              <h3>
                Due Payment name: <br />
                <span>{Payment.Name}</span>
              </h3>
              <span className="due">
                Due: <br />
                <span className="price">
                  {priceFormatter(
                    Payment.Order.Items.reduce((acc, item) => {
                      let rentDuration = 1;

                      if (item.PaymentPlan === "rent") {
                        rentDuration = item.PaymentPlanOptions?.period / 30;
                      }

                      return (
                        acc +
                        item.Price.UnitPrice * item.Quantity * rentDuration
                      );
                    }, 0)
                  )}
                  <br />
                  <small className="no-vat">w/o VAT</small>
                </span>
              </span>
            </div>
            <div className="due-payment_item-wrapper">
              {" "}
              {!productsLoading &&
                formatProductsForCart(
                  products.paymentTaxes,
                  products.products,
                  products.payments,
                  Payment.Order.Items
                ).map((item, index) => {
                  return (
                    <CartItem
                      key={index + item.ProductId + Payment.Order.OrderId}
                      item={item}
                      index={index}
                      isCartLocked={true}
                      hideTokenTable={true}
                    />
                  );
                })}
            </div>
            <div className="due-payment-actions">
              <button
                onClick={() =>
                  handleDuePaymentClick(
                    Payment.Order.OrderId,
                    Payment.Order.Items,
                    Payment.Name
                  )
                }
                className="buy_now_button due"
              >
                Make Payment
              </button>
            </div>
          </div>
        );
      })
    ) : (
      <LoaderDots />
    );

  return (
    <div className={styles.content}>
      <div className={styles.title_wrapper}>
        <h2>Due Payments</h2>
      </div>
      <div className={styles.content_inner_edit_account}>
        {isLoading ? (
          <LoaderDots />
        ) : (
          <div className={"table-wrapper"}>{payments}</div>
        )}
      </div>
    </div>
  );
}
