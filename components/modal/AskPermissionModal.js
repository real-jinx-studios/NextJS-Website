import { useState } from "react";

export default function AskPermissionModal({
  setIsAskPermissionOpen,
  title,
  onConfirm,
  onCancel,
  children,
}) {
  return (
    <div className=" flex-center-center-column">
      <style jsx>{`
        .title {
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--clr-neutral-800);
        }
        .wrapper {
          color: var(--clr-neutral-700);
          margin-bottom: 1rem;
        }
        .modal-actions-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1rem;
        }
      `}</style>
      <h2 className="title">{title}</h2>

      <div className="wrapper">{children}</div>
      <div className="modal-actions-wrapper">
        <button
          className="button"
          onClick={() => {
            setIsAskPermissionOpen(false);
            onConfirm();
          }}
        >
          Confirm
        </button>
        <button
          className="buy_now_button"
          onClick={() => {
            setIsAskPermissionOpen(false);
            onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
