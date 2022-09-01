import { useEffect, Fragment, useRef } from "react";
import styles from "../../components/home_page/home.module.css";
import ScrollDownArrow from "../../components/utils/ScrollDownArrow";

export default function ClassroomPage() {
  const cardsWrapperRef = useRef(null);

  const firstPointRef = useRef(null);
  const secondPointRef = useRef(null);
  const thirdPointRef = useRef(null);
  const fourthPointRef = useRef(null);
  const fifthPointRef = useRef(null);
  const sixthPointRef = useRef(null);
  const seventhPointRef = useRef(null);
  const eighthPointRef = useRef(null);

  useEffect(() => {
    //get x1 y1 and x2 y2 of each point
    const firstPoint = firstPointRef.current.parentNode.parentNode;
    const secondPoint = secondPointRef.current.parentNode.parentNode;
    const thirdPoint = thirdPointRef.current.getBoundingClientRect();
    const fourthPoint = fourthPointRef.current.getBoundingClientRect();
    const fifthPoint = fifthPointRef.current.getBoundingClientRect();
    const sixthPoint = sixthPointRef.current.getBoundingClientRect();
    const seventhPoint = seventhPointRef.current.getBoundingClientRect();
    const eighthPoint = eighthPointRef.current.getBoundingClientRect();
    createLine(
      firstPoint.clientWidth / 2,
      245,
      secondPoint.clientWidth / 2,
      secondPoint.offsetTop + secondPoint.offsetHeight,
      "line"
    );
    createLine(
      thirdPoint.clientWidth / 2,
      thirdPoint.offsetTop + thirdPoint.offsetHeight,
      fourthPoint.clientWidth / 2,
      fourthPoint.offsetTop + fourthPoint.offsetHeight,
      "line"
    );
  }, []);

  const createLine = (x1, y1, x2, y2, lineId) => {
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const xMid = (x1 + x2) / 2;
    const yMid = (y1 + y2) / 2;
    const slopeInRadians = Math.atan2(y2 - y1, x2 - x1);
    const slopeInDegrees = (slopeInRadians * 180) / Math.PI;

    const line = document.createElement("div");
    line.classList.add("line");
    line.style.width = `${distance}px`;
    line.style.left = `${xMid - distance / 2 - 300}px`;
    line.style.top = `${yMid}px`;
    line.style.transform = `rotate(${slopeInDegrees}deg)`;

    line.id = lineId;
    cardsWrapperRef.current.appendChild(line);
  };

  return (
    <Fragment>
      <div className="section-wrapper">
        <style jsx>{`
          .section-wrapper {
            z-index: 1;
            position: relative;
          }
          .hero-video-background {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;

            z-index: -1;
          }
          .title {
            text-align: center;
            font-size: var(--fs-650);
            font-weight: 200;
            padding: 0 3em;

            color: var(--clr-neutral-50);
          }

          .container {
            margin-bottom: 14em;
          }

          .main-content {
            background-color: var(--clr-main);
          }
          .section-title {
            padding: 0 2em 2em;
          }
          #section-title {
            text-align: center;
            font-weight: 200;
            font-size: var(--fs-525);
            line-height: 1.2;
            padding: 0 1em;
            color: var(--clr-neutral-50);
          }
          .section-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          @media (min-width: 49em) {
            .actions-wrapper {
              flex-direction: row;
              gap: 5em;
            }
            .section-content {
              grid-template-columns: repeat(auto-fit, minmax(35%, 1fr));
            }
            .file-formats-list {
              column-count: 2;
            }
          }
          .cards-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 6em;
            position: relative;
            flex-direction: column;
          }
          .card-wrapper {
            justify-content: center;
            width: 100%;
            gap: 6em;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
          }
          .card {
            position: relative;

            border-radius: 0.5em;
            background: linear-gradient(45deg, #010103, #0b5eb0);

            padding: 2em;
          }
          .connection-point {
            position: absolute;

            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--clr-neutral-50);
          }
          .top-middle {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          .bottom-middle {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
          .card-text {
            font-size: 1.3rem;
            font-weight: 200;
            margin-bottom: 0;
            color: var(--clr-neutral-50);
          }
          .card-text > span {
            font-size: 1.5rem;
            font-weight: 900;
          }
          .section-footer {
            text-align: center;
          }
          .section-footer_title {
            font-size: var(--fs-550);
            font-weight: 400;
            color: var(--clr-neutral-50);
            margin-bottom: var(--offset-4);
            line-height: 1.3;
          }
          .container-break {
            background: rgb(4, 11, 19);
            background: linear-gradient(
              53deg,
              rgba(4, 11, 19, 1) 0%,
              rgba(40, 78, 109, 1) 66%,
              rgba(0, 97, 171, 1) 100%
            );
            padding: 2em;
            margin-bottom: var(--offset-7);
          }
          .container-break_title {
            font-size: var(--fs-550);
            font-weight: 500;
            color: var(--clr-neutral-50);
          }
        `}</style>
        <video autoPlay loop className="hero-video-background">
          <source src="/videos/hero-eztitles.webm" type="video/webm" />
        </video>
        <section
          className="section offset-top fill-screen"
          aria-labelledby="title"
        >
          <div className="container flex-center-center-column">
            <h1 className="title" id="title">
              EZTitles Classroom packages for educational porposes
            </h1>
            <div className="scroll-to-content-arrow">
              <ScrollDownArrow destination="#anchor" />
            </div>
          </div>
        </section>
        <section className="section main-content" id="anchor">
          <div className="container">
            <div className="section-title">
              <h2 id="section-title">
                We know how important the proper education is for building the
                professionals of tomorrow. Using a professional software will
                immerse the AVT students in their future work environment.
              </h2>
            </div>
            <div
              className="section-content cards-wrapper"
              style={{ "margin-bottom": "2em" }}
              ref={cardsWrapperRef}
            >
              <div className="card-wrapper">
                <div
                  className="card"
                  style={{ gridColumn: "1/3", margin: "0% 25%" }}
                >
                  <div
                    className="connection-point bottom-middle"
                    ref={firstPointRef}
                  ></div>
                  <h3 className="card-text">
                    EZTitles offers the educational institutions a{" "}
                    <span>80% discount for full licenses</span> with{" "}
                    <span>free lifetime support</span> and a{" "}
                    <span>free license for the teacher</span>
                  </h3>
                </div>
              </div>
              <div className="card-wrapper">
                <div
                  className="card"
                  style={{ gridColumn: "1/3", margin: "0% 25%" }}
                >
                  <div
                    className="connection-point top-middle"
                    ref={secondPointRef}
                  ></div>
                  <div
                    className="connection-point bottom-middle"
                    ref={thirdPointRef}
                  ></div>
                  <h3 className="card-text  text-center">
                    We provide two options for licensing
                  </h3>
                </div>
              </div>
              <div className="card-wrapper">
                <div className="card">
                  <div
                    className="connection-point top-middle"
                    ref={fourthPointRef}
                  ></div>
                  <div
                    className="connection-point bottom-middle"
                    ref={sixthPointRef}
                  ></div>
                  <h3 className="card-text">
                    On-line Licence Management This option gives the{" "}
                    <strong>flexibility</strong> to assign a license to a
                    specific student for a specified period of time and this
                    license is not bound to a single computer. OLM licensing is
                    perfect for <strong>distance learning</strong> and comes
                    with an annual hosting fee.
                  </h3>
                </div>
                <div className="card">
                  <div
                    className="connection-point top-middle"
                    ref={fifthPointRef}
                  ></div>
                  <div
                    className="connection-point bottom-middle"
                    ref={seventhPointRef}
                  ></div>
                  <h3 className="card-text">
                    Hardware activation This solution is good if an University
                    wants to equip an AVT lab with professional subtitling
                    software. The licenses will be bound to the machines in the
                    classroom.
                  </h3>
                </div>
              </div>
              <div className="card-wrapper">
                <div
                  className="card"
                  style={{ gridColumn: "1/3", margin: "0% 25%" }}
                >
                  <div
                    className="connection-point top-middle"
                    ref={eighthPointRef}
                  ></div>

                  <h3 className="card-text">
                    Finally, we offer <strong>5% discount</strong> for our
                    products <strong>to all graduates</strong> from educational
                    institutions with AVT programs with EZTitles.
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="container" style={{ marginBottom: "0 !important" }}>
            <div
              className="section-content"
              style={{ "margin-bottom": "2em" }}
            ></div>
          </div>
          <div className="container">
            <div className="section-title">
              <h2 id="section-title">
                Learn more about the Classroom packages
              </h2>
            </div>

            <div
              className="section-content action"
              style={{ "margin-bottom": "2em" }}
            >
              <a className="button button_basic_long">contact us</a>
            </div>
          </div>
        </section>
      </div>
      <section className={styles.clients_section} aria-labelledby="clients">
        <style jsx>{`
          .section-title {
            padding: 0 2em 2em;
          }
          #section-title {
            text-align: center;
            font-weight: 200;
            font-size: var(--fs-525);
            line-height: 1.2;
            padding: 0 1em;
            color: var(--clr-neutral-50);
          }
          section {
            background-color: var(--clr-main);
            padding-bottom: var(--offset-9);
            z-index: 1;
          }
        `}</style>
        <div className="section-title">
          <h2 id="section-title">
            Universities using the EZTiltes Classroom package
          </h2>
        </div>

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
                  <img
                    src="/images/clients/Disney.svg"
                    width={220}
                    height={42}
                  />
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
                  <img
                    src="/images/clients/Disney.svg"
                    width={220}
                    height={42}
                  />
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
      </section>
    </Fragment>
  );
}
