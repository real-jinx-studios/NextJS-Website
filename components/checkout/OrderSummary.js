import priceFormatter from "../utils/priceFormatter";
import PriceBreakdown from "./PriceBreakdown";
export default function OrderSummary({ cart }) {
  const totalPrice = cart.items.reduce(
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
    <div className="summary-wrapper">
      <style jsx>{`
        .summary-wrapper {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 1.5rem;
          border: 1px solid var(--clr-neutral-300);
          border-radius: 9px;
          box-shadow: var(--shadow-1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: var(--clr-neutral-50);
        }
        .summary-header {
          width: 100%;
          margin-bottom: 1rem;
          position: relative;
        }
        .summary-header::after {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--clr-neutral-500);
        }
        .summary-header-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        .header-title h3 {
          margin: 0;
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        .header-actions {
        }
        .print {
          position: relative;
          border: 2px solid var(--clr-neutral-500);
          background-color: var(--clr-neutral-50);
          padding: 0.5rem;
          line-height: 0;
          border-radius: 9px;
          cursor: pointer;

          transition: all 0.2s ease-in-out;
        }
        .print::after {
          content: "Print";
          font-size: 0.8rem;
          color: var(--clr-neutral-700);
          position: absolute;
          bottom: 50%;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
          transition: all 0.15s ease-in-out;
        }
        .print:hover::after {
          opacity: 1;
          content: "Print";
          font-size: 0.8rem;
          color: var(--clr-neutral-700);
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
        }

        .print:hover {
          border: 2px solid var(--clr-primary);
          background-color: var(--clr-primary);
        }
        .print svg {
          fill: var(--clr-neutral-700);
          transition: all 0.2s ease-in-out;
        }
        .print:hover svg {
          fill: var(--clr-neutral-50);
        }
        .summary-header-bottom {
          width: 100%;
        }
        .header-date {
          text-align: left;
        }
        .header-date span {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--clr-neutral-600);
        }
        header-payment-method {
          text-align: right;
        }
        .header-payment-method > span {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--clr-neutral-600);
        }
        .header-payment-method > span > span {
          font-weight: 600;
          color: var(--clr-neutral-800);
        }
        .summary-body {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          padding-top: 1rem;
        }
        .summary-body::after {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--clr-neutral-500);
        }
        .summary-body-items {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .summary-body-price-breakdown {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .summary-footer {
          width: 100%;
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;

          justify-content: space-around;
        }
        .summary-footer-left,
        .summary-footer-right {
          display: flex;
          flex-direction: column;

          gap: 0.5rem;
        }
        .footer-title {
          position: relative;
          font-size: 1rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        .footer-title::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60%;
          height: 1px;
          background-color: var(--clr-neutral-500);
        }
        .billing-info,
        .shipping-info {
        }
        .billing-info > ul {
        }
        .info-li {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 0.5rem;
        }
        .li-name {
          font-size: 0.8rem;
          font-weight: 400;
          color: var(--clr-neutral-600);
        }
        .li-data {
          font-size: 0.89rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        /*installment css*/
        .installment {
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: 0.5rem;
        }
        .installment-header {
          display: flex;

          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.3rem;
          position: relative;
          margin-bottom: 1rem;
        }
        .installment-header::after {
          content: "";
          position: absolute;
          bottom: -1rem;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--clr-neutral-500);
        }
        .installment-header-title {
          font-size: 1.3rem;
          padding: 0;
          margin: 0;

          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        .installment-header-details {
          display: flex;
          font-size: 0.98rem;

          flex-direction: column;
        }
        .installment-header-details > small {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--clr-neutral-600);
        }
      `}</style>
      <div className="summary-header">
        <div className="summary-header-top">
          <div className="header-title">
            <h3>Order ID: {cart.orderId}</h3>
          </div>
          <div className="header-actions">
            <div className="print">
              <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
                <path d="M27.167 13.125V7.792H12.833v5.333h-2.791V5h19.916v8.125Zm-21.042 2.75H33.875 10.042Zm24.417 4.042q.541 0 .958-.417.417-.417.417-.958 0-.584-.417-1-.417-.417-.958-.417-.584 0-1 .417-.417.416-.417 1 0 .541.417.958.416.417 1 .417Zm-3.375 12.291v-7.541H12.833v7.541ZM29.958 35H10.042v-7.125H3.333V17.708q0-1.958 1.334-3.27Q6 13.125 7.958 13.125h24.084q1.958 0 3.291 1.313 1.334 1.312 1.334 3.27v10.167h-6.709Zm3.917-9.875v-7.417q0-.791-.521-1.312t-1.312-.521H7.958q-.791 0-1.312.542-.521.541-.521 1.291v7.417h3.917v-3.25h19.916v3.25Z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="summary-header-bottom">
          <div className="header-date">
            <span>Date: {cart.completeDate}</span>
          </div>
          <div className="header-payment-method">
            <span>
              Payment Method: <span>{cart.paymentMethod}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="summary-body">
        <div className="summary-body-items">
          {cart.items.map((item) => {
            if (item.paymentPlan !== "installment") {
              return <SummaryItem item={item} />;
            }
          })}
          {cart.checkout.installmentCount > 0 && (
            <div className="installment">
              <div className="installment-header">
                <h3 className="installment-header-title">Installments</h3>
                <span className="installment-header-details">
                  Plan : {cart.checkout.installmentPlan} months
                </span>
                <span className="installment-header-details">
                  Num. Payments: {cart.checkout.installmentPlan / 3}
                </span>
                <span className="installment-header-details">
                  Price per payment:{" "}
                  {priceFormatter(
                    cart.items.reduce(
                      (acc, item) =>
                        acc +
                        (item.paymentPlan === "installment"
                          ? item.price * item.quantity
                          : 0),
                      0
                    ) + cart.checkout.installmentPlanFee
                  )}{" "}
                  <small>*price w/o vat</small>
                  <small>*incl. installment fee</small>
                </span>
              </div>
              {cart.items.map((item) => {
                if (item.paymentPlan === "installment") {
                  return <SummaryItem item={item} />;
                }
              })}
            </div>
          )}
        </div>
        <div className="summary-body-price-breakdown">
          <PriceBreakdown cart={cart} totalPrice={totalPrice} />
        </div>
      </div>
      <div className="summary-footer">
        <div className="summary-footer-left">
          <h4 className="footer-title">Billing details:</h4>
          <div className="billing-info">
            <ul>
              <li className="info-li">
                <span className="li-name">Legal Name</span>
                <span className="li-data">{cart?.billingInfo?.LegalName}</span>
              </li>
              <li className="info-li">
                <span className="li-name">Contact Name</span>
                <span className="li-data">
                  {cart?.billingInfo?.ContactName}
                </span>
              </li>
              <li className="info-li">
                <span className="li-name">Email</span>
                <span className="li-data">{cart?.billingInfo?.Email}</span>
              </li>
              <li className="info-li">
                <span className="li-name">VAT</span>
                <span className="li-data">{cart?.billingInfo?.VAT_ID}</span>
              </li>
              <li className="info-li">
                <span className="li-name">Country</span>
                <span className="li-data">
                  {cart?.billingInfo?.Billing?.Country}
                </span>
              </li>
              <li className="info-li">
                <span className="li-name">City</span>
                <span className="li-data">
                  {cart?.billingInfo?.Billing?.City}
                </span>
              </li>
              <li className="info-li">
                <span className="li-name">Postcode</span>
                <span className="li-data">
                  {cart?.billingInfo?.Billing?.PostCode}
                </span>
              </li>
              <li className="info-li">
                <span className="li-name">Address</span>
                <span className="li-data">
                  {cart?.billingInfo?.Billing?.Address}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {cart?.checkout?.shipping && (
          <div className="summary-footer-right">
            <h4 className="footer-title">Shipping details:</h4>
            <div className="shipping-info">
              <ul>
                <li className="info-li">
                  <span className="li-name">Recipient Name</span>
                  <span className="li-data">
                    {cart?.shippingInfo?.Shipping?.RecipientName}
                  </span>
                </li>
                <li className="info-li">
                  <span className="li-name">Recipient Phone</span>
                  <span className="li-data">
                    {cart?.shippingInfo?.Shipping?.RecipientPhone}
                  </span>
                </li>
                <li className="info-li">
                  <span className="li-name">Country</span>
                  <span className="li-data">
                    {cart?.shippingInfo?.Shipping?.Country}
                  </span>
                </li>
                <li className="info-li">
                  <span className="li-name">City</span>
                  <span className="li-data">
                    {cart?.shippingInfo?.Shipping?.City}
                  </span>
                </li>
                <li className="info-li">
                  <span className="li-name">Postcode</span>
                  <span className="li-data">
                    {cart?.shippingInfo?.Shipping?.PostCode}
                  </span>
                </li>
                <li className="info-li">
                  <span className="li-name">Address</span>
                  <span className="li-data">
                    {cart?.shippingInfo?.Shipping?.Address}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryItem({ item }) {
  const {
    id,
    name,
    price,
    quantity,
    paymentPlan,
    rentDuration,
    paymentOption,

    optionalProducts,
    freeProducts,
    options,
    product,
  } = item;
  console.log(item);
  return (
    <div className="summary-item">
      <style jsx>{`
        .summary-item {
          width: 100%;
          border: 1px solid var(--clr-neutral-200);
          border-radius: 9px;
          padding: 0.5rem;
          position: relative;
        }
        .summary-item:not(:last-child)::after {
          content: "";
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 0px;
          background-color: var(--clr-neutral-200);
        }
        .summary-item-main {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .summary-item-left {
          position: relative;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
        }
        .summary-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
        }
        .summary-item-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .details-top {
        }
        .item-title {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        .details-bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 0.9rem;
        }
        .item-detail {
          position: relative;
          font-size: 0.81rem;
          font-weight: 500;
          color: var(--clr-neutral-500);
        }
        .item-detail:not(:last-child)::after {
          content: "";
          position: absolute;
          top: 50%;
          right: -0.45rem;
          transform: translateY(-50%);
          width: 1px;
          height: 0.8rem;
          background-color: var(--clr-neutral-500);
        }
        .item-price,
        .item-quantity {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--clr-neutral-700);
        }
        .extra-product-deco {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          height: 0px;
          background-color: var(--clr-neutral-500);
        }

        .extra-product-deco::after {
          content: "";
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-25%);
          width: 5%;
          height: 1px;
          background-color: var(--clr-neutral-500);
        }
      `}</style>
      <div className="summary-item-main">
        <div className="summary-item-left">
          <div className="summary-item-image">
            <img
              src={"/images/icons/" + id + ".png"}
              width={50}
              height={50}
              layout="intrinsic"
              alt={name}
            />
          </div>
          <div className="summary-item-details">
            <div className="details-top">
              <span className="item-title">{name} </span>
            </div>
            <div className="details-bottom">
              {Object.keys(options).map((option, index) => (
                <span
                  className="item-detail capitalize"
                  key={index + options[option][0]}
                >
                  {options[option][0]}
                </span>
              ))}
              {!Object.keys(options).length && (
                <span className="item-detail">
                  {product?.preferences?.defaults?.productDescription}
                </span>
              )}

              <span className="item-detail">{paymentPlan}</span>

              {paymentPlan === "installment" && (
                <span className="item-detail">{paymentOption} mnt. plan</span>
              )}
              {paymentPlan === "installment" && (
                <span className="item-detail">
                  {paymentOption / 3} installments
                </span>
              )}
              {paymentPlan === "rent" && (
                <span className="item-detail">
                  {rentDuration} {rentDuration > 1 ? "months" : "month"}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="summary-item-right">
          <span className="item-price">
            {priceFormatter(price * quantity * rentDuration)}
          </span>
          <span className="item-quantity">Qty: {quantity}</span>
        </div>
        {(optionalProducts.length > 0 || freeProducts.length > 0) && (
          <div className="extra-product-deco" />
        )}
      </div>

      {optionalProducts.length > 0 &&
        optionalProducts.map((op, index) => (
          <SummaryItemOptional
            key={index + op.name}
            item={op}
            quantity={quantity}
          />
        ))}

      {freeProducts.length > 0 &&
        freeProducts.map((fp, index) => (
          <SummaryItemOptional
            item={fp}
            key={index + fp.name}
            quantity={quantity}
          />
        ))}
    </div>
  );
}

function SummaryItemOptional({ item, quantity }) {
  const { id, name, price, options } = item;
  return (
    <div className="summary-item-optional">
      <style jsx>{`
        .summary-item-optional {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .summary-item-left {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
        }
        .summary-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
        }
        .summary-item-details {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
        .details-top {
        }
        .item-title {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--clr-neutral-600);
        }
        .item-price,
        .item-quantity {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--clr-neutral-600);
        }
      `}</style>
      <div className="summary-item-left">
        <div className="summary-item-image">
          <img
            src={"/images/icons/" + id + ".png"}
            width={33}
            height={33}
            layout="intrinsic"
            alt={name}
          />
        </div>
        <div className="summary-item-details">
          <div className="details-top">
            <span className="item-title">{name} </span>
          </div>
        </div>
      </div>
      <div className="summary-item-right">
        <span className="item-price">{priceFormatter(price * quantity)}</span>
        <span className="item-quantity">Qty: {quantity}</span>
      </div>
    </div>
  );
}
