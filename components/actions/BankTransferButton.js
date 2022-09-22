export default function BankTransferButton({ onClick }) {
  return (
    <>
      <style jsx>{`
        .bank_transfer_button {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          border: none;
          vertical-align: top;
          cursor: pointer;
          overflow: hidden;
          display: inline-block;
          text-align: center;
          height: 100%;
          color: #fff;
          background: #2c2e2f;
          border-radius: 4px;
          height: 55px;
          vertical-align: top;
          min-height: 40px;
          max-height: 55px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #fefefe00;
          transition: all 0.2s ease;
          margin-bottom: 2em;
        }
        .bank_transfer_button-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 1em;
          user-select: none;
        }

        .bank-transfer-icon {
          fill: var(--clr-neutral-50);
          transition: all 0.2s ease;
        }
        .bank-transfer-text {
          font-size: 1.2rem;
          transition: all 0.2s ease;
        }
        .bank_transfer_button:hover {
          border-color: var(--clr-neutral-800);
          background: var(--clr-neutral-150);
        }
        .bank_transfer_button:hover .bank-transfer-icon {
          fill: var(--clr-neutral-800);
        }
        .bank_transfer_button:hover .bank-transfer-text {
          color: var(--clr-neutral-800);
        }
      `}</style>
      <button className="bank_transfer_button" onClick={onClick}>
        <div className="bank_transfer_button-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="bank-transfer-icon"
            height="40"
            width="40"
          >
            <path d="M26.667 18.333q.708 0 1.187-.479.479-.479.479-1.187 0-.709-.479-1.188T26.667 15q-.709 0-1.188.479T25 16.667q0 .708.479 1.187.479.479 1.188.479Zm-13.334-3.875h8.334v-2.791h-8.334ZM7.5 35q-1.417-4.75-2.792-9.479-1.375-4.729-1.375-9.688Q3.333 12 6 9.333q2.667-2.666 6.5-2.666h8.333q1.209-1.584 2.938-2.459t3.729-.875q1.042 0 1.771.73.729.729.729 1.77 0 .25-.062.5-.063.25-.146.459-.167.458-.313.937-.146.479-.229.979l3.792 3.792h3.625v11.625l-4.709 1.542L29.167 35H20v-3.333h-3.333V35Zm2.083-2.792h4.292v-3.333h8.917v3.333h4.291l2.625-8.666 4.167-1.459v-6.791h-2l-5.5-5.5q.042-1 .229-1.896.188-.896.438-1.854-1.459.416-2.709 1.229-1.25.812-1.916 2.187H12.5q-2.667 0-4.521 1.855-1.854 1.854-1.854 4.52 0 4.209 1.167 8.25 1.166 4.042 2.291 8.125ZM20 19.125Z" />
          </svg>

          <span className="bank-transfer-text">
            {" "}
            Send request for Bank Transfer
          </span>
        </div>
      </button>
    </>
  );
}
