export default function BurnIn() {
  return (
    <div className="section">
      <style jsx>{`
        .Plugin_wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .Plugin_wrapper.white{
          background-color: var(--clr-neutral-50);
        }
        .Plugin_wrapper > * {
          color: attr(style);
          position: relative;
        }
        .Plugin_wrapper *::after {
          content: attr(data-color);
          position: absolute;
          top: 50%;
          right: -50%;
          transform: translateY(-50%) translateX(100%);

          color: var(--clr-neutral-50);
          font-size: 0.75rem;
          font-weight: bold;
          text-align: center;
          padding: 0.5rem;

          pointer-events: none;
          opacity: 0.6;
          transition: opacity 0.3s ease-in-out;
        }
        .container {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
      `}</style>
      <div className="container">
        <div className="Plugin_wrapper">
          <h1
            style={{ color: "var(--clr-neutral-0)" }}
            data-color="var(--clr-neutral-0)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-50)" }}
            data-color="var(--clr-neutral-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-100)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-100)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-150)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-150)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-200)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-200)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-250)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-250)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-350)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-350)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-500)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-500)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-550)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-550)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-600)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-600)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-700)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-700)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-750)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-750)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-800)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-800)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-900)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-900)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-primary)" }}
            data-background="#fefefe00"
            data-color="var(--clr-primary)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-primary-opacity-50)" }}
            data-background="#fefefe00"
            data-color="var(--clr-primary-opacity-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-primary-opacity-75)" }}
            data-background="#fefefe00"
            data-color="var(--clr-primary-opacity-75)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn-opacity-25)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn-opacity-25)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn-opacity-50)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn-opacity-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn-opacity-75)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn-opacity-75)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct-opacity-25)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct-opacity-25)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct-opacity-50)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct-opacity-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct-opacity-75)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct-opacity-75)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-candy)" }}
            data-background="#fefefe00"
            data-color="var(--clr-candy)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-text-highlight)" }}
            data-background="#fefefe00"
            data-color="var(--clr-text-highlight)"
          >
            Plugin
          </h1>
        </div>
        <div className="Plugin_wrapper white">
          <h1
            style={{ color: "var(--clr-neutral-0)" }}
            data-color="var(--clr-neutral-0)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-50)" }}
            data-color="var(--clr-neutral-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-100)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-100)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-150)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-150)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-200)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-200)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-250)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-250)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-350)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-350)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-500)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-500)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-550)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-550)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-600)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-600)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-700)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-700)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-750)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-750)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-800)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-800)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-neutral-900)" }}
            data-background="#fefefe00"
            data-color="var(--clr-neutral-900)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-primary)" }}
            data-background="#fefefe00"
            data-color="var(--clr-primary)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-primary-opacity-50)" }}
            data-background="#fefefe00"
            data-color="var(--clr-primary-opacity-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-primary-opacity-75)" }}
            data-background="#fefefe00"
            data-color="var(--clr-primary-opacity-75)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn-opacity-25)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn-opacity-25)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn-opacity-50)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn-opacity-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-warn-opacity-75)" }}
            data-background="#fefefe00"
            data-color="var(--clr-warn-opacity-75)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct-opacity-25)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct-opacity-25)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct-opacity-50)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct-opacity-50)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-correct-opacity-75)" }}
            data-background="#fefefe00"
            data-color="var(--clr-correct-opacity-75)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-candy)" }}
            data-background="#fefefe00"
            data-color="var(--clr-candy)"
          >
            Plugin
          </h1>
          <h1
            style={{ color: "var(--clr-text-highlight)" }}
            data-background="#fefefe00"
            data-color="var(--clr-text-highlight)"
          >
            Plugin
          </h1>
        </div>
      </div>
    </div>
  );
}
