export default function Clients() {
  const arrayImages = Array.from(Array(64).keys());
  const icons = arrayImages.map((x) => (
    <img
      key={x}
      src="images/clients/012_NASA_last.png"
      width={120}
      height={120}
      className="client-logo"
    />
  ));
  return (
    <section className="container offset-top" aria-labelledby="clients">
      <style jsx>{`
        #clients {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 1.89em;
        }
        .clients_wrapper {
          display: flex;
          gap: 1.5em;
          flex-wrap: wrap;
          background: #ffffff00 url("/images/parrot-img-opacity-05.svg")
            no-repeat 50% 0%;
        }
      `}</style>
      <h1 id="clients">Clients</h1>
      <div className="clients_wrapper">{icons}</div>
    </section>
  );
}
