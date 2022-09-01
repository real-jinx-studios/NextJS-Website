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

export default function PaymentOptionsPaypal({ setIsLoading }) {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  const { cState, dispatch } = cartState();
  const router = useRouter();
  const [OrderDetails, setOrderDetails] = useState(null);
  const [isOrderLoading, setIsOrderLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    handlePaymentSubmit("paypal");
  }, []);

  const handlePaymentSubmit = async (paymentMethod) => {
    setIsLoading(true);
    let shippableCount = cState.checkout.shippableCount;

    let totalPrice = 0;

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
          formattedOptionalProducts[optionalItemIndex].Price.VAT =
            (optionalItem.price *
              formattedOptionalProducts[optionalItemIndex].Quantity *
              cState.vat.vat) /
            100;
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
              VAT: (optionalItem.price * item.quantity * cState.vat.vat) / 100,
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

          VAT:
            item.price * item.quantity * rentDuration * (cState.vat.vat / 100),
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
      PaidPrice:
        totalPrice +
        (cState.vat.isValid && cState.vat.substractVAT
          ? 0
          : cState.vat.vat / 100) *
          totalPrice,
      Order: {
        OrderType: cState.orderType,
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
    //"/api/rest/WebSite/complete-purchase"
    //"/api/payment/paypal/mock-request"
    setOrderDetails(OrderDetails);
    setIsOrderLoading(false);
    setIsLoading(false);
    return;

    const result = await promiseResolver(
      fetch("/api/rest/WebSite/complete-purchase", {
        method: "POST",
        body: JSON.stringify({ OrderDetails, LoginToken: Cookies.get("uat") }),
      })
    );

    if (result[0].status === 200) {
      const { data } = await result[0];

      await router.replace("/checkout/success");

      dispatch({ type: "COMPLETE_PURCHASE" });
      setIsLoading(false);
    } else if (result[0].status === 400) {
      await router.replace("/checkout/failed");
      dispatch({ type: "COMPLETE_PURCHASE" });
      setIsLoading(false);
    } else {
      console.log("error");
      setIsLoading(false);
    }
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
                createOrder={(data, actions) => {
                  console.log(OrderDetails);
                  if (cState.payWhatYouWant.isPayWhatYouWant === true) {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "EUR",
                            value: (cState.payWhatYouWant.price / 100).toFixed(
                              2
                            ),
                          },

                          custom_id: OrderDetails.Order.OrderId,
                          [cState.checkout.shipping ? "shipping" : ""]: {
                            address: {
                              country_code: cState.shippingInfo.CountryCode,
                              address_line_1:
                                cState.shippingInfo.Shipping.Address,
                              address_line_2: "",
                              admin_area_2: cState.shippingInfo.Shipping.City,
                              postal_code:
                                cState.shippingInfo.Shipping.PostalCode,
                            },
                            name: {
                              full_name:
                                cState.shippingInfo.Shipping.RecipientName,
                            },
                          },
                        },
                      ],
                      payer: {
                        email_address: cState.billingInfo.Email,
                        address: {
                          country_code: cState.vat.code,
                          address_line_1: cState.billingInfo.Billing.Address,
                          address_line_2: "",
                          admin_area_2: cState.billingInfo.Billing.City,
                          postal_code: cState.billingInfo.Billing.PostCode,
                        },
                      },
                      application_context: {
                        brand_name: "EZTitles",
                        landing_page: "BILLING",
                        payment_method: {
                          payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
                        },
                        shipping_preference: cState.checkout.shipping
                          ? "SET_PROVIDED_ADDRESS"
                          : "NO_SHIPPING",
                        user_action: "PAY_NOW",
                        cancel_url: "https://www.eztitles.com/checkout/failed",
                        return_url: "https://www.eztitles.com/checkout/success",
                      },
                    });
                  }

                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "EUR",
                          value: (OrderDetails.PaidPrice / 100).toFixed(2),
                          breakdown: {
                            item_total: {
                              currency_code: "EUR",
                              value: (OrderDetails.PaidPrice / 100).toFixed(2),
                            },
                          },
                        },
                        items: OrderDetails.Order.Items.map((item) => {
                          let rentDuration = 1;
                          if (item.PaymentPlan === "rent") {
                            rentDuration = item.PaymentPlanOptions.period / 30;
                          }

                          return {
                            name: item.Name,
                            quantity: item.Quantity,
                            unit_amount: {
                              currency_code: "EUR",
                              value: (
                                (item.Price.UnitPrice * rentDuration +
                                  (cState.vat.isValid && cState.vat.substractVAT
                                    ? 0
                                    : (cState.vat.vat / 100) *
                                      item.Price.UnitPrice *
                                      rentDuration)) /
                                100
                              ).toFixed(2),
                            },
                            category:
                              item.ProductId === "HardwareKey"
                                ? "PHYSICAL_GOODS"
                                : "DIGITAL_GOODS",
                          };
                        }),
                        custom_id: OrderDetails.Order.OrderId,
                        [cState.checkout.shipping ? "shipping" : ""]: {
                          address: {
                            country_code: cState.shippingInfo.CountryCode,
                            address_line_1:
                              cState.shippingInfo.Shipping.Address,
                            address_line_2: "",
                            admin_area_2: cState.shippingInfo.Shipping.City,
                            postal_code:
                              cState.shippingInfo.Shipping.PostalCode,
                          },
                          name: {
                            full_name:
                              cState.shippingInfo.Shipping.RecipientName,
                          },
                        },
                      },
                    ],
                    payer: {
                      email_address: cState.billingInfo.Email,
                      address: {
                        country_code: cState.vat.code,
                        address_line_1: cState.billingInfo.Billing.Address,
                        address_line_2: "",
                        admin_area_2: cState.billingInfo.Billing.City,
                        postal_code: cState.billingInfo.Billing.PostCode,
                      },
                    },
                    application_context: {
                      brand_name: "EZTitles",
                      landing_page: "BILLING",
                      payment_method: {
                        payee_preferred: "IMMEDIATE_PAYMENT_REQUIRED",
                      },
                      shipping_preference: cState.checkout.shipping
                        ? "SET_PROVIDED_ADDRESS"
                        : "NO_SHIPPING",
                      user_action: "PAY_NOW",
                      cancel_url: "https://www.eztitles.com/checkout/failed",
                      return_url: "https://www.eztitles.com/checkout/success",
                    },
                  });
                }}
                onApprove={(data, actions) => {
                  const ass = actions.order.capture().then(async (details) => {
                    console.log(details);

                    //const name = details.payer.name.given_name;
                    dispatch({ type: "COMPLETE_PURCHASE" });
                    fetch("/api/rest/WebSite/complete-purchase", {
                      method: "POST",
                      body: JSON.stringify({
                        OrderDetails: {
                          ...OrderDetails,

                          Transaction: {
                            Id: details?.purchase_units[0]?.payments
                              ?.captures[0]?.id,
                            PaidPrice: Math.round(
                              parseFloat(
                                details?.purchase_units[0]?.amount?.value
                              ) * 100
                            ),
                            Payer: {
                              FirstName: details?.payer?.name?.given_name,
                              LastName: details?.payer?.name?.surname,
                              Country: details?.payer?.address?.country_code,
                            },
                          },
                        },
                        LoginToken: Cookies.get("uat"),
                      }),
                    });
                    await router.push("/checkout/success");
                  });

                  return ass;
                }}
                onCancel={(data) => {
                  console.log(data);
                }}
                onError={(err) => {
                  console.log(err);
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
