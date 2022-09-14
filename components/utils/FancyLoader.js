export default function FancyLoader({
  size = "150",
  fontSize = "1.25",
  white,
  variation,
}) {
  return (
    <div className="spinner">
      <style jsx>{`
        .spinner {
          color: ${white ? "var(--clr-neutral-50)" : "var(--clr-neutral-800)"};
          width: ${size}px;
          height: ${size}px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: ${fontSize}rem;
          overflow: hidden;
          position: relative;
          animation: text-color 2s ease-in-out infinite;
        }
        .spinner-sector {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          mix-blend-mode: ${white ? "color-dodge" : "difference"};
          border: 15px solid transparent;
          pointer-events: none;
          animation: rotate var(--duration) var(--timing) infinite;
        }

        .spinner-sector-red {
          border-left-color: ${white ? "var(--clr-neutral-200)" : "#d92b3a"};
          border-left-width: 15px;
          --duration: 2.4s;
          --timing: cubic-bezier(0.32, 2, 0.55, 0.27);
        }
        .spinner-sector-blue {
          border-top-color: ${white ? "var(--clr-neutral-200)" : "#4bccf3"};
          border-top-width: 15px;
          --duration: 2s;
          --timing: cubic-bezier(0.51, 0.92, 0.24, 1.15);
        }
        .spinner-sector-green {
          border-right-color: ${white ? "var(--clr-neutral-50)" : "#268e6c"};
          border-right-width: 15px;
          --duration: 1s;
          --timing: cubic-bezier(0.57, 0.21, 0.69, 1.25);
        }
        @keyframes rotate {
          0% {
            transform: rotate(0);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes text-color {
          0%,
          100% {
            color: ${white ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 1)"};
          }
          25%,
          75% {
            color: ${white ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"};
          }
          50% {
            color: ${white ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.1)"};
          }
        }
      `}</style>
      Loading
      <div className="spinner-sector spinner-sector-red"></div>
      <div className="spinner-sector spinner-sector-blue"></div>
      <div className="spinner-sector spinner-sector-green"></div>
    </div>
  );
}
