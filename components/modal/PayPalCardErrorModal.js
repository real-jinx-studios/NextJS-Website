import { useState } from "react";

export default function PayPalCardErrorModal({
  setIsPayPalErrorOpen,
  errorCode,
  dispatch,
}) {
  dispatch({
    type: "SET_ORDER_PROCESSING",
    payload: false,
  });
  const [errCode, setErrCode] = useState(errorCode);
  const errors = [
    {
      testName: "Payment method is declined",
      trigger: "INSTRUMENT_DECLINED",
      responseCode: "card_declined",
    },
    {
      triggerName: "Something went wrong",
      trigger: "Something in paypal broke",
      responseCode: "something_went_wrong",
    },
    {
      testName: "Card is declined",
      trigger: "CCREJECT-BANK_ERROR",
      responseCode: "5100",
    },
    {
      testName: "CVC check fails",
      trigger: "CCREJECT-CVV_F",
      responseCode: "00N7",
    },
    {
      testName: "Card expired",
      trigger: "CCREJECT-EXPIRED",
      responseCode: "5400",
    },
    {
      testName: "Luhn Check fails",
      trigger: "CCREJECT-BAD_DATA",
      responseCode: "5180",
    },
    {
      testName: "Insufficient funds",
      trigger: "CCREJECT-IF",
      responseCode: "5120",
    },
    {
      testName: "Card lost, stolen",
      trigger: "CCREJECT-LS",
      responseCode: "9520",
    },
    {
      testName: "Card refused",
      trigger: "CCREJECT-REFUSED",
      responseCode: "0500",
    },
    {
      testName: "Card invalid",
      trigger: "CCREJECT-INVALID",
      responseCode: "1330",
    },
  ];

  const errorCards = errors.map((error, i) => (
    <div
      className={`error-wrapper ${
        errCode === error.responseCode ? "active" : ""
      }`}
    >
      <style jsx>{`
        .error-wrapper {
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 1.1rem;
          gap: 0.5rem;
          display: none;
        }
        .active {
          display: flex;
        }
        .error-name {
          font-size: 1rem;

          color: var(--clr-neutral-700);
        }
      `}</style>
      <h3 className="error-name">{error.testName}</h3>
    </div>
  ));
  return (
    <div className=" flex-center-center-column">
      <style jsx>{`
        .error-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--clr-neutral-800);
        }
        .error-reasons-wrapper {
          color: var(--clr-neutral-700);
          margin-bottom: 1rem;
        }
        .error-reasons-wrapper h3 {
          color: var(--clr-neutral-700);
        }
        .error-reasons-wrapper ul {
          list-style: initial;
          padding-left: 1.5rem;
        }
        .error-reasons-wrapper ul li {
          color: var(--clr-neutral-700);
          font-size: 0.9rem;
          font-weight: normal;
          margin-bottom: 0.3rem;
        }
      `}</style>
      <h2 className="error-title">
        An error occured during the payment process!
      </h2>
      {errorCards}
      {errCode === "something_went_wrong" && (
        <div>
          <h3>Something at PayPal broke. Please try again in a few minutes.</h3>
        </div>
      )}
      {errCode === "card_declined" && (
        <div className="error-reasons-wrapper">
          <h3>Possible reasons might be:</h3>
          <ul>
            <li>Some of the card details entered are incorrect.</li>
            <li>The card is no longer valid.</li>
            <li>
              The bank has declined the payment or there are inssuficient funds.
            </li>
            <li>The card has expired.</li>
            <li>The card has been reported as lost or stolen.</li>
            <li>Security check failed.</li>
          </ul>
        </div>
      )}
      <button
        className="button button_basic_long_on_light_bg"
        onClick={() => {
          setErrCode("");
          setIsPayPalErrorOpen(false);
        }}
      >
        OK
      </button>
    </div>
  );
}
