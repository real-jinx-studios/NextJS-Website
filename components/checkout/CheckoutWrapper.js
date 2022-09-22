import React, { useEffect, useState, useRef } from "react";

import Cart from "../../components/checkout/cart";
import BillingInfoStep from "../../components/checkout/steps/BillingInfoStep";
import ShippingInfoStep from "../../components/checkout/steps/ShippingInfoStep";
import ClosedStep from "../../components/checkout/steps/ClosedStep";
import WorkstationIdStep from "../../components/checkout/steps/WorkstationIdStep";
import PaymentStep from "../../components/checkout/steps/PaymentStep";

import { cartState } from "../../lib/cartContext";
import Cookies from "js-cookie";
export default function CheckoutWrapper() {
  const { cState, dispatch } = cartState();

  const loadedCart = useRef(cState.cartLoaded);
  useEffect(() => {
    if (!loadedCart.current) {
      const user = JSON.parse(sessionStorage.getItem("user"));

      if (user?.uInfo?.SiteUser) {
        dispatch({
          type: "LOAD_CART",
          payload: user.uInfo.SiteUser,
        });
      }
      loadedCart.current = true;
    }
  }, []);

  useEffect(() => {
    if (loadedCart.current) {
      if (cState.orderType === "duePayment") {
        let found = false;
        fetch("/api/rest/WebSite/due-payments", {
          method: "POST",
          body: JSON.stringify({
            LoginToken: Cookies.get("uat"),
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            data.Payments.forEach((payment) => {
              if (payment.Order.OrderId === cState.duePaymentId) {
                found = true;
              }
            });
            if (!found) {
              dispatch({
                type: "CLEAR_CART",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [cState.orderType]);

  const [isCartEditable, setIsCartEditable] = useState(true);

  const [currentStepNumber, setCurrentStepNumber] = useState(0);

  useEffect(() => {
    if (cState.checkStepOrder === true) {
      //check if cart requires shipping or hardware ids

      dispatch({
        type: "CLEAR_CHECK_STEP_ORDER",
      });
    }
  }, [cState.checkStepOrder]);

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
      isDirty: cState.checkout["billingDirty"],

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
      isDirty: cState.checkout["shippingDirty"],
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
      isDirty: cState.checkout["workstationDirty"],
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
      isDirty: cState.checkout["paymentDirty"],
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
    dispatch({
      type: "SET_CHECKOUT_STEPS_LENGTH",
      payload: checkoutStepsFiltered.length,
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: "ADD_STEP",
      payload: checkoutStepsFiltered,
    });
  }, [checkoutStepsFiltered.length]);

  return (
    <section className="checkout offset-top inset-bottom">
      <style jsx>{`
        .cart-wrapper {
          display: none;
        }
        @media (min-width: 429px) {
          .cart-wrapper {
            display: block;
            position: sticky;
            top: var(--offset-top);
          }
        }
        .checkout-wrapper {
          display: flex;
          width: 100%;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
      <div id="main" className="checkout-wrapper">
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
                isValid={step.isValid}
                isDirty={step.isDirty}
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
                setStepDirty={(isDirty) => {
                  dispatch({
                    type: "SET_STEP_DIRTY",
                    payload: {
                      stepName: step.id,
                      isDirty,
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
                isDirty={step.isDirty}
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
