import React from "react";
import { useRouter } from "next/router";
export default function PaymentFailed({ type, value }) {
  const router = useRouter();
  return (
    <div className="payment-failed flex-center-center flex-col">
      <style jsx>{`
        .payment-failed {
          margin-top: 2em;
          text-align: center;
        }
        .payment-failed_svg {
          width: 250px;
          height: 250px;
          stroke: red;
          stroke-width: 1;
        }
        .payment-failed_title {
          font-size: var(--fs-500);
          color: var(--clr-neutral-800);
        }
        .payment-failed_title {
          font-size: var(--fs-500);
          color: var(--clr-neutral-800);
        }
        .payment-failed_subtitle {
          font-size: var(--fs-300);
          color: var(--clr-neutral-700);
        }
        .return_custom_wrapper {
          margin-left: auto;
        }
        .payment-failed_item {
          background: var(--clr-warn-opacity-50);
          padding: 0.5em 0.8em;
          border-radius: 100px;
          text-decoration: line-through;
          color: var(--clr-neutral-800);
        }
        .payment-failed_item strong {
          color: var(--clr-warn);
          text-transform: uppercase;
        }
      `}</style>

      <a
        className="return_custom_wrapper"
        href="/services-portal?account=payment"
      >
        <div
          className="return_custom"
          /*onClick={() => router.replace("/services-portal?account=payment")}*/
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="return_icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <span className="return_text">Return to Custom Payment</span>
        </div>
      </a>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="payment-failed_svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <h2 className="payment-failed_title">Payment was unsuccessful!</h2>
      <p className="payment-failed_item">
        <strong>{type}</strong> :{value}
      </p>
      <p className="payment-failed_subtitle">
        Something went wrong with the payment process. We are sorry for the
        inconvenience.
      </p>
      <p className="payment-failed_subtitle">
        Please try again or contact our{" "}
        <a className="underlined_link">customer support</a>.
      </p>
      <p className="payment-failed_subtitle">
        <small>you have not been charged.</small>
      </p>
    </div>
  );
}
