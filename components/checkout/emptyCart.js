import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="section offset-top" aria-labelledby="empty-cart">
      <style jsx>{`
        .container {
          background-color: var(--clr-neutral-50);
          border-radius: 9px;
          padding: 2em 3.2em;
        }
        #empty-cart {
          color: var(--clr-neutral-800);
          font-size: var(--fs-500);
          text-align: center;
        }
        .one,
        .two,
        .three {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 2px solid var(--clr-neutral-50);
          border-radius: 9px;
          position: relative;
          padding: 0.96em;
          z-index: 1;
          transition: all 0.35s cubic-bezier(1, -0.65, 0, 1.35);
        }
        .one {
          transform: translateX(0);
          background: rgb(17, 75, 103);
          background: linear-gradient(
            45deg,
            rgba(17, 75, 103, 1) 0%,
            rgba(32, 104, 140, 1) 66%,
            rgba(47, 133, 176, 1) 100%
          );
          border-color: #00ffff;
        }
        .two {
          transform: translateX(0);
          background: rgb(106, 19, 9);
          background: linear-gradient(
            45deg,
            rgba(106, 19, 9, 1) 0%,
            rgba(131, 24, 13, 1) 66%,
            rgba(142, 27, 15, 1) 100%
          );
          border-color: #ce4f4a;
        }
        .three {
          transform: translateX(0);
          background: rgb(154, 68, 27);
          background: linear-gradient(
            45deg,
            rgba(154, 68, 27, 1) 0%,
            rgba(183, 66, 6, 1) 66%,
            rgba(210, 77, 4, 1) 100%
          );
          border-color: #fbb03b;
        }
        .product-cards {
          gap: 1.5em;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        }
        .title {
          color: var(--clr-neutral-50) !important ;
        }
      `}</style>
      <h1 id="empty-cart" className="title">
        Your cart is empty
      </h1>
      <div className="container">
        <h2 id="empty-cart">Please choose a product to start.</h2>
        <div className="product-cards">
          <div className="one card">
            <div className="card_product_platforms">
              <img width={45} height={45} src="/images/windows.png" />
            </div>
            <div className="card_product_title">
              <p>EZTitles</p>
            </div>
            <div className="card_product_description">
              <p>Redefines what professional subtitling software can do!</p>
            </div>
            <div className="card_product_learn_more">
              <Link href="/subtitle">
                <a className="button button_basic_long_outline">add product</a>
              </Link>
            </div>
          </div>
          <div className="two card">
            <div className="card_product_platforms">
              <img width={45} height={45} src="/images/windows.png" />
            </div>
            <div className="card_product_title">
              <p>EZConvert</p>
            </div>
            <div className="card_product_description">
              <p>Fast and accurate subtitle conversion tool.</p>
            </div>
            <div className="card_product_learn_more">
              <Link href="/convert">
                <a className="button button_basic_long_outline">add product</a>
              </Link>
            </div>
          </div>
          <div className="three card">
            <div className="card_product_platforms">
              <img width={45} height={45} src="/images/windows.png" />
            </div>
            <div className="card_product_title">
              <p>EZTitles Plug-ins</p>
            </div>
            <div className="card_product_description">
              <p>The plug-ins for ProMedia Carbon.</p>
            </div>
            <div className="card_product_learn_more">
              <Link href="/plugins">
                <a className="button button_basic_long_outline">add product</a>
              </Link>
            </div>
          </div>
          <div className="three card">
            <div className="card_product_platforms">
              <img width={45} height={45} src="/images/windows.png" />
            </div>
            <div className="card_product_title">
              <p>EZTitles Plug-ins</p>
            </div>
            <div className="card_product_description">
              <p>The plug-ins for Rhozet Carbon Coder.</p>
            </div>
            <div className="card_product_learn_more">
              <Link href="/plugins">
                <a className="button button_basic_long_outline">add product</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
