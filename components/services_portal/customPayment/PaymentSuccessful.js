import React from "react";
import { useRouter } from "next/router";
export default function PaymentSuccessful({ type, value, tokenCost }) {
  const router = useRouter();

  return (
    <div className="payment-success flex-center-center flex-col">
      <style jsx>{`
        .payment-success {
          margin-top: 2em;
          text-align: center;
        }
        .payment-success_svg {
          stroke: green;
          stroke-width: 8;
        }
        .payment-success_title {
          font-size: var(--fs-500);
          color: var(--clr-neutral-800);
        }
        .payment-success_title {
          font-size: var(--fs-500);
          color: var(--clr-neutral-800);
        }
        .payment-success_subtitle {
          font-size: var(--fs-300);
          color: var(--clr-neutral-700);
        }
        .return_custom_wrapper {
          margin-left: auto;
        }
        .payment-success_item {
          background: #288ee233;
          padding: 0.5em 0.8em;
          border-radius: 100px;
          color: var(--clr-neutral-800);
        }
        .payment-success_item strong {
          color: var(--clr-primary);
          text-transform: uppercase;
        }

        #lineLong,
        #lineShort,
        #circle {
          transition: all 1s ease;
        }

        #lineLong,
        #lineShort {
          transform: translateY(100%);
          animation: animate-lines 0.5s cubic-bezier(0.22, 0.68, 0, 1.71)
            forwards;
        }

        @keyframes animate-lines {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .payment_success-svg-1 {
          animation: animate-svg-stroke-1 0.5s
            cubic-bezier(0.755, 0.05, 0.855, 0.06) 0s both;
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
        width="250"
        height="250"
        viewBox="0 0 250 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="success">
          <path
            className="payment-success_svg "
            id="lineLong"
            d="M149 109L117 142"
            stroke-linecap="round"
          />
          <path
            className="payment-success_svg "
            id="lineShort"
            d="M101 125L117 142"
            stroke-linecap="round"
          />
          <circle
            id="circle"
            cx="125"
            cy="125"
            r="68.5"
            className="payment-success_svg "
          />
        </g>
      </svg>
      <h2 className="payment-success_title">Payment Successful:</h2>
      <p className="payment-success_item">
        <strong>{type}</strong> : {type === "tokens" ? tokenCost : value}
      </p>
      <p className="payment-success_subtitle">Thanks you for your payment.</p>
      <p className="payment-success_subtitle">
        We will be sending you an email shortly with all the whatever deatils.
      </p>
    </div>
  );
}
