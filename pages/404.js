import Link from "next/link";
import { cartState } from "../lib/cartContext";
export default function Custom404() {
  const { state } = cartState();

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
      <div className="container">
        <h1 id="_404title" className="_404title">
          404 Page not found
        </h1>

        <div className="_404navigation">
          <ul>
            <li>
              <Link href="/">
                <a className="underlined_link  white">Home</a>
              </Link>
            </li>
            <li>
              <Link href="/subtitle">
                <a className="underlined_link  white">EZTitles</a>
              </Link>
            </li>
            <li>
              <Link href="/convert">
                <a className="underlined_link  white">EZConvert</a>
              </Link>
            </li>
            <li>
              <Link href="/subass">
                <a className="underlined_link  white">Subtitling Assistant</a>
              </Link>
            </li>
            <li>
              <Link href="/plugins">
                <a className="underlined_link white">EZTitles Plugins</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
