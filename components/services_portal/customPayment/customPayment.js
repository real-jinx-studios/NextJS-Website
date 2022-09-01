import styles from "./custom_payment.module.css";
import CustomInput from "../../inputs/customInput";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";

import priceFormatter from "../../utils/priceFormatter";
import { cartState } from "../../../lib/cartContext";

import { useProducts } from "../../../lib/productsContext";
import addProductsToCheckout from "../../../lib/addProductsToCheckout";
export default function CustomPayment() {
  const [selectedPayment, setSelectedPayment] = useState("SAToken");
  const [selectedType, setSelectedType] = useState("SAToken");
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [tokenQuantity, setTokenQuantity] = useState(50);

  const [tokenTier, setTokenTier] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);

  const router = useRouter();
  const { dispatch } = cartState();
  const { getProducts } = useProducts();

  const handleQuantityChange = (direction, value) => {
    let newQuantity = value;
    if (newQuantity === "") {
      newQuantity = 50;
    }

    newQuantity = parseInt(newQuantity);
    setTokenQuantity(newQuantity);
  };

  let tokenPrice = 60;
  useEffect(() => {
    if (tokenQuantity < 1500) {
      tokenPrice = 0.6;
      setTokenTier(0);
    } else if (tokenQuantity < 3000) {
      tokenPrice = 55;
      setTokenTier(1);
    } else if (tokenQuantity < 4500) {
      tokenPrice = 50;
      setTokenTier(2);
    } else if (tokenQuantity < 6000) {
      tokenPrice = 45;
      setTokenTier(3);
    } else if (tokenQuantity < 15000) {
      tokenPrice = 40;
      setTokenTier(4);
    } else if (tokenQuantity >= 15000) {
      tokenPrice = 30;
      setTokenTier(5);
    }
  }, [tokenQuantity]);

  const handlePaymentSelection = (type, payment) => {
    setSelectedPayment(payment);
    setSelectedType(type);
  };
  useEffect(() => {
    setIsLoading(true);
    getProducts().then((products) => {
      setProducts(products);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: "SET_CUSTOM_PAYMENT" });

    addProductsToCheckout(
      products.products,
      products.payments,
      [
        {
          ProductId: selectedType,
          Name: selectedType,
          Price: {
            UnitPrice: selectedType === "SAToken" ? tokenPrice : currentPrice,
            VAT: 0,
          },
          ProductOptions: {
            type: selectedPayment,
          },
          Quantity: selectedType === "SAToken" ? tokenQuantity : 1,
          WorkstationIds: [],
          FreeProducts: [],
          OptionalProducts: [],
          PaymentPlan: "lifetime",
        },
      ],
      dispatch
    );

    router.push("/checkout");
  };

  return (
    <div className={styles.content}>
      <style jsx>{`
        .token-input-wrapper {
          display: flex;
          gap: 1em;
        }
        .token-price {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .token-price span {
          font-size: 1.1rem;
          line-height: 1.5rem;
          font-weight: 500;
          color: var(--clr-neutral-500);
        }
      `}</style>
      <div className={styles.title_wrapper}>
        <h2>Custom Payment and Tokens Purchase</h2>
      </div>

      <div className={styles.content_inner_custom_payment}>
        <form className={styles.custom_payment_form} onSubmit={handleSubmit}>
          <CustomInput
            type="radio"
            placeholder="Installment"
            id="Installment"
            name="custom-payment"
            default="Installment"
            checked={selectedPayment === "installment"}
            handleChange={() => handlePaymentSelection("Custom", "installment")}
          />
          <CustomInput
            type="radio"
            placeholder="Support"
            id="Support"
            name="custom-payment"
            default="Support"
            checked={selectedPayment === "support"}
            handleChange={() => handlePaymentSelection("Custom", "support")}
          />
          <CustomInput
            type="radio"
            placeholder="Upgrade"
            id="Upgrade"
            name="custom-payment"
            default="Upgrade"
            checked={selectedPayment === "upgrade"}
            handleChange={() => handlePaymentSelection("Custom", "upgrade")}
          />
          <CustomInput
            type="radio"
            placeholder="Tokens"
            id="SAToken"
            name="custom-payment"
            default="SAToken"
            checked={selectedPayment === "SAToken"}
            handleChange={() => handlePaymentSelection("SAToken", "SAToken")}
          />
          <CustomInput
            type="radio"
            placeholder="Other"
            id="Other"
            name="custom-payment"
            default="Other"
            checked={selectedPayment === "other"}
            handleChange={() => handlePaymentSelection("Custom", "other")}
          />
          <div className="padding-block-s">
            {selectedPayment === "SAToken" ? (
              <div className="token-input-wrapper">
                <div className={styles.token_field}>
                  <CustomInput
                    type="text"
                    placeholder="Min. 50 tokens"
                    value={tokenQuantity}
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
                </div>
                <div className="token-price">
                  <small>{tokenQuantity} tokens</small>
                  <small>✖</small>
                  <small>{priceFormatter(tokenPrice)}</small>
                  <span>=</span>
                  <span>{priceFormatter(tokenQuantity * tokenPrice)}</span>
                </div>
              </div>
            ) : (
              <div className="info-price variable">
                <CustomInput
                  type="text"
                  placeholder="Custom price (min. €0.01)"
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
          </div>
          {!isLoading && (
            <button
              className="button button_basic_long_on_light_bg margin-block-s"
              type="submit"
            >
              MAKE PAYMENT
            </button>
          )}
        </form>
        <div
          className={`${styles.custom_payment_token_wrapper} ${
            selectedPayment === "SAToken" ? styles.visible : ""
          }`}
          aria-hidden={selectedPayment !== "SAToken"}
        >
          <table className={styles.token_price_table}>
            <thead>
              <tr>
                <th className="align-left">Num. Tokens</th>
                <th className="align-right">Price per Token</th>
              </tr>
            </thead>
            <tbody>
              <tr className={tokenTier === 0 ? styles.active_tier : ""}>
                <td className="align-left">50 - 1499</td>
                <td className="align-right">€0.60</td>
              </tr>
              <tr className={tokenTier === 1 ? styles.active_tier : ""}>
                <td className="align-left">1500 - 2999</td>
                <td className="align-right">€0.55</td>
              </tr>
              <tr className={tokenTier === 2 ? styles.active_tier : ""}>
                <td className="align-left">3000 - 4499</td>
                <td className="align-right">€0.50</td>
              </tr>
              <tr className={tokenTier === 3 ? styles.active_tier : ""}>
                <td className="align-left">4500 - 5999</td>
                <td className="align-right">€0.45</td>
              </tr>
              <tr className={tokenTier === 4 ? styles.active_tier : ""}>
                <td className="align-left">6000 - 14999</td>
                <td className="align-right">€0.40</td>
              </tr>
              <tr className={tokenTier === 5 ? styles.active_tier : ""}>
                <td className="align-left">15000+</td>
                <td className="align-right">€0.30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
