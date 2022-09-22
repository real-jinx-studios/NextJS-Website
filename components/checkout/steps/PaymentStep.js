import styles from "./steps.module.css";
import { useRouter } from "next/router";
import React, { useRef, useState, useEffect } from "react";

import FancyLoader from "../../utils/FancyLoader";

import PaymentOptionsPaypalBackend from "../../utils/PaymentOptionsPaypalBackend";
import { cartState } from "../../../lib/cartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import BankTransferButton from "../../actions/BankTransferButton";
import sanitizeVAT from "../../../lib/sanitizeVAT";
import Cookies from "js-cookie";
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
    if (isLoading) return;
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
    if (isLoading) return;
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

  const router = useRouter();

  const handleBankTransferClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let shippableCount = cState.checkout.shippableCount;

    let totalPrice = 0;
    let totalVAT = 0;

    let formattedOptionalProducts = [];

    let formattedFreeProducts = [];

    const formattedItems = cState.items.map((item, index) => {
      let rentDuration = item.rentDuration || 1;

      totalPrice += item.price * item.quantity * rentDuration;

      let PaymentPlanOptions = {};
      PaymentPlanOptions = item.paymentPlanDetails.map((option) => {
        return { [option.id]: option.currentValue || option.default };
      });
      PaymentPlanOptions = Object.assign({}, ...PaymentPlanOptions);

      let formattedOptions = item.options;
      formattedOptions = Object.keys(formattedOptions).map((option) => {
        return { [option]: formattedOptions[option][0] };
      });
      formattedOptions = Object.assign({}, ...formattedOptions);
      //get index of optional item in OptionLItmesFormatted from optional items of this item and increase quantity
      item.optionalProducts.forEach((optionalItem) => {
        totalPrice += optionalItem.price * item.quantity;
        const optionalItemIndex = formattedOptionalProducts.findIndex(
          (oItem) => oItem.ProductId === optionalItem.id
        );
        if (optionalItemIndex !== -1) {
          formattedOptionalProducts[optionalItemIndex].Quantity +=
            item.quantity;
          formattedOptionalProducts[optionalItemIndex].Price.VAT = cState.vat
            .isVat
            ? cState.vat.isValid && cState.vat.substractVAT
              ? 0
              : optionalItem.price *
                formattedOptionalProducts[optionalItemIndex].Quantity *
                (cState.vat.vat / 100)
            : 0;
        } else {
          formattedOptionalProducts.push({
            ProductId: optionalItem.id,
            Name: optionalItem.name,
            ProductOptions: {},
            PaymentPlan: "lifetime",
            OptionalProducts: [],
            FreeProducts: [],
            HrdwareIds: [],
            Price: {
              UnitPrice: optionalItem.price,
              VAT: cState.vat.isVat
                ? cState.vat.isValid && cState.vat.substractVAT
                  ? 0
                  : Math.round(
                      optionalItem.price *
                        item.quantity *
                        (cState.vat.vat / 100)
                    )
                : 0,
            },
            Quantity: item.quantity,
          });
        }
      });

      //the same for free items as above
      item.freeProducts.forEach((freeItem) => {
        const freeItemIndex = formattedFreeProducts.findIndex(
          (fItem) => fItem.ProductId === freeItem.id
        );
        if (freeItemIndex !== -1) {
          formattedFreeProducts[freeItemIndex].Quantity += item.quantity;
        } else {
          formattedFreeProducts.push({
            ProductId: freeItem.id,
            Name: freeItem.name,
            ProductOptions: {},
            PaymentPlan: "lifetime",
            OptionalProducts: [],
            FreeProducts: [],
            HrdwareIds: [],
            Price: {
              UnitPrice: 0,
              VAT: 0,
            },
            Quantity: item.quantity,
          });
        }
      });

      let workstationIds = [];
      Object.keys(cState.workstationIds).forEach((key) => {
        if (
          cState.workstationIds[key].productReferenceId ===
          item.productReferenceId
        ) {
          workstationIds.push(cState.workstationIds[key].hardwareID);
        }
      });
      //make sure workstation ids are not more than the quantity of the item
      workstationIds = workstationIds.slice(0, item.quantity);

      return {
        ProductId: item.id,
        Name: item.name,
        ProductOptions: formattedOptions,
        PaymentPlan: item.paymentPlan,
        PaymentPlanOptions,
        WorkstationIds: workstationIds,
        OptionalProducts: item.optionalProducts.map((a) => a.id),
        FreeProducts: item.freeProducts.map((a) => a.id),
        Quantity: item.quantity,
        Price: {
          UnitPrice: item.price,

          VAT: cState.vat.isVat
            ? cState.vat.isValid && cState.vat.substractVAT
              ? 0
              : Math.round(
                  item.price *
                    item.quantity *
                    rentDuration *
                    (cState.vat.vat / 100)
                )
            : 0,
        },
      };
    });
    let billingInfo = cState.billingInfo;
    try {
      delete billingInfo.isShippingSameAsBilling;
    } catch (e) {
      console.log(e);
    }

    totalVAT = cState.vat.isVat
      ? cState.vat.isValid && cState.vat.substractVAT
        ? 0
        : Math.round(totalPrice * (cState.vat.vat / 100))
      : 0;

    const OrderDetails = {
      PaymentMethod: "BankTransfer",
      BillingInfo: {
        LegalName: billingInfo.LegalName,
        ContactName: billingInfo.ContactName,
        BillingCountry: billingInfo.Billing.Country,
        BillingCity: billingInfo.Billing.City,
        VAT: sanitizeVAT(billingInfo.VAT_ID),
        BillingAddress: billingInfo.Billing.Address,
        BillingPostcode: billingInfo.Billing.PostCode,
        Email: billingInfo.Email,
      },
      ShippingInfo: {
        ShippingCountry: cState.shippingInfo.Shipping.Country,
        ShippingCity: cState.shippingInfo.Shipping.City,
        ShippingAddress: cState.shippingInfo.Shipping.Address,
        ShippingPostcode: cState.shippingInfo.Shipping.PostCode,
        ShippingRecipient: cState.shippingInfo.Shipping.RecipientName,
        ShippingRecipientPhone: cState.shippingInfo.Shipping.RecipientPhone,
      },

      Transaction: {},

      Order: {
        OrderType: cState.orderType,
        VATPrice: totalVAT,
        OrderId:
          cState.orderType === "duePayment"
            ? cState.duePaymentId
            : cState.orderId,
        Items: [
          ...formattedItems,
          ...formattedOptionalProducts,
          ...formattedFreeProducts,
        ],
      },
    };

    const res = await fetch("/api/rest/WebSite/complete-purchase", {
      method: "POST",

      body: JSON.stringify({ OrderDetails, LoginToken: Cookies.get("uat") }),
    });

    if (res.status === 200) {
      dispatch({
        type: "COMPLETE_PURCHASE",
        payload: {
          date: new Date(Date.now()).toLocaleString(),
          paymentMethod: "BankTransfer",
        },
      });
      router.replace("/checkout/success");
    }
  };

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

            <BankTransferButton onClick={handleBankTransferClick} />

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
        {isLoading && allStepsValid && (
          <div className="flex-center-center">
            <FancyLoader />
          </div>
        )}
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
