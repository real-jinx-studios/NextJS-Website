export default function SkipToContentLink() {
  return (
    <>
      <style jsx>{`
        :not(.skip-to-content):focus {
        }
        .skip-to-content {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 5;

          text-align: center;
          background-color: var(--clr-primary);
          color: var(--clr-neutral-50);
          padding: 0.5rem;

          transition: transform 0.2s ease-in-out;
          transform: translateY(-100%);
        }
        .skip-to-content:focus {
          transform: translateY(0);
        }
      `}</style>
      <a
        href="#main"
        className="skip-to-content"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
    </>
  );
}
