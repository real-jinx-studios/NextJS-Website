import { Fragment, useEffect } from "react";
import ReactDom from "react-dom";
import ParrotLoader from "../utils/ParrotLoader";

export default function OrderProcessingModal({ open, cState }) {
  if (!open) return null;
  useEffect(() => {
    const handleTabClose = (event) => {
      event.preventDefault();

      console.log("beforeunload event triggered");

      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);
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
          user-select: none;
          pointer-events: none;
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

        .main-content {
          gap: 1.8em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        .title {
          color: var(--clr-neutral-50) !important;
        }
        .main-content_description {
          text-align: center;
          font-size: 1.2rem;
          margin: 0;
          padding: 0;
          padding: 0.8rem 0;
          color: var(--clr-neutral-700);
        }
      `}</style>
      <div className="modal-overlay" />
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-header-title">Order Processing</h3>
        </div>

        <div className="main-content">
          <ParrotLoader />
        </div>
      </div>
    </Fragment>,
    document.getElementById("modal-portal")
  );
}
