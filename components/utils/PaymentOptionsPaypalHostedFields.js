import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import {
  usePayPalScriptReducer,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

import { cartState } from "../../lib/cartContext";

import LoaderDots from "./loaderDots";

const CUSTOM_FIELD_STYLE = {};
const INVALID_COLOR = {
  color: "#dc3545",
};

export default function PaymentOptionsPaypalHostedFields({ setIsLoading }) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const { cState, dispatch } = cartState();

  const [OrderDetails, setOrderDetails] = useState(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    handlePaymentSubmit("paypal");
  }, []);

  const handlePaymentSubmit = async (paymentMethod) => {
    setIsLoading(true);
    let shippableCount = cState.checkout.shippableCount;
    const optionalProducts = Array.from(
      new Set(cState.optionalProducts.map((a) => a.id))
    ).map((id) => {
      return cState.optionalProducts.find((a) => a.id === id);
    });
    const freeProducts = Array.from(
      new Set(cState.freeProducts.map((a) => a.id))
    ).map((id) => {
      return cState.freeProducts.find((a) => a.id === id);
    });
    let totalPrice = 0;

    const formattedOptionalProducts = optionalProducts.map((item) => {
      totalPrice += item.price * item.quantity;
      return {
        ProductId: item.id,
        Name: item.name,
        ProductOptions: {},
        PaymentPlan: "lifetime",
        OptionalProducts: [],
        FreeProducts: [],
        HrdwareIds: [],
        Price: {
          UnitPrice: item.price,
          VAT: (item.price * item.quantity * cState.vat.vat) / 100,
        },
        Quantity: item.quantity,
      };
    });

    const formattedFreeProducts = freeProducts.map((item) => {
      return {
        ProductId: item.id,
        Name: item.name,
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
      };
    });

    const formattedItems = cState.items.map((item, index) => {
      totalPrice += item.price * item.quantity;
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

      return {
        ProductId: item.id,
        Name: item.name,
        ProductOptions: formattedOptions,
        PaymentPlan: item.paymentPlan,
        PaymentPlanOptions,
        WorkstationIds: item.hardwareIds,
        OptionalProducts: item.optionalProducts.map((a) => a.id),
        FreeProducts: item.freeProducts.map((a) => a.id),
        Quantity: item.quantity,
        Price: {
          UnitPrice: item.price,

          VAT: item.price * item.quantity * (cState.vat.vat / 100),
        },
      };
    });
    let billingInfo = cState.billingInfo;
    try {
      delete billingInfo.isShippingSameAsBilling;
    } catch (e) {
      console.log(e);
    }

    const OrderDetails = {
      PaymentMethod: paymentMethod,
      BillingInfo: {
        LegalName: billingInfo.LegalName,
        ContactName: billingInfo.ContactName,
        BillingCountry: billingInfo.Billing.Country,
        BillingCity: billingInfo.Billing.City,
        VAT: billingInfo.VAT_ID,
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
      PaidPrice: totalPrice + (cState.vat.vat / 100) * totalPrice,
      Order: {
        OrderType: cState.orderType,
        OrderId:
          cState.orderType === "duePayment"
            ? cState.duePaymentId
            : self.crypto.randomUUID(),
        Items: [
          ...formattedItems,
          ...formattedOptionalProducts,
          ...formattedFreeProducts,
        ],
      },
    };
    //"/api/rest/WebSite/complete-purchase"
    //"/api/payment/paypal/mock-request"
    setOrderDetails(OrderDetails);
    setIsOrderLoading(false);
    setIsLoading(false);
    return;
  };

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
              <PayPalHostedFieldsProvider
                styles={{
                  ".valid": { color: "#28a745" },
                  ".invalid": { color: "#dc3545" },
                  input: { "font-family": "monospace", "font-size": "16px" },
                }}
                createOrder={() => {
                  console.log("createOrder");
                  // Here define the call to create and order
                  return fetch("/api/payment/paypal/create-order", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(OrderDetails),
                  })
                    .then((response) => response.json())
                    .then((order) => order.id)
                    .catch((err) => {
                      console.log(err, "from order creation api");
                    });
                }}
              >
                <PayPalHostedField
                  id="card-number"
                  className="card-field"
                  style={CUSTOM_FIELD_STYLE}
                  hostedFieldType="number"
                  options={{
                    selector: "#card-number",
                    placeholder: "4111 1111 1111 1111",
                  }}
                />
                <PayPalHostedField
                  id="cvv"
                  className="card-field"
                  style={CUSTOM_FIELD_STYLE}
                  hostedFieldType="cvv"
                  options={{
                    selector: "#cvv",
                    placeholder: "123",
                    maskInput: true,
                  }}
                />
                <PayPalHostedField
                  id="expiration-date"
                  style={CUSTOM_FIELD_STYLE}
                  className="card-field"
                  hostedFieldType="expirationDate"
                  options={{
                    selector: "#expiration-date",
                    placeholder: "MM/YYYY",
                  }}
                />

                <SubmitPayment customStyle={{}} />
              </PayPalHostedFieldsProvider>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const SubmitPayment = ({ customStyle }) => {
  const [paying, setPaying] = useState(false);
  const cardHolderName = useRef(null);
  const hostedField = usePayPalHostedFields();

  const handleClick = () => {
    if (!hostedField?.cardFields) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalHostedFieldsProvider />";

      action(ERROR)(childErrorMessage);
      throw new Error(childErrorMessage);
    }
    const isFormInvalid =
      Object.values(hostedField.cardFields.getState().fields).some(
        (field) => !field.isValid
      ) || !cardHolderName?.current?.value;

    if (isFormInvalid) {
      return alert("The payment form is invalid");
    }
    setPaying(true);
    hostedField.cardFields
      .submit({
        cardholderName: cardHolderName?.current?.value,
      })
      .then((data) => {
        // Your logic to capture the transaction
        fetch("url_to_capture_transaction", {
          method: "post",
        })
          .then((response) => response.json())
          .then((data) => {
            // Here use the captured info
          })
          .catch((err) => {
            // Here handle error
          })
          .finally(() => {
            setPaying(false);
          });
      })
      .catch((err) => {
        // Here handle error
        setPaying(false);
      });
  };

  return (
    <>
      <input
        id="card-holder"
        ref={cardHolderName}
        className="card-field"
        style={{ ...customStyle, outline: "none" }}
        type="text"
        placeholder="Full name"
      />
      <button
        className={`btn${paying ? "" : " btn-primary"}`}
        style={{ float: "right" }}
        onClick={handleClick}
      >
        {paying ? <div className="spinner tiny" /> : "Pay"}
      </button>
    </>
  );
};
