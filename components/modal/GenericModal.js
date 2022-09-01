import { Fragment, useState, useEffect } from "react";
import ReactDom from "react-dom";
export default function GenericModal({ children, open, onClose }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    if (!open) {
      document.body.style.overflow = "";
      return null;
    }

    document.body.style.overflow = "hidden";
  }
  return mounted
    ? ReactDom.createPortal(
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
              border-radius: 9px;
              position: fixed;
              overflow: hidden;
              max-height: calc(100vh - 100px);
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: var(--clr-neutral-50);
              padding: 1em;
              z-index: 998;
              display: grid;
              grid-template-rows: auto 1fr;
              width: clamp(30em, 70vw, 60em);
            }
            .modal-close {
              /* text-align: right;*/
              margin-left: auto;
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
            .modal-content_inner {
              padding-top: 1em;
              height: 100%;
              width: 100%;
              overflow-y: auto;
            }
          `}</style>
          <div className="modal-overlay" onClick={onClose} />
          <div className="modal-content">
            <span className="modal-close" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="modal-close_svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
            <div className="modal-content_inner">{children}</div>
          </div>
        </Fragment>,
        document.getElementById("modal-portal")
      )
    : null;
}
