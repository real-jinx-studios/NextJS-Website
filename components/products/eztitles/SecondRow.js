import { useState } from "react";
export default function SecondRow() {
  const [isOpen, setIsOpen] = useState({
    first: "closed",
    second: "closed",
    third: "closed",
  });
  function handleOpenClick(service) {
    if (isOpen.first === "closed") {
      setIsOpen({ first: "opening", second: "shrinking", third: "shrinking" });
      setTimeout(() => {
        setIsOpen({ first: "open", second: "shrunk", third: "shrunk" });
      }, 300);
    } else {
      setIsOpen({ first: "closing", second: "expanding", third: "expanding" });
      setTimeout(() => {
        setIsOpen({ first: "closed", second: "closed", third: "closed" });
      }, 300);
    }
  }

  return (
    <div className="second_row-container">
      <style jsx>{`
        .second_row-container {
          display: flex;
          gap: 2rem;
        }
        @media screen and (max-width: 1100px) {
          .second_row-container {
            display: flex;
            gap: 2em;
            flex-direction: column;
          }
        }

        .blue_and_dvd-container,
        .teletext-container,
        .dvb-container {
          position: relative;
          background: rgb(5, 11, 20);
          background: linear-gradient(
            30deg,
            rgba(5, 11, 20, 1) 0%,
            rgba(9, 53, 98, 1) 40%,
            rgba(12, 97, 179, 1) 100%
          );
          display: flex;
          min-height: 630px;
          border-radius: 16px;
          overflow: hidden;
          flex-direction: column;
          /*height: 500px;*/
          flex: 0 1 33%;
          transition: all 0.26s ease;
        }

        .blue_and_dvd-container.closing,
        .teletext-container.closing,
        .dvb-container.closing {
          flex: 0 1 33%;
        }
        .blue_and_dvd-container.opening ~ .teletext-container,
        .blue_and_dvd-container.open ~ .teletext-container {
          flex: 0 1 3%;
        }
        .blue_and_dvd-container.opening ~ .dvb-container,
        .blue_and_dvd-container.open ~ .dvb-container {
          flex: 0 1 3%;
        }
        .blue_and_dvd-container.opening,
        .blue_and_dvd-container.open {
          flex: 0 1 93%;
        }

        .open_container_right,
        .open_container_left {
          z-index: 2;
          cursor: pointer;
          position: absolute;
          bottom: 0;
          right: 0;
          transform-origin: center;
          transition: all linear 0.11s;
          transform: scale(0.8) translateX(25%);
        }

        .open_container_left {
          left: 0;
          transform: scale(0.8) translateX(25%) rotate(-180deg);
        }
        #darkGroup {
          fill: var(--clr-neutral-250);
        }
        #lightGroup {
          fill: var(--clr-neutral-50);
        }
        #dark1,
        #dark2,
        #light1 {
          transition: all ease 0.8s;
        }

        #dark2 {
          transform: translateX(-100%);
        }
        .open_container_right:hover #light1 {
          transform: translateX(20%);
        }
        .open_container_right:hover #dark1 {
          transform: translateX(40%);

          opacity: 0;
        }
        .open_container_right:hover #dark2 {
          transform: translateX(0);
        }

        .blue_and_dvd-container {
          background-image: url("/images/software/eztitles/ray_pad.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .teletext-container {
          background-image: url("/images/software/eztitles/teletext_pad.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .dvb-container {
          background-image: url("/images/software/eztitles/blue_pad.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .content_face {
          padding: 2.5em;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0;
          transform: translateY(-100%);
          transition: all 0.06s ease;
        }
        .content_back {
          padding: 2.5em;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          opacity: 0;
          transform: translateY(-100%);
          transition: all 0.26s ease;
        }
        .blue_and_dvd-container.closed .content_face,
        .teletext-container.closed .content_face,
        .dvb-container.closed .content_face {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.26s ease;
        }
        .blue_and_dvd-container.open .content_back {
          opacity: 1;
          transform: translateY(0);
        }
        .blue_and_dvd-back-list {
          columns: 2;
          margin-bottom: var(--offset-4);
        }
        .blue_and_dvd-back-list li {
          color: var(--clr-neutral-100);
          margin-bottom: var(--offset-2);
          font-weight: 400;
        }
        .blue_and_dvd-back-list li::before {
          content: "•";
          font-weight: bold;
          color: var(--clr-primary);
          margin-right: 0.5rem;
        }
        .blue_and_dvd-back-list > li > a {
          color: var(--clr-primary);
        }
        .content_face-title {
          font-size: 1.68rem;
          color: var(--clr-neutral-50);
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.25px;

          margin-bottom: var(--offset-6);
        }
        .content_back-title {
          font-size: 1.68rem;
          color: var(--clr-neutral-50);
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.25px;

          margin-bottom: var(--offset-2);
        }
        .content_face-description {
          color: var(--clr-neutral-100);
          margin-bottom: var(--offset-6);
        }
        .content_back-description {
          font-size: var(--fs-300);
          color: var(--clr-neutral-100);
          margin-bottom: var(--offset-4);
        }
        .blue_and_dvd-icons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.8em;

          margin-top: 2rem;
        }
        .closed-captions_button {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dvb-gird {
          display: grid;
          gap: var(--offset-3);
          grid-template-columns: 1fr 1fr;
        }
        .dvb-gird-column {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .dvb-gird-column > p {
          font-size: 1.2rem;
          color: var(--clr-neutral-100);
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.25px;
          margin-bottom: var(--offset-3);
        }
        .dvb-gird-column > ul {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .dvb-grid-column > ul > li {
          font-size: 1.2rem;
          color: var(--clr-neutral-100);
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.25px;
          margin-bottom: var(--offset-3);
        }
        .dvb_section {
          display: flex;
          flex-direction: column;
          gap: var(--offset-1);
        }
        .dvb_section_inner {
        }
        .dvb_section_inner li::before {
          content: "•";
          font-weight: bold;
          color: var(--clr-primary);
          margin-right: 0.5rem;
        }
        .dvb_section-title {
          font-size: 1.35rem;
          color: var(--clr-neutral-50);
          font-weight: 500;
          letter-spacing: 0.25px;
        }
        .dvb_section-description {
          color: var(--clr-neutral-150);
          font-size: var(--fs-300);
        }
      `}</style>
      <div className={`blue_and_dvd-container ${isOpen.first}`}>
        <svg
          width="68"
          height="48"
          className="open_container_right"
          viewBox="0 0 68 48"
          fill="none"
          onClick={() => handleOpenClick("blue_and_dvd")}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="68" height="48" />
          <g id="triangles">
            <g id="darkGroup">
              <path
                id="dark1"
                opacity="0.7"
                d="M33.5 21.4019C35.5 22.5566 35.5 25.4434 33.5 26.5981L6.5 42.1865C4.5 43.3412 2 41.8979 2 39.5885L2 8.41154C2 6.10214 4.5 4.65877 6.5 5.81347L33.5 21.4019Z"
              />
              <path
                id="dark2"
                opacity="0.7"
                d="M53.4999 21.4019C55.4999 22.5566 55.4999 25.4434 53.4999 26.5981L26.4999 42.1865C24.4999 43.3412 21.9999 41.8979 21.9999 39.5885L21.9999 8.41154C21.9999 6.10214 24.4999 4.65877 26.4999 5.81347L53.4999 21.4019Z"
              />
            </g>
            <g id="lightGroup">
              <path
                id="light1"
                opacity="0.7"
                d="M33.5 21.4019C35.5 22.5566 35.5 25.4434 33.5 26.5981L6.5 42.1865C4.5 43.3412 2 41.8979 2 39.5885L2 8.41154C2 6.10214 4.5 4.65877 6.5 5.81347L33.5 21.4019Z"
              />
            </g>
          </g>
        </svg>

        <div className="content_face">
          <h3 className="content_face-title">Blue-ray and DVD</h3>
          <p className="content_face-description">
            EZTitles can create BDN subtitle files in compliance with all
            industry standards. Whether it is DVD, NLE or Blu-ray with EZTitles
            you can create subtitles for them all. Text script formats and
            high-quality anti-aliased images are available.
          </p>
        </div>
        <div className="content_back">
          <h3 className="content_back-title">Blue-ray and DVD</h3>
          <p className="content_back-description">
            EZTitles can prepare BDN subtitle files in compliance with all
            industry standards. Whether it is DVD, NLE or Blu-ray. With EZTitles
            you can create subtitles for them all. Text script formats and
            high-quality anti-aliased images are available for the following
            systems:
          </p>

          <ul className="blue_and_dvd-back-list">
            <li>DaVinci Resolve,</li>
            <li>Sony Blu-print™,</li>
            <li>Sonic Scenarist HDMV (Blu-ray),</li>
            <li>Sonic Scenarist Advanced Contents (HD-DVD),</li>
            <li>Adobe® Encore® DVD,</li>
            <li>Apple® DVD Studio Pro®,</li>
            <li>Spruce DVD Maestro,</li>
            <li>Final Cut Pro®,</li>
            <li>Sony DoStudio,</li>
            <li>Sony DVD Architect and many more.</li>
          </ul>
          <p>
            Check all <a className="underlined_link">supported formats</a>.
          </p>
        </div>
      </div>
      <div className={`teletext-container ${isOpen.second}`}>
        <div className="content_face">
          <h3 className="content_face-title">Teletext</h3>
          <p className="content_face-description">
            EZTitles easily prepare Teletext subtitles and even offers a
            specified profile preset for that. Just choose it and the program
            will change the interface to focus on the tools you’d mostly need to
            get the job done.
          </p>
        </div>
      </div>
      <div className={`dvb-container ${isOpen.third}`}>
        <div className="content_face">
          <h3 className="content_face-title">DVB Subtitles</h3>
          <p className="content_face-description">
            DVB Subtitles Generate ETSI EN 300 743 compatible DVB subtitling
            elementary stream for muxing with ProMedia Carbon multiplexers.
            There is an option to export Generic DVB Elementary Stream as well.
          </p>
        </div>
      </div>
    </div>
  );
}
