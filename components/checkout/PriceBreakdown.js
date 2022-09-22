import priceFormatter from "../utils/priceFormatter";
export default function PriceBreakdown({ totalPrice, cart }) {
  return (
    <div className="cart__sum">
      <style jsx>{`
        .cart__sum {
          width: 100%;
          position: relative;

          padding: 1em 2.1em 1em 1.2em;
        }
        .cart__sum::before {
          content: "";
          border-radius: 100vh;
          position: absolute;
          top: 0;
          left: 0.8em;
          right: 0.8em;
          height: 1px;
          height: 1px;

          background: repeating-linear-gradient(
            to right,
            var(--clr-neutral-200) 0,
            var(--clr-neutral-200) 4px,
            transparent 3px,
            transparent 9px
          );
        }
      `}</style>
      <div className=" flex justify-sb">
        <span className="font-size-m">subtotal: </span>
        <span className="font-size-m">{priceFormatter(totalPrice)}</span>
      </div>
      {cart.vat.isVat && (
        <div
          className={` flex justify-sb ${
            cart.vat.isVat && cart.vat.isValid && cart.vat.substractVAT
              ? "vat-cleared"
              : ""
          }`}
        >
          <span className="font-size-m">VAT {cart.vat.vat} %: </span>
          <span className="font-size-m">
            {priceFormatter(
              cart.items.reduce(
                (acc, item) =>
                  acc + item.price * item.quantity * item.rentDuration,
                0
              ) *
                (cart.vat.vat / 100)
            )}
          </span>
        </div>
      )}
      {cart.checkout.installmentCount > 0 && (
        <div className="cart__sum__title flex justify-sb">
          <span className="font-size-m">installment fee: </span>
          <span className="font-size-m">
            {priceFormatter(cart.checkout.installmentPlanFee)}
          </span>
        </div>
      )}
      <div className="cart__sum__title-total flex justify-sb font-bold">
        <span onClick={() => modalRef.current.show()} className="font-size-ml">
          TOTAL:{" "}
        </span>
        <span className="font-size-ml">
          {priceFormatter(
            totalPrice +
              (cart.checkout.installmentCount > 0
                ? cart.checkout.installmentPlanFee
                : 0) +
              (cart.vat.isVat
                ? totalPrice *
                  (!cart.vat.isValid
                    ? cart.vat.vat / 100
                    : cart.vat.substractVAT
                    ? 0
                    : cart.vat.vat / 100)
                : 0)
          )}
        </span>
      </div>
    </div>
  );
}
