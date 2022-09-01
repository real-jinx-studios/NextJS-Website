import styles from "./home.module.css";
import Link from "next/link";
export default function ClientsSection() {
  return (
    <section className={styles.clients_section} aria-labelledby="clients">
      <style jsx>{`
        #clients {
          position: relative;
        }
        .clients-link {
          position: relative;
          z-index: 1;
          padding: 0.5em;
        }
        .clients-link::after {
          content: "";
          position: absolute;
          top: calc(100% - 0.2em - 3px);
          left: 0;
          bottom: 0;
          right: 0;
          height: 3px;
          background-color: var(--clr-neutral-50);
          z-index: -1;
          transition: all 0.23s var(--cubic-bezier);
        }
        .clients-link::before {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0.2em;
          right: 0;
          height: 3px;
          background-color: var(--clr-neutral-50);
          z-index: -1;
          transition: all 0.3s var(--cubic-bezier);
        }
        .clients-link:hover::before {
          height: 100%;
          background-color: var(--clr-neutral-800);
        }
        .clients-link:hover::after {
          top: calc(0.2em + 3px);
          height: 3px;
        }
        .clients-link:hover {
        }
      `}</style>
      <h2 id="clients" className={styles.section_title}>
        <Link href="/clients">
          <a className="clients-link">Our Clients</a>
        </Link>
      </h2>
      <div className={styles.clients_wrapper}>
        <div className={styles.clients_wrapper_inner}>
          <div className={styles.clients_wrapper_fast}>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/BBC.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/M6.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Disney.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Nasa.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img
                  src="/images/clients/Netflix.svg"
                  width={220}
                  height={42}
                />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sony.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/EA.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sky.svg" width={220} height={42} />
              </div>
            </div>
          </div>
          <div className={styles.clients_wrapper_fast}>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/BBC.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/M6.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Disney.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Nasa.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img
                  src="/images/clients/Netflix.svg"
                  width={220}
                  height={42}
                />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sony.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/EA.svg" width={220} height={42} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sky.svg" width={220} height={42} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.clients_wrapper}>
        <div className={styles.clients_wrapper_inner2}>
          <div className={styles.clients_wrapper_fast}>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/BBC.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/M6.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Disney.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Nasa.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img
                  src="/images/clients/Netflix.svg"
                  width={160}
                  height={33}
                />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sony.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/EA.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sky.svg" width={160} height={33} />
              </div>
            </div>
          </div>
          <div className={styles.clients_wrapper_fast}>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/BBC.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/M6.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Disney.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Nasa.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img
                  src="/images/clients/Netflix.svg"
                  width={160}
                  height={33}
                />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sony.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/EA.svg" width={160} height={33} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sky.svg" width={160} height={33} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.clients_wrapper}>
        <div className={styles.clients_wrapper_inner3}>
          <div className={styles.clients_wrapper_fast}>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/BBC.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/M6.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Disney.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Nasa.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img
                  src="/images/clients/Netflix.svg"
                  width={160}
                  height={33}
                />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sony.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/EA.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sky.svg" width={120} height={25} />
              </div>
            </div>
          </div>
          <div className={styles.clients_wrapper_fast}>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/BBC.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/M6.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Disney.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Nasa.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img
                  src="/images/clients/Netflix.svg"
                  width={160}
                  height={33}
                />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sony.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/EA.svg" width={120} height={25} />
              </div>
            </div>
            <div className={styles.red}>
              <div className={styles.red_inner}>
                <img src="/images/clients/Sky.svg" width={120} height={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
