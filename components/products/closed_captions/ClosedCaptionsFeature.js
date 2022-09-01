import Link from "next/link";
export default function ClosedCaptionsFeature({ title, text, border, action }) {
  return (
    <div className="section-content-item">
      <style jsx>{`
        .section-content-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5em;
          border-radius: 9px;
          border: ${border
            ? "3px solid var(--clr-text-highlight)"
            : "3px solid #fefefe00"};
          padding: 2em;
        }
        .section-content-item_title {
          width: 100%;
          text-align: left;
          font-size: 2.1rem;
          color: var(--clr-neutral-50);
        }
        .section-content-item_text-wrapper {
          width: 100%;

          display: flex;
          justify-content: start;
        }
        .section-content-item_text {
          width: 100%;
          font-size: 1.1rem;
          color: var(--clr-neutral-150);
        }
      `}</style>
      <h4
        className="section-content-item_title"
        dangerouslySetInnerHTML={{ __html: title }}
      />

      <div className="section-content-item_text-wrapper">
        <p
          className="section-content-item_text"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
      {action && (
        <Link href={action}>
          <a
            className="button button_basic_long"
            href="/subtitle#subtitling-assistant"
          >
            Learn more
          </a>
        </Link>
      )}
    </div>
  );
}
