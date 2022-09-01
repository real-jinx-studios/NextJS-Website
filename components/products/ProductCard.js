import Link from "next/link";
import { cartState } from "../../lib/cartContext";
export default function ProductCard({ product, onClose, item }) {
  const { cState, dispatch } = cartState();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_ITEM", payload: item });
  };
  return (
    <Link href={"#"}>
      <div className={`${product.number} card`} onClick={handleClick}>
        <style jsx>{`
          .one,
          .two,
          .three,
          .four {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            border: 2px solid var(--clr-neutral-350);
            border-radius: 9px;
            position: relative;
            padding: 0.689em 0.96em;
            z-index: 1;
            overflow: hidden;
            max-width: 300px;
            transition: all 0.35s ease;
          }

          .one:hover {
            border-color: #6898ce;
          }

          .two:hover {
            border-color: #be322e;
          }

          .three:hover {
            border-color: #e87730;
          }

          .four:hover {
            border-color: #eab663;
          }

          .card_product_header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: var(--offset-top-2);
          }

          .card_product_title {
            grid-area: title;
            font-size: 1.2em;
            font-weight: 600;
            margin-bottom: 0;
            margin-left: var(--offset-2);
            color: var(--clr-neutral-800);
          }

          .card_product_description {
            margin: 0;
            color: var(--clr-neutral-500);
          }

          .card_product_action {
            text-align: right;
            position: relative;
          }

          .card_product_action-link {
            font-size: 1.125em;
            margin: 0;
            color: var(--clr-primary);
          }

          .card_product_action-link::before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--clr-primary);
            transform-origin: left;
            transform: scaleX(0);
            transition: all 0.3s 0.2s var(--cubic-bezier);
          }

          @media (hover: hover) {
            .card_product_action-link {
              position: relative;
              font-weight: 500;
              font-size: 1.125em;
              margin: 0;
              top: 150%;
              transition: top 0.3s var(--cubic-bezier);
              color: var(--clr-primary);
            }

            .card:hover {
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
                0 6px 6px rgba(0, 0, 0, 0.23);
            }

            .card:hover > .card_product_action > .card_product_action-link {
              top: 5%;
            }

            .card:hover
              > .card_product_action
              > .card_product_action-link::before {
              transform: scaleX(1);
            }
          }
        `}</style>
        <div className="card_product_header">
          <img width={53} height={53} src={product.icon} />
          <p className="card_product_title">{product.name}</p>
        </div>

        <p className="card_product_description">{product.description}</p>
        <div className="card_product_action">
          <a className="card_product_action-link">Learn More</a>
        </div>
      </div>
    </Link>
  );
}
