import { useState } from "react";
export default function FirstRow() {
  const [isOpen, setIsOpen] = useState({
    first: "closed",
    second: "closed",
    third: "closed",
  });
  function handleOpenClick(containerNumber) {
    if (containerNumber === "first") {
      if (isOpen.first === "closed") {
        setIsOpen({
          first: "opening",
          second: "shrinking",
          third: "shrinking",
        });
        setTimeout(() => {
          setIsOpen({ first: "open", second: "shrunk", third: "shrunk" });
        }, 300);
      } else {
        setIsOpen({
          first: "closing",
          second: "expanding",
          third: "expanding",
        });
        setTimeout(() => {
          setIsOpen({ first: "closed", second: "closed", third: "closed" });
        }, 300);
      }
    } else if (containerNumber === "third") {
      if (isOpen.third === "closed") {
        setIsOpen({
          first: "shrinking",
          second: "shrinking",
          third: "opening",
        });
        setTimeout(() => {
          setIsOpen({ first: "shrunk", second: "shrunk", third: "open" });
        }, 300);
      } else {
        setIsOpen({
          first: "expanding",
          second: "expanding",
          third: "closing",
        });
        setTimeout(() => {
          setIsOpen({ first: "closed", second: "closed", third: "closed" });
        }, 300);
      }
    }
  }

  return (
    <div className="first_row-container">
      <style jsx>{`
        .first_row-container {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        @media screen and (max-width: 1100px) {
          .first_row-container {
            display: flex;
            gap: 2rem;
            flex-direction: column;
          }
        }
        .streaming_services-container,
        .closed_captions-container,
        .digital_cinema-container {
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

        .streaming_services-container.closing,
        .closed_captions-container.closing,
        .digital_cinema-container.closing {
          flex: 0 1 33%;
        }
        .closed_captions-container.shrinking,
        .closed_captions-container.shrunk {
          flex: 0 1 3%;
        }
        .digital_cinema-container.shrinking,
        .digital_cinema-container.shrunk {
          flex: 0 1 3%;
        }
        .streaming_services-container.shrinking,
        .streaming_services-container.shrunk {
          flex: 0 1 3%;
        }
        .streaming_services-container.opening,
        .streaming_services-container.open {
          flex: 0 1 93%;
        }
        .digital_cinema-container.opening,
        .digital_cinema-container.open {
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

        .streaming_services-container {
          background-image: url("/images/software/eztitles/blue_pad.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .closed_captions-container {
          background-image: url("/images/software/eztitles/cc_pad.png");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        .digital_cinema-container {
          background-image: url("/images/software/eztitles/dc_pad.png");
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
        .content_face.closed {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.26s ease;
        }
        .content_back.open {
          opacity: 1;
          transform: translateY(0);
        }
        .streaming_services-back-list li {
          color: var(--clr-neutral-100);
          margin-bottom: var(--offset-2);
          font-weight: 400;
        }
        .streaming_services-back-list li::before {
          content: "•";
          font-weight: bold;
          color: var(--clr-primary);
          margin-right: 0.5rem;
        }
        .streaming_services-back-list > li > a {
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

          margin-bottom: var(--offset-3);
        }
        .content_face-description {
          color: var(--clr-neutral-100);
          margin-bottom: var(--offset-6);
        }
        .streaming_services-icons {
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
        .digital_cinema-gird {
          display: grid;
          gap: var(--offset-3);
          grid-template-columns: 1fr 1fr;
        }
        .digital_cinema-gird-column {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .digital_cinema-gird-column > p {
          font-size: 1.2rem;
          color: var(--clr-neutral-100);
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.25px;
          margin-bottom: var(--offset-3);
        }
        .digital_cinema-gird-column > ul {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .digital_cinema-grid-column > ul > li {
          font-size: 1.2rem;
          color: var(--clr-neutral-100);
          text-align: center;
          font-weight: 500;
          letter-spacing: 0.25px;
          margin-bottom: var(--offset-3);
        }
        .digital_cinema_section {
          display: flex;
          flex-direction: column;
          gap: var(--offset-1);
        }
        .digital_cinema_section_inner {
        }
        .digital_cinema_section_inner li::before {
          content: "•";
          font-weight: bold;
          color: var(--clr-primary);
          margin-right: 0.5rem;
        }
        .digital_cinema_section-title {
          font-size: 1.35rem;
          color: var(--clr-neutral-50);
          font-weight: 500;
          letter-spacing: 0.25px;
        }
        .digital_cinema_section-description {
          color: var(--clr-neutral-150);
          font-size: var(--fs-300);
        }
      `}</style>
      <div className={`streaming_services-container  ${isOpen.first}`}>
        <svg
          onClick={() => handleOpenClick("first")}
          width="68"
          height="48"
          className="open_container_right"
          viewBox="0 0 68 48"
          fill="none"
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

        <div className={`content_face ${isOpen.first}`}>
          <h3 className="content_face-title">Streaming Services</h3>
          <p className="content_face-description">
            EZTitles is designed to subtitle all major Streaming Services with a
            world class quality.
          </p>
          <div className="streaming_services-icons">
            <div className="streaming_services-icon">
              <img
                src="/images/software/eztitles/netflix.png"
                alt="Netflix"
                width="100%"
                height="100%"
              />
            </div>
            <div className="streaming_services-icon">
              <img
                src="/images/software/eztitles/hbo_max.png"
                alt="Hulu"
                width="100%"
                height="100%"
              />
            </div>
            <div className="streaming_services-icon">
              <img
                src="/images/software/eztitles/apple_tv_plus.png"
                alt="Apple TV+"
                width="100%"
                height="100%"
              />
            </div>
            <div className="streaming_services-icon">
              <img
                src="/images/software/eztitles/prime_video.png"
                alt="Amazon Prime Video"
                width="100%"
                height="100%"
              />
            </div>
            <div className="streaming_services-icon">
              <img
                src="/images/software/eztitles/disney_plus.png"
                alt="Disney Plus"
                width="100%"
                height="100%"
              />
            </div>
            <div className="streaming_services-icon">
              <img
                src="/images/software/eztitles/hulu.png"
                alt="Hulu"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
        <div className={`content_back ${isOpen.first}`}>
          <h3 className="content_back-title">
            Streaming Services an Open Subtitles
          </h3>
          <p className="content_face-description">
            EZTitles is designed to comply with all the{" "}
            <strong>Streaming Services</strong> as{" "}
            <strong>Netflix, Disney+, Apple TV+, Amazon Prime, Hulu</strong> and
            others, <strong>TV broadcast, film</strong> and{" "}
            <strong>NLE standards</strong>.
          </p>

          <ul className="streaming_services-back-list">
            <li>
              EZTitles is an official{" "}
              <a className="underlined_link" href="/subtitle#">
                Netflix Partner
              </a>{" "}
              for Timed Text creation and works together with both Netflix and
              Disney on the easy and accurate fulfillment of their requirements
              with our products.
            </li>
            <li>
              With our subtitling tools you could work in any language - West,
              Central and East European, Arabic, Hebrew, Persian, South and East
              Asian, incl.{" "}
              <a className="underlined_link" href="/subtitle#">
                vertical orientation, Rubies and Bouten for Chinese, Japanese
                and Korean scripts
              </a>
              .
            </li>
            <li>
              Export all industry standard{" "}
              <a className="underlined_link" href="/subtitle#">
                Timed Text and Open Subtitles File Formats
              </a>
              .
            </li>
            <li>
              Always deliver perfect subtitles to meet your client’s
              requirements thanks to the automated{" "}
              <a className="underlined_link" href="/subtitle#">
                Checks and Fixes
              </a>
              .
            </li>
            <li>
              EZTitles is fully geared up to prepare flawless SDH subtitles.
              They can be in the source language of the video, as they include
              important non-dialogue audio sound effects and speaker
              identification, or in foreign languages if needed. Overlaps,
              colors and precise text positioning on the screen are all
              supported by EZTitles.
            </li>
          </ul>
        </div>
      </div>
      <div className={`closed_captions-container ${isOpen.second}`}>
        <div className={`content_face ${isOpen.second}`}>
          <h3 className="content_face-title">Closed Captions</h3>
          <p className="content_face-description">
            EZTitles is a great software for Closed Captions creation. You can
            prepare stellar Roll-up, Paint-on and Pop-on Closed Captions
            stunningly fast in CEA-608, CEA-708 or other file formats.
          </p>
          <div className="closed-captions_button">
            <a href="/subtitle/closed-captions" className="button_white-bg">
              Learn More
            </a>
          </div>
        </div>
      </div>
      <div className={`digital_cinema-container ${isOpen.third}`}>
        <svg
          onClick={() => handleOpenClick("third")}
          width="68"
          height="48"
          className="open_container_left"
          viewBox="0 0 68 48"
          fill="none"
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

        <div className={`content_face ${isOpen.third}`}>
          <h3 className="content_face-title">Digital Cinema</h3>
          <p className="content_face-description">
            Prepare quality subtitles for Digital Cinema and see exactly how
            they will look like on the theater’s screen in any resolution from
            2K up to 4K.
          </p>
          <div className="digital_cinema-gird">
            <div className="digital_cinema-gird-column">
              <p>Resolution</p>
              <ul>
                <li>1998 x 1080</li>
                <li>2048 x 858</li>
                <li>2048 x 1080</li>
                <li>3996 x 2160</li>
                <li>4096 x 1716</li>
                <li>4096 x 2160</li>
              </ul>
            </div>
            <div className="digital_cinema-gird-column">
              <p>Aspect Ratio</p>
              <ul>
                <li>1.85 : 1</li>
                <li>2.39 : 1</li>
                <li>1.90 : 1</li>
                <li>1.85 : 1</li>
                <li>2.39 : 1</li>
                <li>1.90 : 1</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`content_back ${isOpen.third}`}>
          <h3 className="content_back-title">Digital Cinema</h3>

          <div className="digital_cinema_section">
            <div className="digital_cinema_section_inner">
              <h4 className="digital_cinema_section-title">
                Digital Cinema Ready
              </h4>
              <p className="digital_cinema_section-description">
                EZTitles supports Texas Instruments CineCanvas XML-based
                subtitles for the DLP Cinema projection system and the SMPTE
                428-7-2014 DCDM (Digital Cinema Distribution Master) XML
                specifications. Get a 100% accurate preview of your subtitles in
                the exact way they appear on the theater’s screen.
              </p>
            </div>
            <div className="digital_cinema_section_inner">
              <h4 className="digital_cinema_section-title">
                Digital Cinema Mode
              </h4>
              <p className="digital_cinema_section-description">
                EZTitles has a dedicated presentation mode which complies with
                all the standards and requirements of Digital Cinema subtitling.
                The Digital Cinema mode supports the following image
                resolutions:
              </p>
              <ul>
                <li>1998 x 1080, 2K flat in 1.85 : 1 aspect ratio;</li>
                <li>2048 x 858, 2K scope in 2.39 : 1 aspect ratio;</li>
                <li>2048 x 1080, 2K full container in 1.90:1 aspect ratio;</li>
                <li>3996 x 2160, 4K flat in 1.85 : 1 aspect ratio;</li>
                <li>4096 x 1716, 4K scope in 2.39 : 1 aspect ratio;</li>
                <li>4096 x 2160, 4K full container in 1.90:1 aspect ratio.</li>
              </ul>
            </div>
            <div className="digital_cinema_section_inner">
              <p className="digital_cinema_section-description">
                EZTitles covers the full range of the Digital Cinema subtitle
                specifications by adding support for the
                <a className="underlined_link" href="/subtitle#">
                  ruby characters and vertical text
                </a>
                . Subtitles containing ruby characters and vertical text can now
                be exported and imported as text or image-based subtitles for
                Digital Cinema. Check all{" "}
                <a className="underlined_link" href="/subtitle#">
                  exporting options
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
