import { useState, useEffect, Fragment } from "react";
import { cartState } from "../../lib/cartContext";
import priceFormatter from "../utils/priceFormatter";
import GenericModal from "../modal/GenericModal";
import ProductCard from "./ProductCard";
import CustomInput from "../inputs/customInput";
import quantityPriceMultiplier from "../../lib/quantityPriceMultiplier";
import { useProducts } from "../../lib/productsContext";

export default function CartItem({
  item,
  isCartEditable,
  isCartLocked,
  index,
  hideTokenTable,
}) {
  const { cState, dispatch } = cartState();
  const { getPayments } = useProducts();
  const paymentPlans = getPayments();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const {
    id,
    name,
    price,
    basePrice,
    options,
    quantity,
    rentDuration,
    paymentPlan,
    paymentTaxes,
    paymentOption,
    paymentPlanDetails,
    optionalProducts,
    freeProducts,
    product,
    quantityMultiplierTable,
    productReferenceId,
  } = item;

  const orderType = cState.orderType;

  const handleItemDelete = () => {
    dispatch({ type: "REMOVE_ITEM", payload: productReferenceId });
  };

  const handleQuantityChange = (direction, value) => {
    if (direction === "up") {
      if (quantity < 999999) {
        dispatch({
          type: "INCREMENT_ITEM",
          payload: {
            productReferenceId,
          },
        });
      }
    } else if (direction === "down") {
      if (quantity > 1) {
        dispatch({
          type: "DECREMENT_ITEM",
          payload: {
            productReferenceId,
          },
        });
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

      dispatch({
        type: "SET_ITEM_QUANTITY",
        payload: {
          productReferenceId,
          quantity: newQuantity,
        },
      });
    }
  };
  useEffect(() => {
    const multiplicationTable = quantityMultiplierTable;

    const multiplier = quantityPriceMultiplier(quantity, multiplicationTable);

    const totalPrice = Math.abs(Math.round(basePrice * multiplier));

    dispatch({
      type: "UPDATE_PRICE",
      payload: {
        productReferenceId,
        price: totalPrice,
      },
    });
  }, [quantity]);

  return (
    <div className="cart-item-wrapper" key={id + index}>
      <style jsx>{`
        .value {
          margin: 0 0.89em;
          text-align: center;
          font-size: 0.89em;
          font-weight: 300;

          color: var(--clr-neutral-750);
        }
        .cart-item-wrapper {
          border: 1px solid var(--clr-neutral-200);
          border-radius: 9px;
          margin-bottom: 1em;
          position: relative;
          display: grid;
          /*  outline:var(--clr-primary) solid 1px;*/
          padding: 0.5em 1em;
          grid-column-gap: 0.2em;
          grid-template-rows: repeat(2, minmax(0px, auto));
          grid-template-columns: 3.2em repeat(3, minmax(0px, 0.65fr)) 1fr;
          grid-template-areas:
            "paymentOption paymentOption paymentOption paymentOption paymentOption paymentOption"
            "img name type quantity price delete"
            "img name type quantity price delete"
            "multiplicationTable multiplicationTable multiplicationTable multiplicationTable multiplicationTable multiplicationTable"
            "hardware hardware hardware hardware hardware hardware"
            "footer footer footer footer footer footer";
        }
        .cart-item-wrapper::before {
          content: "";
          position: absolute;
          left: calc(-0.6em + 2px);
          top: calc(0.2em + 0.5em + calc(0.9em * 1.6));
          bottom: 1em;

          width: 0px;

          background: var(--clr-neutral-200);
        }
        .cart-item-wrapper::after {
          content: "";
          position: absolute;
          right: calc(-0.6em + 2px);
          top: calc(0.2em + 0.5em + calc(0.9em * 1.6));
          bottom: 0;

          width: 0px;

          background: var(--clr-neutral-200);
        }
        .cart-item_icon {
          grid-area: img;
        }
        .cart-item_title {
          grid-area: name;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
        }

        .cart-item_purchase {
          grid-area: paymentOption;
          text-align: center;
          color: var(--clr-neutral-50);
          font-size: 0.9rem;
          font-weight: 400;
          border-radius: 9px 9px 0 0;
          border-bottom: 1px solid var(--clr-neutral-200);
          margin: 0 calc(-1em - 2px);
          margin-top: calc(-0.5em - 2px);
          margin-bottom: calc(0.5em + 2px);
          background-color: var(--clr-neutral-700);
        }
        .cart-item_type {
          grid-area: type;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
          text-align: center;
        }

        .cart-item_type_title {
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--clr-neutral-50);
          margin: 0.5em 0;
        }
        .cart-item_type_value {
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--clr-neutral-50);
          margin: 0.5em 0;
        }

        .cart-item_licenses {
          grid-area: quantity;
          text-align: center;
        }
        .cart-item_licenses.token-type {
          grid-column: 3 / 5;
          grid-row: 2 / 4;
        }
        .cart-item_number {
          grid-area: number;
          padding: 0.3em;
        }
        .cart-item_number .value {
          margin: 0 0.89em;
          text-align: center;
          font-size: 0.89em;
          font-weight: 500;
          color: var(--clr-neutral-500);
        }
        .cart-item_price {
          grid-area: price;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
        }
        .cart-item_price .title {
          font-size: 0.9rem;
        }
        .cart-item_delete {
          grid-area: delete;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .price-details {
          font-size: 0.89rem;

          color: var(--clr-neutral-700);
        }
        .price-details_operation {
          font-size: 0.79rem;
          line-height: 0.68;
          margin: 0;
          padding: 0;
          color: var(--clr-neutral-700);
        }
        .price-total {
          position: relative;
          font-size: 1rem;
          font-weight: 500;
          color: var(--clr-primary-800);
        }

        .cart-item_hardware_wrapper {
          grid-area: hardware;

          display: flex;
          flex-direction: column;
        }
        .cart-item_hardware_title {
          font-size: 0.98rem;
          font-weight: 400;
          color: var(--clr-neutral-700);
          margin: 0.5em 0;
        }

        .cart-item_delete_svg-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          padding: 0.25em;
          background-color: var(--clr-neutral-150);
          transition: all 0.3s var(--cubic-bezier);
        }

        .cart-item_delete_svg-wrapper svg {
          cursor: pointer;
          width: 1.5em;
          height: 1.5em;
          stroke: var(--clr-warn);
          transition: all 0.2s var(--cubic-bezier);
        }
        .cart-item_delete_svg-wrapper:hover {
          background-color: var(--clr-warn);
          transform: scale(1);
        }
        .cart-item_delete_svg-wrapper:hover svg {
          stroke: var(--clr-neutral-50);
        }

        .cart-item_number-inner {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .increase,
        .decrease {
          cursor: pointer;
          width: 25%;
          height: 25%;
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

        .cart-item_multiplication-table {
          margin-top: 0.6em;
          padding-top: 0.3em;
          grid-area: multiplicationTable;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .cart-item_multiplication-table::before {
          content: "";
          position: absolute;
          top: -5px;
          left: -0.5em;
          right: -0.5em;

          height: 1px;
          background: repeating-linear-gradient(
            to right,
            var(--clr-neutral-200) 0,
            var(--clr-neutral-200) 4px,
            transparent 3px,
            transparent 9px
          );
        }

        .increase:hover svg,
        .decrease:hover svg {
          stroke: var(--clr-neutral-50);
        }
        .cart-item_footer {
          grid-area: footer;
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin: 0 calc(-1em - 1px);
          margin-bottom: calc(-0.5em - 1px);
          border-radius: 0 0 9px 9px;
        }
        .cart-item_footer_edit-item {
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          width: calc(100%);
          height: 2.3em;
          font-size: 0.89em;
          color: var(--clr-neutral-50);
          border-radius: 0 0 9px 9px;

          background-color: var(--clr-primary);
          transition: all 0.2s ease-in-out;
        }
        .cart-item_footer_edit-item:hover {
          background-color: var(--clr-candy);
        }

        /*-----------------------------------------------------------------------*/
        /*---------------------- Multiplication table css ----------------------*/
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
        .payment-plan-detail {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-bottom: 0.8em;
        }
      `}</style>
      <div className="cart-item_icon">
        <img
          src={"/images/icons/" + id + ".png"}
          width={50}
          height={50}
          layout="intrinsic"
        />
      </div>
      <div className="cart-item_title">
        <span>{name}</span>
        {Object.keys(options).map((option, index) => (
          <span
            className="font-size-xs capitalize"
            key={index + options[option][0]}
          >
            {options[option][0]}
          </span>
        ))}
        {!Object.keys(options).length && (
          <span className="font-size-xs">
            {product?.preferences?.defaults?.productDescription}
          </span>
        )}
      </div>

      <div className="cart-item_purchase">
        <span>{paymentPlan}</span>
      </div>
      <div className="cart-item_type">
        {paymentPlanDetails.length > 0 &&
          paymentPlanDetails.map((option, index) => {
            return (
              <div
                key={option.name + productReferenceId + index}
                className="payment-plan-detail"
              >
                <span className="cart-item_type-title">{option.name}:</span>
                {paymentPlan === "rent" && (
                  <span className="cart-item_type-value">
                    {(option.currentValue || option.default) / 30}
                  </span>
                )}
                {paymentPlan === "installment" && (
                  <span className="cart-item_type-value">{paymentOption}</span>
                )}
                {paymentPlan !== "rent" && paymentPlan !== "installment" && (
                  <span className="cart-item_type-value">
                    {option.currentValue || option.default}
                  </span>
                )}
              </div>
            );
          })}
      </div>
      {id !== "Custom" && (
        <>
          <div
            className={`cart-item_licenses ${id === "SAToken" && "token-type"}`}
          >
            <span>{id === "SAToken" ? "Tokens" : "Quantity"}</span>
            <div className="cart-item_number">
              <div className="cart-item_number-inner">
                {id !== "SAToken" && (
                  <>
                    {!isCartLocked && (
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
                    )}

                    <div className="value no-select">{quantity}</div>

                    {!isCartLocked && (
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
                    )}
                  </>
                )}
                {id === "SAToken" && (
                  <div className="value">
                    {!isCartLocked && (
                      <CustomInput
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
                    {isCartLocked && quantity}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="cart-item_price">
        <span className="title">Product Total</span>
        <span className="price-total">
          {priceFormatter(price * quantity * rentDuration)}
        </span>
      </div>

      <div className="cart-item_hardware_wrapper">
        {optionalProducts.length > 0 && (
          <>
            <h3 className="cart-item_hardware_title"></h3>
            {optionalProducts.map((op, index) => (
              <AddonItem item={op} quantity={quantity} key={op.name + index} />
            ))}
          </>
        )}
        {freeProducts.length > 0 && (
          <>
            <h3 className="cart-item_hardware_title"></h3>
            {freeProducts.map((op, index) => (
              <AddonItem item={op} quantity={quantity} key={op.name + index} />
            ))}
          </>
        )}
      </div>

      {id === "SAToken" && !hideTokenTable && (
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
                            Object.keys(quantityMultiplierTable)[index - 1] &&
                          "active_tier"
                        : quantity >
                            Object.keys(quantityMultiplierTable)[index - 1] &&
                          quantity <= key &&
                          "active_tier"
                    }
                    key={key}
                  >
                    {orderType !== "duePayment" &&
                      orderType !== "customPayment" && (
                        <td className="align-left">
                          {index === 0
                            ? "50 - " + key
                            : index ===
                              Object.keys(quantityMultiplierTable).length - 1
                            ? parseInt(
                                Object.keys(quantityMultiplierTable)[index - 1]
                              ) +
                              1 +
                              "+"
                            : parseInt(
                                Object.keys(quantityMultiplierTable)[index - 1]
                              ) +
                              1 +
                              " - " +
                              key}
                        </td>
                      )}
                    {(orderType === "duePayment" ||
                      orderType === "customPayment") && (
                      <td className="align-left">{quantity}</td>
                    )}
                    <td className="align-right">
                      {priceFormatter(quantityMultiplierTable[key] * basePrice)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <div className="cart-item_footer">
        {!isCartLocked && (
          <div
            className="cart-item_footer_edit-item"
            onClick={() => setIsEditModalOpen(true)}
            id={`id-${productReferenceId}`}
          >
            EDIT ITEM
          </div>
        )}
      </div>
      {!isCartLocked && (
        <div className="cart-item_delete">
          <div
            className="cart-item_delete_svg-wrapper"
            onClick={handleItemDelete}
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
      )}
      <GenericModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <ProductCard
          paymentPlans={paymentPlans}
          index={index}
          product={product}
          productReferenceId={productReferenceId}
          isEditMode={true}
          hasPresets={true}
          presetProduct={item}
          paymentTaxes={paymentTaxes}
          selectedProduct={item.id}
          setIsAddProductModalOpen={setIsEditModalOpen}
        />
      </GenericModal>
    </div>
  );
}

function AddonItem({ item, quantity }, props) {
  const { id, name, price, options } = item;
  return (
    <div className="cart-item_addon_wrapper">
      <style jsx>{`
        .cart-item_addon_wrapper {
          position: relative;
          display: grid;

          padding: 0.5em 0em;
          grid-column-gap: 0.2em;
          grid-template-rows: repeat(2, minmax(0px, auto));
          grid-template-columns: 3.2em repeat(3, minmax(0px, 0.65fr)) 1fr;
          grid-template-areas: "img name . quantity price .";
        }
        .cart-item_addon_icon {
          grid-area: img;
        }
        .cart-item_addon_title {
          grid-area: name;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          flex-direction: column;
        }
        .cart-item_addon_title > span {
          font-size: 0.86em;
        }
        .cart-item_addon_quantity {
          grid-area: quantity;
          text-align: center;
        }
        .cart-item_addon_price {
          grid-area: price;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: column;
        }
        .cart-item_addon_price .title {
          font-size: 0.86rem;
        }

        .cart-item_addon_quantity > span {
          font-size: 0.86rem;
        }

        .cart-item_addon_number > span {
          margin: 0 auto;
        }
        .price-total {
          position: relative;
          font-size: 1rem;
          font-weight: 500;
          color: var(--clr-primary-800);
        }
      `}</style>
      <div className="cart-item_addon_icon">
        <img
          src={"/images/icons/" + id + ".png"}
          width={39}
          height={39}
          layout="intrinsic"
        />
      </div>
      <div className="cart-item_addon_title">
        <span>{name}</span>
      </div>
      <div className="cart-item_addon_quantity">
        <span>Quantity</span>
        <div className="cart-item_number">
          <div className="value">{quantity}</div>
        </div>
      </div>
      <div className="cart-item_addon_price">
        <span className="title">Item Total</span>
        <span className="price-total">{priceFormatter(price * quantity)}</span>
      </div>
    </div>
  );
}
