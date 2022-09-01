import Link from "next/link";
import { cartState } from "../lib/cartContext";
export default function Custom500() {
  return (
    <section
      className="section full-width-height flex-center-center"
      aria-labelledby="_404title"
    >
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        ._404title {
          background-color: var(--clr-neutral-350);
          padding: 0.5rem;
          letter-spacing: 0.06em;
          font-size: 2.5rem;
          font-weight: bold;
          color: var(--clr-neutral-50);
          margin-bottom: 1rem;
          text-transform: uppercase;
        }
        ._404navigation {
          margin-top: 1rem;
          border: 1px solid var(--clr-neutral-50);
        }
        ._404navigation ul {
          list-style: none;
          padding: 0.8em 1.6em;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.3em;
        }
      `}</style>
      <style global jsx>{`
        body {
          background-color: #102739 !important;
          opacity: 0.9;
          background: radial-gradient(
              circle,
              transparent 20%,
              #102739 20%,
              #102739 80%,
              transparent 80%,
              transparent
            ),
            radial-gradient(
                circle,
                transparent 20%,
                #102739 20%,
                #102739 80%,
                transparent 80%,
                transparent
              )
              67.5px 67.5px,
            linear-gradient(#dbd9d9 5.4px, transparent 5.4px) 0 -2.7px,
            linear-gradient(90deg, #dbd9d9 5.4px, #102739 5.4px) -2.7px 0;
          background-size: 135px 135px, 135px 135px, 67.5px 67.5px,
            67.5px 67.5px !important;
        }
      `}</style>
      <div className="container">
        <h1 id="_404title" className="_404title">
          500 Internal Server Error
        </h1>
      </div>
    </section>
  );
}
