import React, { Fragment, useEffect, useRef, useState } from "react";

import { cartState } from "../../lib/cartContext";
import ErrorBoundary from "../errors/ErrorBoundary";
import AddProductToCheckoutModal from "../modal/AddProductToCheckoutModal";
import GenericModal from "../modal/GenericModal";
import ParrotLoader from "../utils/ParrotLoader";
import priceFormatter from "../utils/priceFormatter";
import CustomInput from "../inputs/customInput";
import checkIfVat from "../../lib/checkIfVat";
import CartItem from "./CartItem";
export default function Cart({
  isCartEditable = true,
  setIsCartEditable,

  cartType = "general",
}) {
  const { cState, dispatch } = cartState();

  // const stateVat = checkIfVat(cState.userInfo.Billing.Country);
  const stateVat = checkIfVat(cState.vat.country);
  const vatValid = cState.vat.isValid;

  const isInstallment = cartType === "installment";
  const isCartLocked = cState.isCartPreloaded || cState.cartLocked;
  const [isClearCartModalOpen, setIsClearCartModalOpen] = useState(false);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  //handle and calculate total prices

  const items = cState.isLoadingDefault ? (
    <ParrotLoader />
  ) : (
    cState?.items.map((itm, index) => {
      if (itm.paymentPlan !== "installment") {
        return (
          <CartItem
            key={itm.productReferenceId + index}
            item={itm}
            isCartEditable={isCartEditable}
            isCartLocked={isCartLocked}
            index={index}
          />
        );
      }
    })
  );
  const installmentItems = cState.isLoadingDefault ? (
    <ParrotLoader />
  ) : (
    cState?.items.map((itm, index) => {
      if (itm.paymentPlan === "installment") {
        return (
          <CartItem
            key={itm.productReferenceId + index}
            item={itm}
            isCartEditable={isCartEditable}
            isCartLocked={isCartLocked}
            index={index}
          />
        );
      }
    })
  );
  const totalPrice = cState.items.reduce(
    (acc, item) =>
      acc +
      item.price * item.quantity * item.rentDuration +
      item.optionalProducts.reduce(
        (acc, curr) => acc + curr.price * item.quantity,
        0
      ),
    0
  );

  return (
    <ErrorBoundary>
      <div className="cart">
        <style jsx>{`
          .cart {
            position: sticky;
            top: var(--offset-top);
          }
          .edit_actions {
            display: flex;
            align-items: center;
            justify-content: space-around;

            margin-bottom: 1em;
          }
          .cart-empty-button {
            position: relative !important;
            font-size: 1.1em;
            cursor: pointer;
            font-weight: 500;
            color: var(--clr-warn);
          }
          .cart-empty-button::before {
            position: absolute;
            content: "";
            bottom: -2px;
            left: 0;
            width: 100%;
            height: 2px;
            transform: scaleX(0);
            background-color: var(--clr-warn);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .cart-empty-button:hover::before {
            transform: scaleX(1);
          }
          .cart__empty-section{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-top: 2em;

          }
          .cart__empty-title{
            text-align: center;
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--clr-neutral-800);
            margin-bottom: 1em;

          }
          .cart__empty-subtitle{
            text-align: center;
            font-size: 1.2rem;
            font-weight: 500;
            color: var(--clr-neutral-500);
            margin-bottom: 1em;

          }

          .vat-cleared {
            position: relative;
          }
          .vat-cleared::before {
            position: absolute;
            content: "";
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 100%;
            height: 2px;
            background-color: var(--clr-neutral-800);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .vat-cleared:after {
            position: absolute;
            content: "VAT CLEARED ";
            font-size: 0.8em;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 0.5em;
            background-color: var(--clr-neutral-50);

        `}</style>
        <div className="cart__inner">
          <div className="cart__title-section">
            <h2 className="cart__title"> Order Summary</h2>
            <span
              className="cart-empty-button"
              onClick={() => {
                setIsClearCartModalOpen(true);
              }}
            >
              {" "}
              empty cart
            </span>
          </div>

          <div className={"cart__items-section"}>
            {cState.isLoadingDefault ? <ParrotLoader /> : items}
          </div>
          {cState.checkout.installmentCount > 0 && (
            <div className="cart__items-section installment">
              <div className="installment-section-header">
                <h3>installments</h3>
                <InstallmentHeader />
                <span className="intallment-price-step">
                  intallment plan duration:{" "}
                  <strong>{cState.checkout.installmentPlan} months</strong>
                </span>
                <br />

                {cState.items.map(
                  (item, index) =>
                    item.paymentPlan === "installment" && (
                      <span key={index} className="intallment-price-step">
                        {item.quantity} ( {item.name}{" "}
                        {Object.keys(item.options).map((option, index) => (
                          <span
                            className="font-size-xs"
                            key={index + item.options[option][0]}
                          >
                            {item.options[option][0]}
                          </span>
                        ))}{" "}
                        ) x {priceFormatter(item.price * item.quantity)}
                      </span>
                    )
                )}
                <span className="intallment-price-step">
                  1 installment fee x{" "}
                  {priceFormatter(cState.checkout.installmentPlanFee)}
                </span>
                <span className="intallment-price-total">
                  Total installment:{" "}
                  {priceFormatter(
                    cState.items.reduce(
                      (acc, item) =>
                        acc +
                        (item.paymentPlan === "installment"
                          ? item.price * item.quantity
                          : 0),
                      0
                    ) + cState.checkout.installmentPlanFee
                  )}{" "}
                  <small>(w/o vat)</small> x{" "}
                  {cState.checkout.installmentPlan / 3} times{" "}
                </span>
              </div>
              {cState.isLoadingDefault ? <ParrotLoader /> : installmentItems}
            </div>
          )}
          {cState.items.length === 0 && (
            <div className="cart__empty-section">
              <h3 className="cart__empty-title">
                Your cart is empty.
                <br />
                <span className="cart__empty-subtitle">
                  Add products to your cart.
                </span>
              </h3>
            </div>
          )}

          {!isCartLocked && (
            <div className="edit_actions">
              <button
                className="button button_basic_long_on_light_bg"
                onClick={() => setIsAddProductModalOpen(true)}
                id="add-product-button"
              >
                add item
              </button>
            </div>
          )}
          <div className="cart__sum">
            <div className="cart__sum__title flex justify-sb">
              <span className="font-size-m">subtotal: </span>
              <span className="font-size-m">{priceFormatter(totalPrice)}</span>
            </div>
            {cState.vat.isVat && (
              <div
                className={`cart__sum__title flex justify-sb ${
                  cState.vat.isVat &&
                  cState.vat.isValid &&
                  cState.vat.substractVAT
                    ? "vat-cleared"
                    : ""
                }`}
              >
                <span className="font-size-m">VAT {cState.vat.vat} %: </span>
                <span className="font-size-m">
                  {priceFormatter(
                    cState.items.reduce(
                      (acc, item) =>
                        acc + item.price * item.quantity * item.rentDuration,
                      0
                    ) *
                      (cState.vat.vat / 100)
                  )}
                </span>
              </div>
            )}
            {cState.checkout.installmentCount > 0 && (
              <div className="cart__sum__title flex justify-sb">
                <span className="font-size-m">installment fee: </span>
                <span className="font-size-m">
                  {priceFormatter(cState.checkout.installmentPlanFee)}
                </span>
              </div>
            )}
            <div className="cart__sum__title-total flex justify-sb font-bold">
              <span
                onClick={() => modalRef.current.show()}
                className="font-size-ml"
              >
                TOTAL:{" "}
              </span>
              <span className="font-size-ml">
                {priceFormatter(
                  totalPrice +
                    (cState.checkout.installmentCount > 0
                      ? cState.checkout.installmentPlanFee
                      : 0) +
                    (cState.vat.isVat
                      ? totalPrice *
                        (!cState.vat.isValid
                          ? cState.vat.vat / 100
                          : cState.vat.substractVAT
                          ? 0
                          : cState.vat.vat / 100)
                      : 0)
                )}
              </span>
            </div>
            <PayWhatYouWant />
            <SelectCheckoutCountry />
          </div>
        </div>
        <GenericModal
          open={isAddProductModalOpen}
          onClose={() => setIsAddProductModalOpen(false)}
        >
          <AddProductToCheckoutModal
            setIsAddProductModalOpen={setIsAddProductModalOpen}
          />
        </GenericModal>
        {isClearCartModalOpen && (
          <ClearCartWarning
            dispatch={dispatch}
            setIsClearCartModalOpen={setIsClearCartModalOpen}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

function InstallmentHeader() {
  const { cState, dispatch } = cartState();

  const installment12Ref = useRef();
  const installment24Ref = useRef();
  const installment36Ref = useRef();

  const handleInstallmentSelect = (e) => {
    const installment = e;
    if (installment === 12) {
      dispatch({ type: "UPDATE_INSTALLMENT_PLAN", payload: "12" });
    } else if (installment === 24) {
      dispatch({ type: "UPDATE_INSTALLMENT_PLAN", payload: "24" });
    } else if (installment === 36) {
      dispatch({ type: "UPDATE_INSTALLMENT_PLAN", payload: "36" });
    }
  };
  useEffect(() => {
    handleInstallmentSelect(cState.checkout.installmentPlan);
  }, [cState.checkout.installmentPlan]);

  return (
    <div className="cart-installment-section">
      <style jsx>{`
        .editable {
        }
        .cart-installment-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .installment-section_title {
          grid-column: 1/-1;
          text-align: center;
        }
        .installment-section_title h3 {
          color: var(--clr-neutral-800);
          font-size: 1.2em;
          font-weight: 500;
          margin: 0;
        }
        .installment-plan-options {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5em;
        }
        .installment {
        }
        .installment_option {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0.3em 0.5em;
          margin: 0.5em;
          background-color: var(--clr-neutral-50);
          border: 1px solid var(--clr-neutral-200);
        }
        .installment_option * {
          user-select: none;
          pointer-events: none;
        }
        .installment_option:hover {
          border: 1px solid var(--clr-neutral-500);
        }
        .installment_option p {
          color: var(--clr-neutral-600);
          margin: 0;
        }
        .installment_option:hover p {
          color: var(--clr-neutral-800);
        }
        .installment_option.active {
          border: 1px solid var(--clr-primary);
        }
        .installment_option.active p {
          color: var(--clr-primary);
          font-weight: 500;
        }
      `}</style>
      {cState.orderType !== "duePayment" && (
        <>
          {" "}
          <div className="installment-section_title">
            <h3>Installment plans</h3>
          </div>
          <div className="installment-plan-options">
            {" "}
            <div
              className={`installment_option ${
                cState.checkout.installmentPlan === "12" ? "active" : ""
              }`}
              data-installment="12"
              onClick={() => {
                handleInstallmentSelect(12);
              }}
              ref={installment12Ref}
            >
              <p>12 months</p>
            </div>
            <div
              className={`installment_option ${
                cState.checkout.installmentPlan === "24" ? "active" : ""
              }`}
              data-installment="24"
              onClick={() => {
                handleInstallmentSelect(24);
              }}
              ref={installment24Ref}
            >
              <p>24 months</p>
            </div>
            <div
              className={`installment_option ${
                cState.checkout.installmentPlan === "36" ? "active" : ""
              }`}
              data-installment="36"
              onClick={() => {
                handleInstallmentSelect(36);
              }}
              ref={installment36Ref}
            >
              <p>36 months</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function PayWhatYouWant() {
  const [currentPrice, setCurrentPrice] = useState(0);
  const { cState, dispatch } = cartState();
  return (
    <div className="pay-what-you-want">
      <style jsx>{`
        .pay-what-you-want {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          gap: 1.2em;
          margin-top: 1.5em;
        }
        .pay-what-you-want h4 {
          color: var(--clr-neutral-800);
          font-size: 1.2em;
          font-weight: bold;
          margin: 0;
          position: relative;
          padding: 0 0.3em;
          background-color: var(--clr-neutral-50);
        }
        .pay-what-you-want h4::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          width: 200%;
          z-index: -1;
          height: 1px;
          background-color: var(--clr-neutral-700);
        }
      `}</style>
      <h4>OR</h4>
      <span>💊 just pay what you want 💊</span>

      <CustomInput
        type="text"
        placeholder="if > €0.00 the use ⬆this⬆ amount"
        name="customPrice"
        id="custom-price"
        special="price"
        value={priceFormatter(currentPrice)}
        handleBlur={(e) => {
          let isCustomPrice = false;
          if (currentPrice > 0) {
            isCustomPrice = true;
          }
          dispatch({
            type: "SET-PAY-WHAT-YOU-WANT",
            payload: {
              price: currentPrice,
              isPayWhatYouWant: isCustomPrice,
            },
          });
        }}
        handleChange={(e) => {
          setCurrentPrice(e.target.value.replace(/[^0-9]/g, ""));
        }}
      />
    </div>
  );
}

function SelectCheckoutCountry() {
  const { dispatch } = cartState();
  const [selectedCountry, setSelectedCountry] = useState("");
  const listOfCountryCodes = [
    { code: "", icon: "🏴‍☠️" },
    { code: "US", icon: "🇺🇸", locale: "en_US" },
    { code: "FR", icon: "🇫🇷", locale: "fr_FR" },
    { code: "DE", icon: "🇩🇪", locale: "de_DE" },
    { code: "IT", icon: "🇮🇹", locale: "it_IT" },
    { code: "IN", icon: "🇮🇳", locale: "en_IN" },
    { code: "JP", icon: "🇯🇵", locale: "ja_JP" },
    { code: "CN", icon: "🇨🇳", locale: "zh_CN" },
    { code: "UK", icon: "🇬🇧", locale: "en_GB" },
  ];
  const handleClick = (country) => {
    dispatch({
      type: "SET-CHECKOUT-COUNTRY",
      payload: {
        code: country.code,
        locale: country.locale,
      },
    });
    setSelectedCountry(country.code);
  };

  return (
    <div className="select-checkout-country-wrapper">
      <style jsx>{`
        .select-checkout-country-wrapper {
          margin-top: 2.2em;
        }
        .select-checkout-country {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          width: 100%;
          gap: 0.5em;
          margin-top: 1.5em;
        }
        .country-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 2.8em;
          height: 2em;
          border-radius: 9px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s ease-in-out;
          border: 2px solid var(--clr-neutral-250);
        }
        .country {
          font-size: 3rem;

          line-height: 1.3;
          padding: 0;
          margin: 0;
          user-select: none;
          pointer-events: none;
        }
        .selected {
          transform: scale(1.2);
          border: 3px solid var(--clr-primary);
        }
        .title {
          font-size: 1.2rem;
          text-align: center;
          color: var(--clr-neutral-800);
        }
      `}</style>
      <h4 className="title">Select paypal browser country</h4>
      <div className="select-checkout-country">
        {listOfCountryCodes.map((country) => (
          <div
            onClick={() => handleClick(country)}
            className={`country-wrapper ${
              country.code === selectedCountry ? "selected" : ""
            }`}
          >
            <icon className={`country `}>{country.icon}</icon>
          </div>
        ))}
      </div>
    </div>
  );
}

function ClearCartWarning({ dispatch, setIsClearCartModalOpen }) {
  // ask if user want to clear cart
  return (
    <div className="clear-cart-warning">
      <style jsx>{`
        .clear-cart-warning {
          width: 100%;

          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 5;
          border-radius: 9px;
          overflow: hidden;
        }
        .clear-cart-warning-wrapper {
          display: flex;
          flex-direction: column;

          align-items: center;
          width: 100%;
          height: 100%;
          gap: 1.2em;
          position: relative;
          padding-top: 50%;
        }
        .clear-cart-warning-background {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          opacity: 0.8;
          overflow: hidden;
          background-color: var(--clr-neutral-800);
        }

        .clear-cart-warning-background::after {
          content: "X";
          font-weight: bold;
          font-size: 80rem;
          line-height: 1;
          color: var(--clr-neutral-50);
          position: absolute;
          opacity: 0.18;
          top: 50%;
          left: 50%;
          z-index: -1;
          transform: translateY(-50%) translateX(-50%);
        }
        .clear-cart-warning h4 {
          color: var(--clr-neutral-50);
          font-size: 1.68em;
          font-weight: bold;
          margin: 0;
          position: relative;
          padding: 0 0.3em;
        }
      `}</style>
      <div className="clear-cart-warning-wrapper">
        <div className="clear-cart-warning-background"></div>
        <h4>Remove all items from your cart?</h4>

        <button
          className="button"
          onClick={() => {
            dispatch({
              type: "CLEAR_CART",
            });
            setIsClearCartModalOpen(false);
          }}
        >
          Clear cart
        </button>
        <button
          className="buy_now_button"
          onClick={() => setIsClearCartModalOpen(false)}
        >
          cancel
        </button>
      </div>
    </div>
  );
}
