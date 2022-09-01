export default function PricingSection() {
  return (
    <section className="product-section">
      <style jsx>{`
        .product-container {
          padding: 3.8em 0;
        }
        .prices_container {
          display: flex;
          position: relative;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          padding: 0 1.3em;
        }
        .prices_container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: scaleX(0.001);
          background: var(--clr-neutral-50);
          opacity: 0.8;
        }
        .or {
          position: absolute;
          top: 50%;
          left: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate(-50%, -50%);
          background: var(--clr-main);
          font-size: 1.5em;
          font-weight: 500;
          color: var(--clr-neutral-50);
          z-index: 1;
          padding: 0.5em;
        }
        .full_price_container,
        .installments_container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
          padding: 11em 1.3em;
        }
        .number {
          font-size: 1rem;
          font-weight: 400;
          color: var(--clr-neutral-50);
        }
        .price {
          font-size: 4rem;
          font-weight: 300;
          color: var(--clr-text-highlight);
        }
        .button_wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 3.8em;
          padding: 0 1.3em;
        }
      `}</style>
      <div className="product-container">
        <header>
          <h2 className="section-heading">EZTitles Basic starts from</h2>
        </header>
        <div className="prices_container">
          <span className="or">or</span>
          <div className="full_price_container">
            <span className="number">1x</span>
            <span className="price">1620€</span>
          </div>
          <div className="installments_container">
            <span className="number">36x</span>
            <span className="price">50€</span>
          </div>
        </div>
        <div className="button_wrapper">
          <a className="buy_now_button" href="#">
            Buy now
          </a>
        </div>
      </div>
    </section>
  );
}
