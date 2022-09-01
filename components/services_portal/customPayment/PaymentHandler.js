import React, { useEffect } from "react";
import { useRouter } from "next/router";
import ParrotLoader from "../../utils/ParrotLoader";
import customLog from "../../utils/customLog";
export default function PaymentHandler({
  customPaymentOption,
  value,
  tokenCost,
  setPaymentStatus,
  paymentType = "card",
  paymentObject,
  billingInfoObject,
  loginToken,
}) {
  const router = useRouter();
  const response = async () => {
    await fetch("/api/payment/paypal/mock-request", {
      method: "POST",
      headers: {
        "Expected-Server-Version": "1.0.1",
      },
      body: JSON.stringify({
        customPaymentOption,
        paymentType,
        loginToken,
        paymentObject,
        billingInfoObject,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((result) => {
        setPaymentStatus((prevState) => {
          return {
            status: result.result,
            paymentType: prevState.paymentType,
          };
        });
      })
      .catch((e) => customLog([e]));
  };
  useEffect(() => {
    response();
  }, []);

  return (
    <div className="payment-processing flex-center-center flex-col">
      <style jsx>{`
        .payment-processing {
          margin-top: 2em;
          text-align: center;
        }
        .payment-processing_svg {
          width: 250px;
          height: 250px;
          stroke: red;
          stroke-width: 1;
        }
        .payment-processing_title {
          font-size: var(--fs-500);
          color: var(--clr-neutral-800);
        }
        .payment-processing_title {
          font-size: var(--fs-500);
          color: var(--clr-neutral-800);
        }
        .payment-processing_subtitle {
          font-size: var(--fs-300);
          color: var(--clr-neutral-700);
        }
        .return_custom_wrapper {
          margin-left: auto;
        }
        .payment-processing_item {
          background: var(--clr-warn-opacity-50);
          padding: 0.5em 0.8em;
          border-radius: 100px;
          text-decoration: line-through;
          color: var(--clr-neutral-800);
        }
        .payment-processing_item strong {
          color: var(--clr-warn);
          text-transform: uppercase;
        }
      `}</style>
      <h2 className="payment-processing_title">Payment processing.</h2>
      <p className="payment-processing_subtitle">
        Please do not close this window.
      </p>
      <ParrotLoader />
    </div>
  );
}
