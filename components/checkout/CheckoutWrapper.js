import React, { useEffect, useState } from "react";

import Cart from "../../components/checkout/cart";
import BillingInfoStep from "../../components/checkout/steps/BillingInfoStep";
import ShippingInfoStep from "../../components/checkout/steps/ShippingInfoStep";
import ClosedStep from "../../components/checkout/steps/ClosedStep";
import WorkstationIdStep from "../../components/checkout/steps/WorkstationIdStep";
import PaymentStep from "../../components/checkout/steps/PaymentStep";

import { cartState } from "../../lib/cartContext";
export default function CheckoutWrapper() {
  const { cState, dispatch } = cartState();

  const [isCartEditable, setIsCartEditable] = useState(true);

  const [currentStepNumber, setCurrentStepNumber] = useState(0);

  //calculate checkout state from cart state
  const checkoutSteps = [
    {
      name: "Billing Info",
      id: "billing",
      stepNumber: 0,
      component: BillingInfoStep,
      isValid: cState.checkout["billing"],
      isVisible: true,

      isEditable: true,

      isActive: currentStepNumber === 0,
      isClosed: false,
      isNextable: true,
      isPreviousable: true,
      hasNext: true,
      hasSkip: false,
      hasPrevious: false,
    },
    {
      name: "Shipping Info",
      id: "shipping",
      stepNumber: 1,

      component: ShippingInfoStep,
      isValid: cState.checkout["shipping"],

      isEditable: true,
      isVisible: cState.checkout.shippableCount > 0,

      isActive: currentStepNumber === 1,
      isClosed: true,
      isNextable: true,
      isPreviousable: true,
      hasNext: true,
      hasSkip: false,
      hasPrevious: true,
    },
    {
      name: "Workstation IDs",
      id: "workstation",
      stepNumber: 2,

      component: WorkstationIdStep,
      isValid: cState.checkout["workstation"],
      isEditable: true,
      isVisible: cState.checkout.hardwareIdCount > 0,
      isActive: currentStepNumber === 2,
      isClosed: true,
      isNextable: false,
      isPreviousable: false,
      hasNext: true,
      hasSkip: true,
      hasPrevious: true,
    },
    {
      name: "Payment",
      id: "payment",
      stepNumber: 3,
      component: PaymentStep,
      isValid: cState.checkout["payment"],
      isVisible: cState.items.length > 0,

      isEditable: false,

      isActive: currentStepNumber === 3,
      isClosed: true,
      hasNext: false,
      hasSkip: false,
      hasPrevious: true,
    },
  ];
  //put only some of the steps in the checkout depending on conditions
  let biasedIndex = 0;
  const checkoutStepsFiltered = checkoutSteps.filter((step, index) => {
    if (step.isVisible) {
      step.stepNumber = biasedIndex;

      step.isActive = cState.stepNumber === biasedIndex;
      biasedIndex++;

      return step;
    }
  });

  useEffect(() => {
    console.log("on mount, SET_CHECKOUT_STEPS_LENGTH");
    dispatch({
      type: "SET_CHECKOUT_STEPS_LENGTH",
      payload: checkoutStepsFiltered.length,
    });
  }, []);
  useEffect(() => {
    console.log(
      "checkoutStepsFiltered.length use effect with dependency, ADD_STEP"
    );
    dispatch({
      type: "ADD_STEP",
      payload: checkoutStepsFiltered,
    });
  }, [checkoutStepsFiltered.length]);

  return (
    <section className="checkout offset-top inset-bottom">
      <style jsx>{`
        .cart-wrapper {
          position: sticky;
          top: var(--offset-top);
        }
      `}</style>
      <div>
        {checkoutStepsFiltered.map((step, index) => {
          if (step.isActive) {
            return (
              <step.component
                key={index}
                stepNumber={index + 1}
                checkoutSteps={checkoutSteps}
                hasNext={step.hasNext}
                hasSkip={step.hasSkip}
                hasPrevious={step.hasPrevious}
                stepIncrement={() => {
                  dispatch({
                    type: "INCREMENT_STEP",
                  });
                }}
                stepDecrement={() => {
                  dispatch({
                    type: "DECREMENT_STEP",
                  });
                }}
                setStepValid={(isValid) => {
                  dispatch({
                    type: "SET_STEP_VALID",
                    payload: {
                      stepName: step.id,
                      isValid,
                    },
                  });
                }}
                setCurrentStepNumber={setCurrentStepNumber}
              />
            );
          } else if (step.isActive === false) {
            return (
              <ClosedStep
                key={index}
                stepNumber={index + 1}
                stepName={step.name}
                stepId={step.id}
                isValid={step.isValid}
                checkoutSteps={checkoutSteps}
              />
            );
          }
        })}
      </div>
      <div className="cart-wrapper">
        <Cart
          isCartEditable={isCartEditable}
          setIsCartEditable={setIsCartEditable}
          cartType={"general"}
          checkoutSteps={checkoutSteps}
        />
      </div>
    </section>
  );
}
