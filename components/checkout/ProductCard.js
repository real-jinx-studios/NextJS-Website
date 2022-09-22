import { Fragment, useEffect, useState } from "react";
import priceFormatter from "../utils/priceFormatter";
import CustomInput from "../inputs/customInput";
import OptionalProduct from "./OptionalProduct";
import { cartState, saveStateLocal } from "../../lib/cartContext";
import { formatMultiplierTable } from "../../lib/quantityPriceMultiplier";
import {
  checkIfShippable,
  checkIfHardwareIdRequired,
  generateItemCustomKey,
} from "../../lib/checkCartItems";
import ErrorBoundaryMissingComponent from "../errors/ErrorBoundaryMissingComponent";
import { useProducts } from "../../lib/productsContext";
import quantityPriceMultiplier from "../../lib/quantityPriceMultiplier";
import CustomInputRadio from "../inputs/CustomInputRadio";
export default function ProductCard({
  setIsAddProductModalOpen,
  product,

  index,
  paymentPlans,
  paymentTaxes,
  productReferenceId = null,
  isEditMode = false,
  hasPresets = false,
  presetProduct = {},
  selectedProduct,
  setSelectedProduct,
}) {
  const { cState, dispatch } = cartState();
  const { getProduct, getPayment, getPayments } = useProducts();

  const { id, name, options, supportedPayments, preferences, visible } =
    product;

  //state and effect for overlay animation transition opacity and then remove the overlay based on selectedProduct prop
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  useEffect(() => {
    if (selectedProduct !== id) {
      setIsOverlayVisible(true);
    } else {
      setTimeout(() => {
        setIsOverlayVisible(false);
      }, 300);
    }
  }, [selectedProduct]);

  const [selectedOptions, setSelectedOptions] = useState(() => {
    if (options.length > 0) {
      return { [options[0].id]: [options[0].values[0].id] };
    }
    return {};
  });
  const [paymentPlansLocal, setPaymentPlansLocal] = useState(() => {
    if (options.length > 0) {
      if (options[0].values[0]?.supportedPayments) {
        if (options[0].values[0].supportedPayments.length > 0) {
          return options[0].values[0].supportedPayments;
        }
      }
    }
    return supportedPayments;
  });
  const [paymentPlan, setPaymentPlan] = useState(() => {
    if (hasPresets) {
      return presetProduct.paymentPlan;
    }

    return supportedPayments[0];
  });
  const [paymentOption, setPaymentOption] = useState(
    paymentPlan !== "installment"
      ? ""
      : cState.checkout.installmentCount === 0
      ? ""
      : cState.checkout.installmentPlan
  );
  const [currentPrice, setCurrentPrice] = useState(() => {
    if (hasPresets) {
      return presetProduct.price;
    }

    if (preferences.custom.length > 0 && product.options.length > 0) {
      if (
        JSON.stringify({
          [product.options[0].id]: [product.options[0].values[0].id],
          supportedPayments: [product.supportedPayments[0]],
        }) in preferences.custom &&
        preferences.custom.find((x) => x.key === customKey)[
          JSON.stringify({
            [product.options[0].id]: [product.options[0].values[0].id],
            supportedPayments: [product.supportedPayments[0]],
          })
        ].price
      )
        return preferences.custom.find((x) => x.key === customKey)[
          JSON.stringify({
            [product.options[0].id]: [product.options[0].values[0].id],
            supportedPayments: [product.supportedPayments[0]],
          })
        ].price;
    }
    return preferences.defaults.price || 1;
  });

  const [quantity, setQuantity] = useState(() => {
    if (hasPresets) {
      return presetProduct.quantity;
    }

    return id === "SAToken" ? 50 : 1;
  });
  const [optionalProducts, setOptionalProducts] = useState([]);
  const [selectedOptionalProducts, setSelectedOptionalProducts] = useState(
    () => {
      if (hasPresets) {
        return presetProduct.optionalProducts;
      }
      return [];
    }
  );
  const [freeProducts, setFreeProducts] = useState([]);
  const [rentDuration, setRentDuration] = useState(() => {
    if (hasPresets) {
      return presetProduct.rentDuration;
    }
    return 1;
  });

  const [installmentPlan, setInstallmentPlan] = useState(() => {
    if (paymentPlan !== "installment") {
      if (supportedPayments.indexOf("insallment") > -1) {
        return paymentPlans.find((x) => x.id === "installment")?.options[0]
          .default;
      } else {
        return 12;
      }
    } else if (cState.checkout.installmentCount === 0) {
      if (supportedPayments.indexOf("insallment") > -1) {
        return paymentPlans.find((x) => x.id === "installment")?.options[0]
          .default;
      } else {
        return 12;
      }
    } else {
      return cState.checkout.installmentPlan;
    }
  });

  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [paymentPlanDetails, setPaymentPlanDetails] = useState(() => {
    if (hasPresets) {
      return presetProduct.paymentPlanDetails;
    }

    return paymentPlans.find((p) => p.id === supportedPayments[0]).options;
  });
  useEffect(() => {
    //this makes sure that if a payment plan is already in the cart that this object has that value selected and correctly passed on to the cart
    if (paymentPlan === "installment" && cState.checkout.installmentCount > 0) {
      let planOptionsArray = paymentPlans.find(
        (p) => p.id === "installment"
      ).options;

      planOptionsArray.find(
        (o) => o.id === "period" && o.type === "discrete"
      ).currentValue = cState.checkout.installmentPlan;

      setPaymentPlanDetails(planOptionsArray);
      setPaymentOption(cState.checkout.installmentPlan);
    }
  }, [paymentPlan]);

  const handleAddItemClick = (e) => {
    const cartItemData = {
      id,
      name,
      quantity: quantity || 1,
      options: selectedOptions,
      basePrice: currentPrice,
      price: currentPrice,
      rentDuration: (() => {
        let duration = 1;
        if (paymentPlanDetails.length > 0 && paymentPlan === "rent") {
          duration =
            paymentPlanDetails.find((option) => option.id === "period")
              .currentValue ||
            paymentPlanDetails.find((option) => option.id === "period").default;
          duration = duration / 30;
        }
        return duration;
      })(),
      optionalProducts: selectedOptionalProducts,
      availableOptionalProducts: optionalProducts,
      freeProducts,
      paymentPlan,
      paymentOption,
      paymentPlanDetails,
      paymentTaxes,
      product,
      quantityMultiplierTable: formatMultiplierTable(
        product.preferences.defaults.quantityMultiplierTable
      ),
      hardwareIds: [],
      shippableCount: checkIfShippable(
        preferences,
        selectedOptions,
        paymentPlan,
        paymentOption,
        selectedOptionalProducts,
        freeProducts
      ),
      hardwareIdCount: checkIfHardwareIdRequired(
        preferences,
        selectedOptions,
        paymentPlan,
        paymentOption,
        selectedOptionalProducts,
        freeProducts
      ),
    };

    if (productReferenceId) {
      cartItemData.productReferenceId = productReferenceId;
      const newProductReferenceId =
        id +
        "-" +
        paymentPlan +
        "-" +
        JSON.stringify(selectedOptions) +
        "-" +
        rentDuration +
        "-" +
        JSON.stringify(selectedOptionalProducts);
      dispatch({
        type: "UPDATE_ITEM",
        payload: {
          item: cartItemData,
          newProductReferenceId,
        },
      });
      saveStateLocal(cState);

      setIsAddProductModalOpen(false);

      return;
    }

    cartItemData.productReferenceId =
      id +
      "-" +
      paymentPlan +
      "-" +
      JSON.stringify(selectedOptions) +
      "-" +
      rentDuration +
      "-" +
      JSON.stringify(selectedOptionalProducts);

    dispatch({
      type: "ADD_ITEM_NEW",
      payload: cartItemData,
    });
    saveStateLocal(cState);
    setIsAddProductModalOpen(false);
  };

  const handlePriceChange = () => {
    if (!preferences.custom.length > 0) {
      return;
    }

    if (!paymentPlansLocal.includes(paymentPlan)) {
      console.log("payment plan not supported");
      setPaymentPlan(paymentPlansLocal[0]);
      setPaymentOption("");
      return;
    }
    console.log(
      "payment plan supported",
      selectedOptions,
      paymentPlan,
      paymentOption
    );

    let customKey = generateItemCustomKey(
      selectedOptions,
      paymentPlan,
      paymentOption
    );

    console.log(customKey, "from handle price change");

    handleOptionalProducts(customKey);
    handleFreeProducts(customKey);
    let price = preferences.defaults.price;

    if (preferences.custom.length > 0) {
      try {
        price = preferences.custom.find((x) => x.key === customKey).price;
      } catch (e) {
        console.log(e);
        price = preferences.defaults.price;
      }
    }
    setCurrentPrice(price || preferences.defaults.price);
  };
  const handleOptionalProducts = (customKey) => {
    let optionalProductsVar = preferences.defaults.optionalProducts;
    if (preferences.custom.length > 0) {
      try {
        optionalProductsVar = preferences.custom.find(
          (x) => x.key === customKey
        ).optionalProducts;
        if (!optionalProductsVar) {
          throw new Error("No optional products");
        }
      } catch (e) {
        console.log(e);
        optionalProductsVar = preferences.defaults.optionalProducts;
      }
    }

    setOptionalProducts(
      optionalProductsVar || preferences.defaults.optionalProducts
    );
  };

  const handleFreeProducts = (customKey) => {
    let freeProductsVar = preferences.defaults.freeProducts || [];

    if (preferences.custom.length > 0) {
      try {
        freeProductsVar = preferences.custom.find(
          (x) => x.key === customKey
        ).freeProducts;

        if (!freeProductsVar) {
          throw new Error("No free products");
        }
      } catch (e) {
        freeProductsVar = preferences.defaults.freeProducts;
      }
    }

    const freeProductsObjects = freeProductsVar.map((fp) => {
      const product = getProduct(fp);

      return {
        id: product.id,
        name: product.name,
        price: 0,
        quantity: 1,
        shippable: product.preferences.defaults.shippable,
        workstationId: product.preferences.defaults.workstationId,
      };
    });

    setFreeProducts(freeProductsObjects);
  };
  useEffect(() => {
    handlePriceChange();
  }, [selectedOptions, paymentPlan, paymentOption, rentDuration]);

  useEffect(() => {
    //set additional charges for each optional product
    selectedOptionalProducts.forEach((opp) => {
      setAdditionalCharges(additionalCharges + opp.price * quantity);
    });
  }, [selectedOptionalProducts]);
  useEffect(() => {
    setRentDuration(() => {
      let duration = 1;
      if (paymentPlanDetails.length > 0 && paymentPlan === "rent") {
        duration =
          paymentPlanDetails.find((option) => option.id === "period")
            .currentValue ||
          paymentPlanDetails.find((option) => option.id === "period").default;
        duration = duration / 30;
      }
      return duration;
    });
  }, [paymentPlanDetails]);

  const handleQuantityChange = (direction, value) => {
    if (direction === "up") {
      if (quantity < 999999) {
        setQuantity(quantity + 1);
      }
    } else if (direction === "down") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    } else if (direction === "set") {
      let newQuantity = value;
      if (newQuantity === "") {
        newQuantity = 0;
      }
      if (newQuantity > 999999) {
        newQuantity = 999998;
      }

      newQuantity = parseInt(newQuantity);

      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product_card">
      <style jsx>{`
        .product_card {
          display: grid;
          position: relative;

          padding: 1.3em;
          background-color: var(--clr-white);
          border-radius: 0.5em;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
          grid-template-areas:
            "image name name price price"
            "license license license license license"
            "special special special special special"
            "payment payment payment payment payment"
            "installment installment installment installment installment"
            "duration duration duration duration duration"
            "add add add add add";
        }
        .product_card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--clr-neutral-50);
          z-index: 2;
          overflow: hidden;
          opacity: ${selectedProduct === id ? "0" : "1"};
          display: ${isOverlayVisible ? "block" : "none"};
          transition: opacity 0.25s ease-in-out;
        }
        .product_card-overlay-content {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1em;
          flex-direction: column;
          border: 1px solid transparent;
          border-radius: 0.5em;
          transition: all 0.3s ease-in-out;
        }
        .product_card-overlay-content:hover {
          cursor: pointer;
          gap: 2em;
          border: 1px solid var(--clr-${id});
        }
        .product_card-overlay-action {
          opacity: 0;
          border: 1px solid var(--clr-neutral-500);
          border-radius: 0.5em;
          padding: 0.3em 1em;
          background-color: var(--clr-neutral-50);
          transition: all 0.4s ease-in-out;
        }

        .product_card-overlay-content:hover .product_card-overlay-action {
          opacity: 1;
        }
        .product_card-overlay-action:hover {
          cursor: pointer;
          color: var(--clr-neutral-50);
          background-color: var(--clr-neutral-700);
        }

        .product_card-overlay-content::before {
          content: "${name.substring(0, name.length / 2)}";

          font-size: 22rem;
          line-height: 0.5;
          font-weight: 900;
          color: var(--clr-${id});
          position: absolute;
          top: 0.05em;
          left: -0.15em;
          opacity: 0.12;
          z-index: -1;
        }
        .product_card-overlay-content::after {
          content: "${name.substring(name.length / 2, name.length)}";

          font-size: 22rem;
          line-height: 0.5;
          font-weight: 900;
          color: var(--clr-${id});
          position: absolute;
          bottom: 0.08em;
          left: 0.1em;
          opacity: 0.12;
          z-index: -1;
        }
        .product_card-overlay-backgorund {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          z-index: -1;
        }
        .product_card-overlay-icon {
        }
        .overlay-title {
          font-size: 1.5em;
          font-weight: 700;
          line-height: 0.5;
          letter-spacing: 0.08em;
          color: var(--clr-neutral-800);
        }
        .overlay-description {
          font-size: 1.2em;
          font-weight: 400;
          color: var(--clr-neutral-600);
          text-align: center;
        }
        .product_card-icon {
          grid-area: image;
          width: max-content;

          border-radius: 50%;
          background-color: var(--clr-neutral-50);
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .product_card-icon img {
          width: 3em;
          object-fit: contain;
        }

        .info-title {
          grid-area: name;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .info-title .title {
          font-size: 1.1rem;
          font-weight: 400;
          margin-bottom: 0;
          line-height: 1.5;
          color: var(--clr-neutral-800);
        }
        .info-title .descritption {
          font-size: 1rem;
          color: var(--clr-neutral-700);
        }

        .info-product-variations label,
        .info-add-product-special label {
          margin-left: 0.5em;
        }
        .info-add-product-special {
          grid-area: special;
          display: flex;

          justify-content: flex-start;
          align-items: center;
          margin-bottom: 0.8em;
        }

        .info-add-product {
          position: relative;
          grid-area: add;
          display: flex;
          justify-content: space-around;
          align-items: center;
          margin-top: auto;
          ${product.id !== "SAToken" ? "" : "flex-direction: column-reverse;"}
        }
        .info-add-product-special {
          grid-area: special;
          width: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: column;
        }
        .license-options,
        .payment-options,
        .installment-options,
        .duration-options,
        .payment-plan-options {
          grid-area: payment;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 0.5em;
          margin-bottom: 1.3em;
        }
        .license-options {
          grid-area: license;
        }
        .installment-options {
          grid-area: installment;
        }
        .payment-plan-options {
          grid-area: installment;
        }
        .options-title,
        .license-title {
          margin: 0;
          font-size: 1.1rem;
          color: var(--clr-neutral-800);
        }

        .license-wrapper {
          display: flex;
          width: 100%;

          justify-content: space-around;
          align-items: flex-start;
          margin: 0.8em 0;
        }
        .options-wrapper,
        .options-values {
          width: 100%;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          justify-content: space-around;
        }

        .duration-options {
          grid-area: duration;
        }
        .rent-duration-control {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 3em;
          margin-bottom: 0.8em;
          border-radius: 0.5em;
          background-color: var(--clr-neutral-50);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
            0 1px 2px rgba(0, 0, 0, 0.24);
        }
        .value {
          color: var(--clr-neutral-600);
          padding: 0 0.5em;
          user-select: none;
          pointer-events: none;
        }

        .value > span {
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }

        .increase,
        .decrease {
          cursor: pointer;
          width: 2em;
          height: 2em;
          border: 1px solid var(--clr-neutral-200);

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8em;
          color: var(--clr-neutral-600);
          transition: all 0.2s ease-in-out;
        }
        .increase svg,
        .decrease svg {
          stroke: var(--clr-neutral-500);
        }
        .increase:hover,
        .decrease:hover {
          background-color: var(--clr-primary);
          color: var(--clr-neutral-800);
          border: 1px solid var(--clr-primary);
        }
        .increase:hover svg,
        .decrease:hover svg {
          stroke: var(--clr-neutral-50);
        }
        .product-quantity {
          position: absolute;
          top: 50%;
          right: 0;
          width: 1em;
          height: 1em;
          border-radius: 50%;
          transform: translateY(-50%);

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.98rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
          user-select: none;
          pointer-events: none;
        }

        .product-quantity::after {
          content: attr(data-quantity);
          position: absolute;
          top: 0;
          right: 0;
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        /* cart quantity css from cart item */

        .increase,
        .decrease {
          cursor: pointer;
          width: 25px;
          height: 25px;
          border: 1px solid var(--clr-neutral-200);

          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.8em;
          color: var(--clr-neutral-600);
          transition: all 0.2s ease-in-out;
        }
        .increase svg,
        .decrease svg {
          stroke: var(--clr-neutral-500);
        }
        .increase:hover,
        .decrease:hover {
          background-color: var(--clr-primary);
          color: var(--clr-neutral-800);
          border: 1px solid var(--clr-primary);
        }
        .quantity-control {
          ${product.id !== "SAToken" ? "" : "margin-bottom:2em;"}

          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          flex-direction: column;
        }
        .quantity-label span {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--clr-neutral-600);
        }
        .quantity-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <div
        className="product_card-overlay"
        onClick={() => {
          if (typeof setSelectedProduct === "function") {
            setSelectedProduct(id);
          }
        }}
      >
        <div className="product_card-overlay-content">
          <div className="product_card-overlay-backgorund"></div>
          <div className="product_card-overlay-icon">
            <img
              src={`/images/icons/${id}.png`}
              alt={`${name} icon`}
              width="68px"
              height="68px"
            />
          </div>
          <span className="overlay-title">{name}</span>
          <span className="overlay-description">
            {preferences?.defaults?.productDescription}
          </span>

          <div className="product_card-overlay-action">Show more</div>
        </div>
      </div>
      <div className="product_card-icon">
        <img
          src={`/images/icons/${id}.png`}
          alt={`${name} icon`}
          width="48px"
          height="48px"
        />
      </div>
      <div className="info-title">
        <span className="title">{name}</span>
        <span className="description">
          {preferences?.defaults?.productDescription}
        </span>
      </div>

      {preferences?.defaults?.customPrice === false ? (
        <PriceBreakdown
          currentPrice={currentPrice}
          quantity={quantity}
          selectedOptionalProducts={selectedOptionalProducts}
          paymentPlan={paymentPlan}
          rentDuration={rentDuration}
          installmentPlan={installmentPlan}
          quantityMultiplierTable={formatMultiplierTable(
            product.preferences.defaults.quantityMultiplierTable
          )}
        />
      ) : (
        <div className="info-price variable">
          <CustomInput
            type="text"
            placeholder="Custom price"
            name="customPrice"
            id="custom-price"
            special="price"
            value={priceFormatter(currentPrice)}
            handleBlur={(e) => {
              if (currentPrice < 1) {
                setCurrentPrice(1);
              }
            }}
            handleChange={(e) => {
              setCurrentPrice(e.target.value.replace(/[^0-9]/g, ""));
            }}
          />
        </div>
      )}
      {options.map((option, index) => {
        return (
          <div className="license-options" key={option.name + index}>
            <h3 className="license-title">{option.name}:</h3>
            <div className="flex-center-sa">
              {option.values.map((value, i) => (
                <div key={value.id + i}>
                  <CustomInputRadio
                    labelText={value.name}
                    key={value.id + i + value.name}
                    id={name + value.id}
                    name={name + option.name}
                    defaultChecked={
                      hasPresets
                        ? presetProduct.options[option.id].indexOf(value.id) >
                          -1
                        : !option.default
                        ? i === 0
                        : option.default === value.id
                    }
                    value={value.id}
                    onChange={(e) => {
                      setSelectedOptions({
                        ...selectedOptions,
                        [option.id]: [value.id],
                      });
                      setAdditionalCharges(0);
                      setSelectedOptionalProducts([]);

                      if (
                        value.supportedPayments &&
                        value.supportedPayments.length > 0
                      ) {
                        setPaymentPlansLocal(value.supportedPayments);
                      } else {
                        setPaymentPlansLocal(supportedPayments);
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {optionalProducts.length > 0 && (
        <div className="info-add-product-special">
          <h3 className="options-title">Add-ons:</h3>

          {optionalProducts.map((op, index) => {
            return (
              <ErrorBoundaryMissingComponent>
                <OptionalProduct
                  key={op}
                  product={op}
                  hasPresets={hasPresets}
                  presetProduct={presetProduct}
                  setSelectedOptionalProducts={setSelectedOptionalProducts}
                />
              </ErrorBoundaryMissingComponent>
            );
          })}
        </div>
      )}

      {paymentPlansLocal.length > 1 && (
        <div className="payment-options">
          <h3 className="options-title">Payment type:</h3>
          <div className="flex-center-sa">
            {paymentPlansLocal.map((plan, index) => {
              return (
                <div key={index + plan + name}>
                  <CustomInputRadio
                    key={index + plan + name + "radio"}
                    labelText={plan}
                    id={plan}
                    name={name}
                    defaultChecked={
                      hasPresets
                        ? presetProduct.paymentPlan === plan
                        : paymentPlan === plan
                        ? true
                        : index === 0
                    }
                    value={plan}
                    onChange={(e) => {
                      setPaymentPlan(plan);
                      setPaymentPlanDetails(
                        paymentPlans.find((option) => option.id === plan)
                          .options
                      );

                      setAdditionalCharges(0);
                      setSelectedOptionalProducts([]);
                      setPaymentOption(() => {
                        if (plan === "installment") {
                          return installmentPlan + "";
                        } else {
                          return "";
                        }
                      });
                      if (plan === "rent") {
                        setRentDuration(() => {
                          return (
                            paymentPlans.find((option) => option.id === plan)
                              ?.options[0].default / 30
                          );
                        });
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>
          {freeProducts.length > 0 && (
            <div className="info-add-product-special">
              {freeProducts.map((op, index) => {
                return (
                  <span>
                    *
                    <strong
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      {op?.name}
                    </strong>{" "}
                    included in the price.
                  </span>
                );
              })}
            </div>
          )}
        </div>
      )}
      {paymentPlans.find((plan) => plan.id === paymentPlan).options.length >
        0 && (
        <div className="payment-plan-options">
          <div className="flex-center-sa">
            {paymentPlans
              .find((plan) => plan.id === paymentPlan)
              .options.map((plan, index) => {
                return (
                  <div
                    key={index + plan.name}
                    style={{ width: "100%" }}
                    className="text-center"
                  >
                    <h3 className="options-title">{plan.name}</h3>
                    <div className="options-values">
                      {plan.type === "discrete" &&
                        plan.values.map((value, index) => {
                          return (
                            <div key={value.id + index + plan.name}>
                              <CustomInputRadio
                                labelText={value.name}
                                key={value.id + index + plan.name + "radio"}
                                id={value.id}
                                disabled={
                                  paymentPlan !== "installment"
                                    ? ""
                                    : cState.checkout.installmentCount === 0
                                    ? ""
                                    : cState.checkout.installmentPlan ===
                                      value.id
                                    ? ""
                                    : "true"
                                }
                                name={name + "_" + paymentPlan}
                                checked={
                                  hasPresets
                                    ? presetProduct.paymentOption ===
                                        value.id ||
                                      value.id === installmentPlan + ""
                                    : paymentPlan !== "installment"
                                    ? value.id === installmentPlan + ""
                                    : cState.checkout.installmentCount === 0
                                    ? value.id === installmentPlan + ""
                                    : cState.checkout.installmentPlan ===
                                      value.id
                                    ? "true"
                                    : value.id === installmentPlan + ""
                                    ? "true"
                                    : value.id === installmentPlan + ""
                                }
                                value={value.id}
                                onChange={(e) => {
                                  setPaymentOption(value.id);
                                  setPaymentPlanDetails((prev) => {
                                    return prev.map((option) => {
                                      if (option.id === plan.id) {
                                        return {
                                          ...option,
                                          currentValue: e.target.value,
                                        };
                                      }
                                      return option;
                                    });
                                  });
                                  if (paymentPlan === "installment") {
                                    setInstallmentPlan(e.target.value);
                                  }
                                }}
                              />
                            </div>
                          );
                        })}
                      {plan.type === "numeric" && (
                        <div className="rent-duration-control">
                          <div
                            className="decrease"
                            onClick={() =>
                              setPaymentPlanDetails((prev) => {
                                return prev.map((option) => {
                                  if (option.id === plan.id) {
                                    return {
                                      ...option,
                                      currentValue:
                                        option.currentValue === undefined
                                          ? plan.default
                                          : option.currentValue -
                                              plan.default >=
                                            plan.min
                                          ? option.currentValue - plan.default
                                          : option.currentValue,
                                    };
                                  }
                                  return option;
                                });
                              })
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20 12H4"
                              />
                            </svg>
                          </div>
                          <div className="value">
                            <span>
                              {paymentPlan === "rent" &&
                                (paymentPlanDetails.find(
                                  (option) => option.id === plan.id
                                ).currentValue || plan.default) / 30}
                              {paymentPlan !== "rent" &&
                                (paymentPlanDetails.find(
                                  (option) => option.id === plan.id
                                ).currentValue ||
                                  plan.default)}
                            </span>{" "}
                          </div>
                          <div
                            className="increase"
                            onClick={() =>
                              setPaymentPlanDetails((prev) => {
                                return prev.map((option) => {
                                  if (option.id === plan.id) {
                                    return {
                                      ...option,
                                      currentValue:
                                        option.currentValue === undefined
                                          ? plan.default + +plan.default
                                          : option.currentValue + plan.default <
                                            plan.max
                                          ? option.currentValue + plan.default
                                          : option.currentValue,
                                    };
                                  }
                                  return option;
                                });
                              })
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </div>
                        </div>
                      )}
                      {plan.type === "date" && (
                        <div className="rent-duration-control">
                          <CustomInput
                            type="date"
                            name="date"
                            id="date"
                            special="date"
                            value={
                              paymentPlanDetails.find(
                                (option) => option.id === plan.id
                              ).currentValue || plan.default
                            }
                            handleChange={(e) => {
                              setPaymentPlanDetails((prev) => {
                                return prev.map((option) => {
                                  if (option.id === plan.id) {
                                    return {
                                      ...option,
                                      currentValue: e.target.value,
                                    };
                                  }
                                  return option;
                                });
                              });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <div className="info-add-product">
        {!isEditMode && (
          <>
            <button
              className="button button_basic_long_on_light_bg add-product-button"
              onClick={handleAddItemClick}
              data-quantity={quantity}
            >
              Add
            </button>
          </>
        )}
        {isEditMode && (
          <>
            <button
              className="button button_basic_long_on_light_bg confirm-edit-product-button"
              onClick={handleAddItemClick}
            >
              Confirm
            </button>
            <button
              className="buy_now_button"
              onClick={() => setIsAddProductModalOpen(false)}
            >
              Cancel
            </button>
          </>
        )}
        <div className="quantity-control">
          <div className="quantity-label">
            <span>Quantity</span>
          </div>
          {product?.id !== "SAToken" && (
            <div className="quantity-wrapper">
              <div
                className="decrease"
                onClick={() => handleQuantityChange("down")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 12H4"
                  />
                </svg>
              </div>

              <div className="value">{quantity}</div>

              <div
                className="increase"
                onClick={() => handleQuantityChange("up")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          )}
          {product.id === "SAToken" && (
            <CustomInput
              cssBefore={
                "x " +
                priceFormatter(
                  quantityPriceMultiplier(
                    quantity,
                    formatMultiplierTable(
                      product.preferences.defaults.quantityMultiplierTable
                    )
                  ) * currentPrice
                )
              }
              type="text"
              placeholder="Min. 50 tokens"
              value={quantity}
              handleBlur={(e) => {
                if (e.target.value < 50) {
                  handleQuantityChange("set", 50);
                }
              }}
              handleChange={(e) =>
                handleQuantityChange(
                  "set",
                  e.target.value.replace(/[^0-9]/g, "")
                )
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

function PriceBreakdown({
  currentPrice,
  quantity,
  selectedOptionalProducts = [],
  paymentPlan,
  rentDuration,
  installmentPlan,
  quantityMultiplierTable,
}) {
  const multiplicationTable = quantityMultiplierTable;

  const multiplier = quantityPriceMultiplier(quantity, multiplicationTable);

  let modifiedPrice = Math.abs(Math.round(currentPrice * multiplier));
  const additionalCharges = selectedOptionalProducts.reduce((acc, curr) => {
    return acc + curr.price * quantity;
  }, 0);
  const totalPrice =
    modifiedPrice * quantity * rentDuration + additionalCharges;
  return (
    <div className="  info-price_wrapper ">
      <style jsx>{`
        .info-price_wrapper {
          grid-area: price;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 0 1rem;
        }
        .info-price_wrapper-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
        }

        .info-price {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3rem;
          font-weight: 500;
          flex-direction: column;
          position: relative;
        }
        .info-price_wrapper-inner::before {
          position: absolute;
          content: "";

          bottom: 0;
          right: 0;
          width: 100%;
          height: 3px;
          z-index: -1;
          border-radius: 998px;

          background-color: var(--clr-neutral-350);
        }
        .price {
        }
        .price-details {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 0.89rem;

          color: var(--clr-neutral-700);
        }
      `}</style>
      <div className="info-price_wrapper-inner">
        {paymentPlan === "installment" && <small>{installmentPlan} x</small>}
        <span className="info-price">{priceFormatter(totalPrice)}</span>
      </div>
    </div>
  );
}
