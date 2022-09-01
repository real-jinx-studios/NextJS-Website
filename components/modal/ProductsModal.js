import { Fragment } from "react";
import ReactDom from "react-dom";
import Link from "next/link";
import ProductCard from "../products/ProductCard";
export default function ProductsModal({ open, onClose }) {
  const products = [
    {
      name: "EZTitles",
      description: "Subtitling software for professionals.",
      icon: "/images/icons/eztit_icon2.png",
      number: "one",
      link: "/subtitle",
    },
    {
      name: "EZConvert",
      description: "Conversion software for every format.",
      icon: "/images/icons/ezc_what_2.png",
      number: "two",
      link: "/convert",
    },
    {
      name: "EZTitles Plug-ins",
      description: "Plug-ins for encoding.",
      icon: "/images/icons/ep_icon3.png",
      number: "three",
      link: "/plugins",
    },
    {
      name: "Tokens",
      description: "for Subtitling Assistant.",
      icon: "/images/icons/tokens_icon.png",
      number: "four",
      link: "/services-portal?account=payment",
    },
  ];

  const items = [
    {
      ProductCode: "EZT_S",
      ProductName: "EZTitles Standard",
      Quantity: 1,
      UnitPrice: 1940,
      Amount: 1940,
    },
    {
      name: "EZConvert",
      description: "Conversion software for every format.",
      icon: "/images/icons/ezc_what_2.png",
      number: "two",
      link: "/convert",
    },
    {
      ProductCode: "CS",
      ProductName: "EZTitles Plug-in for Cambria File Convert",
      Quantity: 1,
      UnitPrice: 500,
      Amount: 500,
    },
    {
      name: "Tokens",
      description: "for Subtitling Assistant.",
      icon: "/images/icons/tokens_icon.png",
      number: "four",
      link: "/services-portal?account=payment",
    },
  ];

  const cards = products.map((product, i) => (
    <ProductCard product={product} item={items[i]} onClick={onClose} />
  ));
  if (!open) return null;
  return ReactDom.createPortal(
    <Fragment>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          z-index: 998;
          background-color: #19191955;
        }

        .modal-content {
          overflow: hidden;
          border-radius: 9px;
          position: fixed;
          top: 50%;
          left: 50%;
          border: 1px solid var(--clr-neutral-50);
          transform: translate(-50%, -50%);
          background-color: var(--clr-neutral-50);
          padding: 0 1.8em 1.8em;
          z-index: 998;
          display: grid;
          grid-template-rows: auto 1fr;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
            0 11px 11px rgba(0, 0, 0, 0.22);
          /*         width: clamp(30em, 70vw, 60em);*/
        }

        .modal-header {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 0;
          margin-bottom: var(--offset-5);
        }
        .modal-header::before {
          z-index: -1;
          position: absolute;
          top: 0;
          left: -1.8rem;
          bottom: 0;
          right: -1.8rem;
          content: "";
          background-color: var(--clr-main);
        }

        .modal-header-title {
          font-size: 1.5rem;
          margin: 0;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--clr-neutral-50);
        }

        .modal-close {
          /* text-align: right;*/
          width: max-content;
          height: max-content;
        }

        .modal-close_svg {
          stroke: var(--clr-warn);
          width: 38px;
          height: 38px;
          cursor: pointer;
          stroke-width: 1px;
          transition: all 0.3s var(--cubic-bezier);
        }

        .modal-close_svg:hover {
          stroke: var(--clr-neutral-50);
          fill: var(--clr-warn);
        }

        .product-cards {
          gap: 1.8em;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .title {
          color: var(--clr-neutral-50) !important;
        }
      `}</style>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-header-title">Products:</h3>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="modal-close_svg"
            fill="none"
            viewBox="0 0 24 24"
            onClick={onClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <div className="product-cards">{cards}</div>
      </div>
    </Fragment>,
    document.getElementById("modal-portal")
  );
}
