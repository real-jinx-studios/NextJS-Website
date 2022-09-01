import { useRouter } from "next/router";

import { promiseResolver } from "../../lib/promiseResolver";
import { cartState } from "../../lib/cartContext";
import Cookies from "js-cookie";

export default function PaymentOptions({ setIsLoading }) {
  const { cState, dispatch } = cartState();
  const router = useRouter();

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

    const formattedOptionalProducts = optionalProducts.map((item) => {
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

      console.log(item.hardwareIds, "item.hardwareIds", index);

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
      PaidPrice: 0,
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
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 0.68em;
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
      `}</style>

      <div className="paypal_button_container">
        <h3 className="custom_payment_section_title">Payment Method:</h3>
        <div className="paypal_button_container_inner">
          <button
            onClick={() => handlePaymentSubmit("paypal")}
            className="paypal_button"
          >
            <img
              src="/images/icons/paypal.svg"
              alt="Paypal"
              width={80}
              height={40}
            />
          </button>
          <button
            onClick={() => handlePaymentSubmit("credit")}
            className="card_payment"
          >
            Debit or credit card
          </button>
        </div>
      </div>
    </div>
  );
}
