const paypal = require("@paypal/checkout-server-sdk");
import redirect from "../../../../lib/redirectService";
import sanitizeVAT from "../../../../lib/sanitizeVAT";
const Environment =
  process.env.NODE_ENV === "production" && process.env.PAYPAL_ENV === "live"
    ? paypal.core.LiveEnvironment
    : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(
  new Environment(
    process.env.PAYPAL_CLIENT_ID,
    process.env.PAYPAL_CLIENT_SECRET
  )
);

export default async function handler(req, res) {
  const { method, body } = req;

  if (method === "POST") {
    const { orderID, payerID, cState, loginToken } = body;

    const captureData = await capturePayment(
      orderID,
      payerID,
      cState,
      loginToken
    );
    console.log(captureData, "capture order data");
    console.log("/////////////END/////////////");

    if (captureData.status === "success") {
      res.status(200).json({ captureData, orderID, payerID });
    } else {
      res.status(422).json({ captureData, orderID, payerID });
    }
  }
}

async function capturePayment(orderId, payerId, cState, loginToken) {
  let request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  // Call API with your client and get a response for your call
  let response = null;
  try {
    response = await paypalClient.execute(request);
  } catch (err) {
    return err;
  }

  if (response.result.status === "COMPLETED") {
    sendOrderToKMWeb(cState, response.result, loginToken);
    return {
      status: "success",
    };
  } else {
    return {
      status: "error",
      error: true,
      message: response.result.status,
    };
  }
}

async function sendOrderToKMWeb(
  cState,
  orderDetailsFromPaypal,
  loginToken,
  paymentMethod = "paypal"
) {
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
        formattedOptionalProducts[optionalItemIndex].Quantity += item.quantity;
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
                    optionalItem.price * item.quantity * (cState.vat.vat / 100)
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
    PaymentMethod: paymentMethod,
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
    Transaction: {
      Id: orderDetailsFromPaypal?.purchase_units[0]?.payments?.captures[0]?.id,
      PaidPrice: Math.round(
        parseFloat(
          orderDetailsFromPaypal.purchase_units[0].payments.captures[0].amount
            .value
        ) * 100
      ),
      Payer: {
        FirstName: orderDetailsFromPaypal?.payer?.name?.given_name,
        LastName: orderDetailsFromPaypal?.payer?.name?.surname,
        Country: orderDetailsFromPaypal?.payer?.address?.country_code,
      },
    },
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
  console.log(
    "********START_OrderDetails_for_KM********",
    "OrderDetails",
    JSON.stringify(OrderDetails, null, 2),
    "********END_OrderDetails_for_KM********"
  );

  fetch(
    "http://" +
      process.env.BACKEND_HOST +
      "/kmweb" +
      "/WebSite/complete-purchase",
    {
      method: "POST",
      headers: {
        "Expected-Server-Version": "1.0.1",
      },
      body: JSON.stringify({ OrderDetails, LoginToken: loginToken }),
    }
  );

  // redirect(
  //   "/WebSite/complete-purchase",
  //   "POST",
  //   JSON.stringify({
  //     OrderDetails,
  //     LoginToken: loginToken,
  //   })
  // )
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}
