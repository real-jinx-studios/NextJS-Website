import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

import { promiseResolver } from "../../lib/promiseResolver";
import { cartState } from "../../lib/cartContext";
import Cookies from "js-cookie";
import LoaderDots from "./loaderDots";
import GenericModal from "../modal/GenericModal";
import PayPalCardErrorModal from "../modal/PayPalCardErrorModal";
import OrderProcessingModal from "../modal/OrderProcessingModal";

export default function PaymentOptionsPaypal({ setIsLoading }) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();
  const [isPayPalErrorOpen, setIsPayPalErrorOpen] = useState(false);
  const [errorCode, setErrorCode] = useState(null);

  const { cState, dispatch } = cartState();
  const router = useRouter();
  const [OrderDetails, setOrderDetails] = useState(null);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  return (
    <div className="billing">
      <style jsx>{`
        /*paypal mockup*/
        .paypal_button_container_inner {
          margin-bottom: 2.9em;
        }
        .paypal_button_container {
        }

        .paypal_button,
        .card_payment {
          position: relative;
          cursor: pointer;
          height: 49px;
          width: 80%;
          border-radius: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2px solid #fefefe00;
          transition: all 0.3s ease;
          font-weight: bold;
        }
        .paypal_button {
          background-color: var(--clr-neutral-150);
        }
        .paypal_button:hover {
          border-color: var(--clr-neutral-800);
          background-color: var(--clr-neutral-800);
        }
        .paypal_button:hover img {
          filter: invert(1);
        }
        .card_payment {
          color: var(--clr-neutral-800);
          border-color: var(--clr-neutral-800);
          background-color: var(--clr-neutral-50);
        }
        .card_payment:hover {
          color: var(--clr-neutral-50);

          background-color: var(--clr-neutral-800);
        }
        .card_payment::before {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          opacity: 0;
          color: var(--clr-neutral-50);
          content: "\f582";
          text-align: center;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 150%;
          left: 0;
          right: 68%;
          bottom: 0;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .card_payment:hover::before {
          top: 0;
          opacity: 1;
        }
        .paypal_button::before {
          font-family: "Font Awesome 5 Free";
          font-weight: 900;
          opacity: 0;
          color: var(--clr-neutral-50);
          content: "\f556";
          text-align: center;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 150%;
          left: 0;
          right: 68%;
          bottom: 0;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        .paypal_button:hover::before {
          top: 0;
          opacity: 1;
        }
        .loader-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }
        .error {
          color: var(--clr-warn);
          font-size: 1.2rem;
          font-weight: bold;
          text-align: center;
        }
        .error p {
          color: var(--clr-warn);
        }
      `}</style>

      <div className="paypal_button_container">
        <h3 className="custom_payment_section_title">Payment Method:</h3>
        <div className="paypal_button_container_inner">
          {!isOrderLoading && (
            <>
              {isPending && (
                <div className="loader-wrapper">
                  <LoaderDots size="l" color="sysyem" />
                </div>
              )}
              {isRejected && (
                <div className="error">
                  <p>somehing paypal-ish broke</p>
                </div>
              )}

              <PayPalButtons
                createOrder={() => createOrder(cState)}
                onApprove={(data, actions) => {
                  console.log(data, actions, "onApprove");
                  dispatch({
                    type: "SET_ORDER_PROCESSING",
                    payload: true,
                  });
                  captureOrder(data, cState).then((res) => {
                    console.log(res, "captureOrder");
                    if (res?.captureData?.status === "success") {
                      console.log("success");
                      router.replace("/checkout/success");
                      return;
                    } else if (res?.captureData?.status === "pending") {
                      console.log("pending");
                      router.replace("/checkout/pending");
                      return;
                    } else {
                      console.log("error", res);
                      if (res?.captureData?.statusCode === 422) {
                        setErrorCode("card_declined");
                        setIsPayPalErrorOpen(true);
                      }
                    }
                  });
                }}
                onCancel={(data, actions) => {
                  console.log(data, actions, "cancelled");
                  // Show a cancel page, or return to cart
                }}
                onError={(err) => {
                  // For example, redirect to a specific error page
                  setErrorCode("something_went_wrong");
                  setIsPayPalErrorOpen(true);
                  console.log(err, "error from paypal");
                  dispatch({
                    type: "SET_ORDER_PROCESSING",
                    payload: false,
                  });
                }}
              />
            </>
          )}
        </div>
      </div>
      <GenericModal
        open={isPayPalErrorOpen}
        onClose={() => setIsPayPalErrorOpen(false)}
      >
        <PayPalCardErrorModal
          setIsPayPalErrorOpen={setIsPayPalErrorOpen}
          errorCode={errorCode}
          dispatch={dispatch}
        />
      </GenericModal>
      <OrderProcessingModal
        open={cState.checkout.orderProcessing}
        cState={cState}
      />
    </div>
  );
}

function createOrder(cState) {
  return fetch("/api/payment/paypal/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cState),
  })
    .then((res) => {
      if (res.ok) return res.json();
      console.log(res.json());
      return res.json().then((json) => Promise.reject(json));
    })
    .then(({ id }) => {
      return id;
    })
    .catch((e) => {
      console.error(e.error);
    });
}

function captureOrder(data, cState) {
  return fetch("/api/payment/paypal/capture-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: data.orderID,
      payerID: data.payerID,
      cState,
      loginToken: Cookies.get("uat"),
    }),
  })
    .then((res) => {
      console.log(res, "from capture order");
      if (res.ok) return res.json();
      return res.json();
    })
    .then((data) => {
      console.log(data, "from capture order 1");
      return data;
    })
    .catch((e) => {
      console.log(e, "from capture order 2");
      return e;
    });
}
