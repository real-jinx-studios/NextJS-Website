export default function Convert() {
  return (
    <div className="section">
      <style jsx>{`
        .convert_wrapper {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .convert_wrapper > * {
          color: var(--clr-neutral-50);
          position: relative;
        }
        .convert_wrapper *::after {
          content: attr(data-info);
          position: absolute;
          top: 50%;
          right: -50%;
          transform: translateY(-50%) translateX(50%);

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
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        }
      `}</style>
      <div className="container">
        <div className="convert_wrapper">
          <h1 data-info=" <-h1">Convert</h1>
          <h2 data-info=" <-h2">Convert</h2>
          <h3 data-info=" <-h3">Convert</h3>
          <h4 data-info=" <-h4">Convert</h4>
          <h5 data-info=" <-h5">Convert</h5>
          <h6 data-info=" <-h6">Convert</h6>
          <p data-info=" <-p">Convert</p>
          <span data-info=" <-span">Convert</span>
          <div className="convert" data-info=" <-div">
            convert
          </div>
          <small data-info=" <-small">convert</small>
          <strong data-info=" <-strong">convert</strong>
        </div>
        <div className="convert_wrapper">
          <h1 className="h1c" data-info=" <-h1">
            Convert
          </h1>
          <h2 className="h2c" data-info=" <-h2">
            Convert
          </h2>
          <span data-info=" <-h3">Convert</span>
          <h4 data-info=" <-h4">Convert</h4>
          <h5 data-info=" <-h5">Convert</h5>
          <h6 data-info=" <-h6">Convert</h6>
          <p data-info=" <-p">Convert</p>
          <span data-info=" <-span">Convert</span>
          <div className="convert" data-info=" <-div">
            convert
          </div>
          <small data-info=" <-small">convert</small>
          <strong data-info=" <-strong">convert</strong>
        </div>
      </div>
    </div>
  );
}
