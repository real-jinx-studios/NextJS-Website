import { useState } from "react";
import { cartState } from "../../lib/cartContext";
import { useClient } from "../../lib/context";

const isSSR = () => typeof window === undefined;
export default function StateViewer(stateName = "cart") {
  const [isOpen, setIsOpen] = useState(false);
  const { cState } = cartState();
  const { getClientToken, getClientInfo } = useClient();

  const name = stateName.stateName;

  return (
    <div
      key={name}
      className={`state-viewer-wrapper ${isOpen ? "open" : ""} ${name}`}
    >
      <style jsx>{`
        .state-viewer-wrapper {
          position: fixed;
          top: 100%;
          left: 0;
          transform: translateY(-3.5rem) translateX(calc(-100% + 3.5rem));
          display: flex;
          max-width: 500px;
          width: 500px;
          max-height: 680px;
          flex-direction: column;
          border: 1px solid var(--clr-neutral-700);

          background-color: var(--clr-neutral-800);
          color: var(--clr-neutral-100);
          font-size: 0.9rem;
          font-weight: bold;
          z-index: 890;

          transition: all 0.3s ease;
        }
        .state-viewer-wrapper.user {
          z-index: 889;
          transform: translateY(-7rem) translateX(calc(-100% + 3.5rem));
        }
        .state-viewer-wrapper.open {
          transform: translateY(-100%) translateX(0);
        }
        .state-viewer_header {
          display: flex;
          position: relative;
          flex-direction: row;
          align-items: center;
          padding: 0.5rem;

          justify-content: flex-start;
          width: 100%;
          background-color: var(--clr-neutral-50);
          color: var(--clr-neutral-800);
        }
        .state-viewer_header h1 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
          padding: 0;
          color: var(--clr-neutral-800);
        }
        .state-viewer_header button {
          background-color: transparent;
          position: absolute;
          top: 45%;
          right: -1.35rem;
          transform: translateY(-50%) translateX(-53%);
          border: none;
          color: var(--clr-warn);
          font-size: 2.2rem;

          width: max-content;
          height: max-content;
          overflow: hidden;

          cursor: pointer;
          transition: all 0.3s ease;

          padding: 0;
          margin: 0;

          transform-origin: center center;

          text-decoration: none;
          color: #ccc;
          font-family: "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji",
            Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica,
            serif, LastResort;
          font-variant-emoji: emoji;
        }
        .state-viewer_header button:hover {
          transform: translateY(-50%) translateX(-50%) scale(1.38);
          transform-origin: center center;
        }
        .state-viewer_body {
          width: 100%;
          height: 100%;

          overflow-y: auto;
          background-color: var(--clr-neutral-800);
          color: var(--clr-neutral-100);
        }
        .open_close {
          width: 50px;
        }
        .state-viewer-body pre code {
          overflow: auto;
          line-height: 0.9;
        }
      `}</style>
      <div className="state-viewer_header">
        {" "}
        <h1>
          {name === "user" ? (
            "User"
          ) : (
            <>
              Shop<small>(cart)</small>
            </>
          )}{" "}
          State Viewer
        </h1>
        <div className="open_close">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {name === "cart" ? "㊙" : "🈹"}
          </button>
        </div>
      </div>
      <div className="state-viewer_body">
        {!isSSR() && (
          <pre>
            <code>
              {JSON.stringify(
                name === "cart"
                  ? cState
                  : { userInfo: getClientInfo(), loginToken: getClientToken() },
                null,
                2
              )}
            </code>
          </pre>
        )}
      </div>
    </div>
  );
}
