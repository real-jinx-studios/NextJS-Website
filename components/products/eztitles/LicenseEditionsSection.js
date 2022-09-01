export default function LicenseEditionsSection() {
  return (
    <section
      className="product-section"
      aria-labelledby="license-editions-heading"
    >
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: var(--offset-3);
        }
      `}</style>
      <div className="product-container flex-center-center-column gap-2">
        <header>
          <h2 id="license-editions-heading" className="section-heading">
            EZTitles has three license editions and they differ only in the
            supported file formats
          </h2>
        </header>
        <a
          href="/idontfuckinknow"
          className="button button_basic_long license_editions_button"
        >
          license editions
        </a>
      </div>
    </section>
  );
}
