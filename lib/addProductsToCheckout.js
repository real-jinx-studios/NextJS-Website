import { checkIfShippable, checkIfHardwareIdRequired } from "./checkCartItems";
import { generateItemCustomKey } from "./checkCartItems";
export default function addProductsToCheckout(
  paymentTaxes,
  products,
  payments,
  items,
  dispatch,
  cState
) {
  const formattedItems = formatProductsForCart(
    paymentTaxes,
    products,
    payments,
    items
  );

  if (typeof cState === "object") {
    if (cState.orderType === "duePayment") {
      dispatch({ type: "CLEAR_CART" });
    }
  }

  formattedItems.forEach((formattedItem) => {
    dispatch({
      type: "ADD_ITEM_NEW",
      payload: formattedItem,
    });
  });
}

export function formatProductsForCart(
  paymentTaxes = {},
  products = [],
  payments = [],
  items = []
) {
  let tempFormattedItems = [];

  items.forEach((item) => {
    const product = products.find((prd) => prd.id === item.ProductId);

    let optionalProducts = [];
    const name = product.name;
    let freeProducts = [];

    if (item.OptionalProducts.length > 0) {
      optionalProducts = item.OptionalProducts.map((optionalProduct) => {
        let pr = products.find((product) => product.id === optionalProduct);
        let it = items.find((itm) => itm.ProductId === optionalProduct);

        return {
          id: pr.id,
          name: pr.name,
          quantity: item.Quantity,
          price: it.Price.UnitPrice,
          shippable: pr.preferences.defaults.shippable,
          workstationId: pr.preferences.defaults.workstationId,
        };
      });
    }
    if (item.FreeProducts.length > 0) {
      freeProducts = item.FreeProducts.map((freeProduct) => {
        let pr = products.find((product) => product.id === freeProduct);

        return {
          id: pr.id,
          name: pr.name,
          quantity: item.Quantity,
          price: 0,
          shippable: pr.preferences.defaults.shippable,
          workstationId: pr.preferences.defaults.workstationId,
        };
      });
    }
    let options = {};
    Object.keys(item.ProductOptions).forEach((key) => {
      options[key] = [item.ProductOptions[key]];
    });
    const paymentOption =
      item.PaymentPlan === "installment" ? item.PaymentPlanOptions.period : "";

    let paymentPlanDetails = [];

    payments.forEach((payment) => {
      if (payment.id === item.PaymentPlan) {
        paymentPlanDetails = payment.options;
      }
    });

    if (item?.PaymentPlanOptions) {
      Object.keys(item.PaymentPlanOptions).forEach((key) => {
        paymentPlanDetails.forEach((paymentPlanDetail) => {
          if (paymentPlanDetail.id === key) {
            if (item.paymentPlan === "installment") {
              paymentPlanDetail.currentValue = item.PaymentPlanOptions.period;
            } else {
              paymentPlanDetail.currentValue = item.PaymentPlanOptions[key];
            }
          }
        });
      });
    }

    item.paymentPlan = item.PaymentPlan;

    let customKey = generateItemCustomKey(
      options,
      item.PaymentPlan,
      paymentOption
    );
    let optionalProductsVar = product.preferences.defaults.optionalProducts;
    if (product.preferences.custom.length > 0) {
      try {
        optionalProductsVar = product.preferences.custom.find(
          (x) => x.key === customKey
        ).optionalProducts;
        if (!optionalProductsVar) {
          throw new Error("No optional products");
        }
      } catch (e) {
        console.log(e);
        optionalProductsVar = product.preferences.defaults.optionalProducts;
      }
    }
    const availableOptionalProducts =
      optionalProductsVar || product.preferences.defaults.optionalProducts;

    let freeProductsVar = product.preferences.defaults.freeProducts;
    if (product.preferences.custom.length > 0) {
      try {
        freeProductsVar = product.preferences.custom.find(
          (x) => x.key === customKey
        ).freeProducts;
        if (!freeProductsVar) {
          throw new Error("No free products");
        }
      } catch (e) {
        console.log(e);
        freeProductsVar = product.preferences.defaults.freeProducts;
      }
    }
    const availableFreeProducts =
      freeProductsVar || product.preferences.defaults.freeProducts;

    console.log("availableFreeProducts", availableFreeProducts);

    const cartItemData = {
      id: item.ProductId,
      name: name,
      options,

      selectedOptions: {},
      availableOptionalProducts,
      price: item.Price.UnitPrice,
      basePrice: item?.basePrice || item.Price.UnitPrice,
      rentDuration: (() => {
        let duration = 1;
        if (paymentPlanDetails.length > 0 && item.paymentPlan === "rent") {
          duration =
            paymentPlanDetails.find((option) => option.id === "period")
              .currentValue ||
            paymentPlanDetails.find((option) => option.id === "period").default;
          duration = duration / 30;
        }
        return duration;
      })(),
      quantity: item.Quantity || 1,
      installmentPlan:
        item.PaymentPlan === "installment"
          ? item.PaymentPlanOptions.period
          : "",
      optionalProducts,
      freeProducts,
      additionalCharges: 0,
      paymentPlan: item.PaymentPlan,
      paymentOption,
      paymentPlanDetails,
      paymentTaxes,
      product,
      quantityMultiplierTable: item?.quantityMultiplierTable || {
        "-1": 1,
      },

      hardwareIds: [],
      shippableCount: checkIfShippable(
        product.preferences,
        options,
        item.PaymentPlan,
        paymentOption,
        optionalProducts,
        freeProducts
      ),
      hardwareIdCount: checkIfHardwareIdRequired(
        product.preferences,
        options,
        item.PaymentPlan,
        paymentOption,
        optionalProducts,
        freeProducts
      ),
    };

    cartItemData.productReferenceId =
      cartItemData.id +
      "-" +
      cartItemData.paymentPlan +
      "-" +
      JSON.stringify(cartItemData.selectedOptions) +
      "-" +
      cartItemData.rentDuration +
      "-" +
      JSON.stringify(cartItemData.optionalProducts);

    tempFormattedItems.push(cartItemData);
  });

  return tempFormattedItems;
}
