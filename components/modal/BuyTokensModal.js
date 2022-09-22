import { useEffect, useRef, useState } from "react";

import CustomInput from "../inputs/customInput";
import ParrotLoader from "../utils/ParrotLoader";
import { useProducts } from "../../lib/productsContext";
import { cartState } from "../../lib/cartContext";
import quantityPriceMultiplier, {
  formatMultiplierTable,
} from "../../lib/quantityPriceMultiplier";
import addProductsToCheckout from "../../lib/addProductsToCheckout";
import LoaderDots from "../utils/loaderDots";
import priceFormatter from "../utils/priceFormatter";
import { useRouter } from "next/router";
export default function BuyTokensModal({ setIsCreateWalletOpen, forceUpdate }) {
  const [isLoading, setIsLoading] = useState(false);

  const [quantity, setQuantity] = useState(50);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(50 * 0.6);
  const [tokenProduct, setTokenProduct] = useState(null);
  const [quantityMultiplierTable, setQuantityMultiplierTable] = useState([]);
  const { getProducts } = useProducts();
  const { cState, dispatch } = cartState();
  const router = useRouter();

  useEffect(() => {
    const getProductsCall = async () => {
      const data = await getProducts();
      setProducts(data);
      //from products find product with id SAToken and save it
      const tkProduct = data.products.find(
        (product) => product.id === "SAToken"
      );
      setTokenProduct(tkProduct);
      setQuantityMultiplierTable(
        formatMultiplierTable(
          tkProduct.preferences.defaults.quantityMultiplierTable
        )
      );
      calculatePrice(tkProduct, 50);
      setIsProductsLoading(false);
    };
    getProductsCall();
  }, []);

  const handleQuantityChange = (value) => {
    let newQuantity = value;
    if (newQuantity === "") {
      newQuantity = 0;
    }

    newQuantity = parseInt(newQuantity);
    setQuantity(newQuantity);
  };

  useEffect(() => {
    if (tokenProduct) {
      calculatePrice(tokenProduct, quantity);
    }
  }, [quantity]);

  const calculatePrice = (tkProduct, qty) => {
    const multiplicationTable = quantityMultiplierTable;

    const multiplier = quantityPriceMultiplier(qty, multiplicationTable);

    const totalPrice = Math.abs(
      Math.round(tkProduct.preferences.defaults.price * multiplier)
    );

    setCurrentPrice(totalPrice);
  };

  const handleBuyTokens = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    addProductsToCheckout(
      products.paymentTaxes,
      products.products,
      products.payments,
      [
        {
          ProductId: "SAToken",
          Name: "SAToken",
          basePrice: tokenProduct.preferences.defaults.price,
          Price: {
            UnitPrice: currentPrice,
            VAT: 0,
          },
          ProductOptions: {},
          Quantity: quantity,
          WorkstationIds: [],
          FreeProducts: [],
          OptionalProducts: [],
          PaymentPlan: "lifetime",
          quantityMultiplierTable,
        },
      ],
      dispatch,
      cState
    );

    await router.push("/checkout");
    setIsLoading(false);
  };
  return (
    <div className="create_wallet_wrapper flex-center-center-column">
      <style jsx>{`
        .buy-tokens-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2em;
          flex-wrap: wrap;
          margin-bottom: 2em;
        }
        .token-input {
          margin-bottom: 1em;
        }

        .create_wallet-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--clr-neutral-800);
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
        .token-price-total {
          font-size: 1.5rem !important;
          font-weight: bold !important;
          color: var(--clr-neutral-800) !important;
        }
        .token-buy_action {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .token_price_table {
          width: 100%;
          border-collapse: collapse;
        }
        .token_price_table > thead > tr th {
          border-bottom: 1px solid var(--clr-neutral-550);
          margin-bottom: 0.5em;
          color: var(--clr-neutral-800);
        }
        .token_price_table > tbody > tr {
          transition: all 0.3s ease;
        }
        .token_price_table th {
          padding: 0.5em 0.8em;
        }
        .token_price_table td {
          padding: 0.3em 0.8em;
        }
        .active_tier {
          background-color: var(--clr-neutral-800);
          color: var(--clr-neutral-50);
        }
      `}</style>
      <h2 className="create_wallet-title">Buy Subtitling Assistant Tokens:</h2>
      <div className="create_wallet-form">
        {!isProductsLoading ? (
          <form onSubmit={handleBuyTokens}>
            <div className="buy-tokens-wrapper">
              {" "}
              <div className="token-input-wrapper">
                <div className="token-input">
                  <CustomInput
                    type="text"
                    disabled={isLoading}
                    placeholder="Min. 50 tokens"
                    value={quantity}
                    handleBlur={(e) => {
                      if (e.target.value < 50) {
                        handleQuantityChange(50);
                      }
                    }}
                    handleChange={(e) =>
                      handleQuantityChange(
                        e.target.value.replace(/[^0-9]/g, "")
                      )
                    }
                  />
                </div>
                {!isProductsLoading && (
                  <div className="token-price">
                    <small>{quantity} tokens</small>
                    <small>✖</small>
                    <small>{priceFormatter(currentPrice)}</small>
                    <span>=</span>
                    <span className="token-price-total">
                      {priceFormatter(quantity * currentPrice)}
                    </span>
                  </div>
                )}
              </div>{" "}
              <div className="cart-item_multiplication-table">
                <table className="token_price_table">
                  <thead>
                    <tr>
                      <th className="align-left">Num. Tokens</th>
                      <th className="align-right">Price per Token</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(quantityMultiplierTable).map((key, index) => {
                      return (
                        <tr
                          className={
                            index === 0
                              ? quantity <= key && "active_tier"
                              : index ===
                                Object.keys(quantityMultiplierTable).length - 1
                              ? quantity >
                                  Object.keys(quantityMultiplierTable)[
                                    index - 1
                                  ] && "active_tier"
                              : quantity >
                                  Object.keys(quantityMultiplierTable)[
                                    index - 1
                                  ] &&
                                quantity <= key &&
                                "active_tier"
                          }
                          key={key}
                        >
                          {
                            <td className="align-left">
                              {index === 0
                                ? "50 - " + key
                                : index ===
                                  Object.keys(quantityMultiplierTable).length -
                                    1
                                ? parseInt(
                                    Object.keys(quantityMultiplierTable)[
                                      index - 1
                                    ]
                                  ) +
                                  1 +
                                  "+"
                                : parseInt(
                                    Object.keys(quantityMultiplierTable)[
                                      index - 1
                                    ]
                                  ) +
                                  1 +
                                  " - " +
                                  key}
                            </td>
                          }

                          <td className="align-right">
                            {priceFormatter(
                              quantityMultiplierTable[key] *
                                tokenProduct.preferences.defaults.price
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            {!isLoading && (
              <div className="token-buy_action">
                {" "}
                <button
                  type="submit"
                  className="button button_basic_long_on_light_bg"
                >
                  TO CHECKOUT
                </button>
              </div>
            )}
            {isLoading && <LoaderDots size="m" />}
          </form>
        ) : (
          <ParrotLoader size="m" color="system" />
        )}
      </div>
    </div>
  );
}
