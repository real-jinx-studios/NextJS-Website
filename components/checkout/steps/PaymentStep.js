import styles from "./steps.module.css";
import React, { useRef, useState, useEffect } from "react";

import LoaderDots from "../../utils/loaderDots";
import PaymentOptions from "../../utils/PaymentOptions";
import PaymentOptionsPaypal from "../../utils/PaymentOptionsPaypal";
import PaymentOptionsPaypalBackend from "../../utils/PaymentOptionsPaypalBackend";
import { cartState } from "../../../lib/cartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentOptionsPaypalHostedFields from "../../utils/PaymentOptionsPaypalHostedFields";
export default function PaymentStep({
  isCartEditable = false,
  setIsCartEditable,
  stepNumber,
  setStepValid,

  stepDecrement,
  isDirty,
  setStepDirty,
}) {
  const { cState, dispatch } = cartState();
  const [isLoading, setIsLoading] = useState(false);
  const [allStepsValid, setAllStepsValid] = useState(true);

  const [isPaypalIntegration, setIsPaypalIntegration] = useState(true);

  useEffect(() => {
    if (!isDirty) {
      setStepDirty(true);
    }
  }, [isDirty]);

  const handleCancel = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_CART_LOCKED",
      payload: false,
    });
    setStepValid(false);
    stepDecrement();
  };
  useEffect(() => {
    dispatch({
      type: "SET_CART_LOCKED",
      payload: true,
    });
    dispatch({
      type: "SET_ORDER_ID",
      payload: self.crypto.randomUUID(),
    });

    cState.steps.forEach((step) => {
      if (!step.isValid && step.stepNumber !== stepNumber - 1) {
        setAllStepsValid(false);
      }
    });
  }, []);

  useEffect(() => {
    if (cState.setStepToBeActive === true) {
      dispatch({
        type: "SET_CART_LOCKED",
        payload: false,
      });
      dispatch({
        type: "SET_STEP",
      });
    }
  }, [cState.setStepToBeActive]);

  return (
    <div className={styles.billing}>
      <style jsx>{`
        .step-errors-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1rem;

          justify-content: center;
          margin: 1rem 0;
        }
        .step-errors-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--clr-warn);
        }
        .step-errors-wrapper ul {
        }
        .step-errors_list-item {
          color: var(--clr-warn);
        }
        .step-errors_list-item::before {
          content: attr(step-number) ". ";
          color: var(--clr-warn);
          display: inline-block;
          width: 1em;
        }
      `}</style>
      <div
        className={`${styles.billing__inner} ${
          isCartEditable ? styles.cart_editable : ""
        }`}
        data-step={stepNumber}
      >
        {" "}
        <h3 className={styles.billing__title}>Choose payment method</h3>
        <div>
          <input
            type="checkbox"
            id="set-paypal-integration"
            name="set-paypal-integration"
            value={isPaypalIntegration}
            defaultChecked={isPaypalIntegration}
            onChange={(e) => {
              setIsPaypalIntegration(!isPaypalIntegration);
            }}
          />{" "}
          <label htmlFor="set-paypal-integration">
            refresh paypal integration <small>(click on and off)</small>
          </label>
        </div>
        {!isLoading && allStepsValid && (
          <>
            {isPaypalIntegration && (
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AbPfHl4rmjuW5fptWJJec7Vx9_VqCUxsqR48RSTepYhyE9dcYDsimVGgontvstnHOcrYZBE6WPMglcR3",
                  currency: "EUR",

                  debug: false,
                  components: "buttons",
                  "buyer-country": cState.checkoutCountry.code,
                  locale: cState.checkoutCountry.locale,
                  //"enable-funding": "paylater",
                  //"credit,card,paylater,venmo,bancontact,giropay,sepa,eps,ideal,mybank,sofort",
                }}
              >
                <PaymentOptionsPaypalBackend setIsLoading={setIsLoading} />
              </PayPalScriptProvider>
            )}

            <div className={styles.step_actions}>
              <button
                className="button button_basic_long_on_light_bg"
                onClick={handleCancel}
              >
                Previous
              </button>
            </div>
          </>
        )}
        {isLoading && allStepsValid && <LoaderDots size="L" color="system" />}
        {!isLoading && !allStepsValid && (
          <div className="step-errors-wrapper">
            <h3 className="step-errors-title">Some steps are not valid:</h3>
            <ul>
              {cState.steps.map((step) => {
                if (!step.isValid && step.id !== "payment") {
                  return (
                    <li
                      className="step-errors_list-item"
                      step-number={step.stepNumber + 1}
                    >
                      {step.name}
                    </li>
                  );
                }
              })}
            </ul>
            <div className={styles.step_actions}>
              <button
                className="button button_basic_long_on_light_bg"
                onClick={handleCancel}
              >
                Previous
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
