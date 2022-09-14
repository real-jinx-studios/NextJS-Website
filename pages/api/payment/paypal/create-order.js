import { generateAccessToken } from "./client-token";

const paypal = require("@paypal/checkout-server-sdk");
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
    //get order object from body and create order

    const cState = body;

    console.log("/////////////START/////////////");
    console.log("******legal_name: ", cState.billingInfo.LegalName);
    console.log("******contact_name: ", cState.billingInfo.ContactName);

    const order = !cState.payWhatYouWant.isPayWhatYouWant
      ? await createOrder(cState)
      : await createOrderFake(cState);
    if (order.error) {
      res.status(500).json(order);
    } else {
      res.status(200).json(order);
    }
  }
}

async function createOrder(cState) {
  const request = new paypal.orders.OrdersCreateRequest();
  let items = [];

  let total = cState.items.reduce((sum, item) => {
    let rentDuration = item.rentDuration || 1;
    let optionalProductsPrice = item.optionalProducts.reduce((sum, product) => {
      return sum + product.price * item.quantity;
    }, 0);

    items.push({
      name:
        item.name +
        " " +
        Object.keys(item.options).map((option) => item.options[option][0]) +
        " " +
        item.paymentPlan +
        " " +
        (item.paymentPlan === "installment"
          ? cState.checkout.installmentPlan
          : item.paymentPlan === "rent"
          ? item.rentDuration + "mnt(s)."
          : ""),
      quantity: item.quantity,
      unit_amount: {
        currency_code: "EUR",
        value: ((item.price * rentDuration) / 100).toFixed(2),
      },

      category:
        item.ProductId === "HardwareKey" ? "PHYSICAL_GOODS" : "DIGITAL_GOODS",
    });
    item.optionalProducts.forEach((product) => {
      items.push({
        name: product.name,
        quantity: item.quantity,
        unit_amount: {
          currency_code: "EUR",
          value: (product.price / 100).toFixed(2),
        },
        category:
          product.ProductId === "HardwareKey"
            ? "PHYSICAL_GOODS"
            : "DIGITAL_GOODS",
      });
    });

    return (
      sum + item.price * item.quantity * rentDuration + optionalProductsPrice
    );
  }, 0);

  console.log(
    cState.vat.isVat,
    cState.vat.isVat === true,
    cState.vat.isVat === "true"
  );

  if (cState.vat.isVat) {
    items.push({
      name: "VAT",
      quantity: 1,
      unit_amount: {
        currency_code: "EUR",
        value: (
          ((cState.vat.isValid && cState.vat.substractVAT
            ? 0
            : cState.vat.vat / 100) *
            total) /
          100
        ).toFixed(2),
      },
      category: "DIGITAL_GOODS",
    });

    total =
      total +
      (cState.vat.isValid && cState.vat.substractVAT
        ? 0
        : cState.vat.vat / 100) *
        total;
  }

  if (cState.checkout.installmentCount > 0) {
    items.push({
      name: "Installment Fee",
      quantity: 1,
      unit_amount: {
        currency_code: "EUR",
        value: (cState.checkout.installmentPlanFee / 100).toFixed(2),
      },
      category: "DIGITAL_GOODS",
    });

    total =
      total +
      (cState.checkout.installmentCount > 0
        ? cState.checkout.installmentPlanFee
        : 0);
  }

  let paypalOrderObject = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: (total / 100).toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: (total / 100).toFixed(2),
            },
          },
        },
        items,
        custom_id:
          cState.orderType === "duePayment"
            ? cState.duePaymentId
            : cState.orderId,
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
      cancel_url: "http://localhost:3000/checkout/failed",
      return_url: "https://localhost:3000/checkout/success",
    },
  };

  if (cState.checkout.shipping) {
    paypalOrderObject.purchase_units[0].shipping = {
      address: {
        country_code: cState.shippingInfo.CountryCode,
        address_line_1: cState.shippingInfo.Shipping.Address,
        address_line_2: "",
        admin_area_2: cState.shippingInfo.Shipping.City,
        postal_code: cState.shippingInfo.Shipping.PostCode,
      },
      name: {
        full_name: cState.shippingInfo.Shipping.RecipientName,
      },
    };
  }
  request.prefer("return=representation");
  request.requestBody(paypalOrderObject);

  try {
    const order = await paypalClient.execute(request);
    console.log(order, "order");
    return { id: order.result.id };
  } catch (e) {
    console.log(e, "error in create order");
    return { error: e.message };
  }
}

async function createOrderFake(cState) {
  const request = new paypal.orders.OrdersCreateRequest();

  let paypalOrderObject = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "EUR",
          value: (cState.payWhatYouWant.price / 100).toFixed(2),
        },

        custom_id:
          cState.orderType === "duePayment"
            ? cState.duePaymentId
            : cState.orderId,
        [cState.checkout.shipping ? "shipping" : ""]: {
          address: {
            country_code: cState.shippingInfo.CountryCode,
            address_line_1: cState.shippingInfo.Shipping.Address,
            address_line_2: "",
            admin_area_2: cState.shippingInfo.Shipping.City,
            postal_code: cState.billingInfo.Billing.PostCode,
          },
          name: {
            full_name: cState.shippingInfo.Shipping.RecipientName,
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
  };

  if (cState.checkout.shipping) {
    paypalOrderObject.purchase_units[0].shipping = {
      address: {
        country_code: cState.shippingInfo.CountryCode,
        address_line_1: cState.shippingInfo.Shipping.Address,
        address_line_2: "",
        admin_area_2: cState.shippingInfo.Shipping.City,
        postal_code: cState.shippingInfo.Shipping.PostCode,
      },
      name: {
        full_name: cState.shippingInfo.Shipping.RecipientName,
      },
    };
  }
  request.prefer("return=representation");
  request.requestBody(paypalOrderObject);

  try {
    const order = await paypalClient.execute(request);
    console.log(
      "********ORDER_START********",
      JSON.stringify(order, null, 2),
      "********ORDER_END********"
    );
    return { id: order.result.id };
  } catch (e) {
    console.log(e, "error in create order");
    return { error: e.message };
  }
}
