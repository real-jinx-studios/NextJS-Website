import { useState } from "react";
import ScrollDownArrow from "../../components/utils/ScrollDownArrow";

export default function FeaturesPage() {
  const [selectedItem, setSelectedItem] = useState("SDH captions");
  const [expanded, setExpanded] = useState(false);
  const handleNavClick = (item) => {
    setSelectedItem(item);
  };
  const menuItems = [
    "SDH captions",
    "Make EZTitles yours",
    "Work with video",
    "Work with files",
    "Manipulate text",
    "Handy tools",
  ].map((item) => (
    <li
      onClick={() => {
        handleNavClick(item);
      }}
      className={selectedItem === item ? "nav_item_active" : "nav_item"}
    >
      <style jsx>{`
        .nav_item,
        .nav_item_active {
          cursor: pointer;
          position: relative;
          margin-bottom: 1.96em;
        }
        .nav_item_icon {
          position: absolute;
          left: -0.9em;
          top: 50%;
          width: 1.5em;
          height: 1.5em;
          transform: translateY(-50%);
          transition: all 0.3s ease;
        }
        .nav_item_icon > path {
          transform: translateY(100%);
          transition: all 0.3s var(--cubic-bezier);
        }
        .nav_item_active .nav_item_icon > path {
          transform: translateY(-0%);
        }

        .whatever h3 {
          color: var(--clr-neutral-50);
        }
        .nav_item_inner {
          font-size: 1rem;
          position: relative;
          padding: 0.5em 1em;

          color: var(--clr-neutral-150);
        }

        .nav_item:hover .nav_item_icon > path {
          transform: translateY(-0%);
          color: var(--clr-neutral-200);
        }
        .nav_item:hover .nav_item_inner {
          font-weight: 500;
        }
        .nav_item:hover .nav_item_inner::before {
          transform: scaleX(0.89);
          background: var(--clr-neutral-50);
        }
        .nav_item_active .nav_item_inner {
          color: var(--clr-neutral-50);
          font-weight: 500;
        }
      `}</style>
      <span className="nav_item_inner">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="nav_item_icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {item}
      </span>
    </li>
  ));

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="97.064"
      height="90"
      viewBox="0 0 97.064 90"
    >
      <g
        id="Group_231"
        data-name="Group 231"
        transform="translate(-1394 -15955)"
      >
        <g id="Icon" transform="translate(1327 15979)">
          <g
            id="Group_205"
            data-name="Group 205"
            transform="translate(64.5 -28.21)"
          >
            <g
              id="Group_198"
              data-name="Group 198"
              transform="translate(2.5 4.21)"
            >
              <g id="Group_189" data-name="Group 189">
                <path
                  id="Path_601"
                  data-name="Path 601"
                  d="M93.251,75.187H8.813A6.319,6.319,0,0,1,2.5,68.875V10.523A6.321,6.321,0,0,1,8.813,4.21H93.251a6.321,6.321,0,0,1,6.313,6.313V68.875A6.319,6.319,0,0,1,93.251,75.187ZM8.813,6.275a4.254,4.254,0,0,0-4.248,4.248V68.875a4.252,4.252,0,0,0,4.248,4.246H93.251A4.252,4.252,0,0,0,97.5,68.875V10.523a4.254,4.254,0,0,0-4.248-4.248Z"
                  transform="translate(-2.5 -4.21)"
                  fill="#4dc4ef"
                />
              </g>
              <g
                id="Group_193"
                data-name="Group 193"
                transform="translate(26.55 68.922)"
              >
                <g
                  id="Group_190"
                  data-name="Group 190"
                  transform="translate(34.792)"
                >
                  <path
                    id="Path_602"
                    data-name="Path 602"
                    d="M33.236,55.54A1.032,1.032,0,0,1,32.2,54.507V38.616a1.033,1.033,0,1,1,2.065,0V54.507A1.032,1.032,0,0,1,33.236,55.54Z"
                    transform="translate(-32.203 -37.583)"
                    fill="#4dc4ef"
                  />
                </g>
                <g
                  id="Group_191"
                  data-name="Group 191"
                  transform="translate(7.125)"
                >
                  <path
                    id="Path_603"
                    data-name="Path 603"
                    d="M19.839,55.521a1.032,1.032,0,0,1-1.033-1.033V38.616a1.033,1.033,0,1,1,2.065,0V54.489A1.033,1.033,0,0,1,19.839,55.521Z"
                    transform="translate(-18.806 -37.583)"
                    fill="#4dc4ef"
                  />
                </g>
                <g
                  id="Group_192"
                  data-name="Group 192"
                  transform="translate(0 14.064)"
                >
                  <path
                    id="Path_604"
                    data-name="Path 604"
                    d="M16.389,51.406a1.032,1.032,0,0,1-.44-1.966c.436-.207,10.817-5.047,21.265-5.047,10.727,0,21.1,4.841,21.534,5.047a1.032,1.032,0,0,1-.882,1.867c-.1-.048-10.4-4.849-20.652-4.849-9.989,0-20.282,4.8-20.386,4.849A1.012,1.012,0,0,1,16.389,51.406Z"
                    transform="translate(-15.356 -44.393)"
                    fill="#4dc4ef"
                  />
                </g>
              </g>
              <g
                id="Group_194"
                data-name="Group 194"
                transform="translate(0 58.199)"
              >
                <path
                  id="Path_605"
                  data-name="Path 605"
                  d="M98.532,34.456h-95a1.033,1.033,0,1,1,0-2.065h95a1.033,1.033,0,1,1,0,2.065Z"
                  transform="translate(-2.5 -32.391)"
                  fill="#4dc4ef"
                />
              </g>
              <g
                id="Group_195"
                data-name="Group 195"
                transform="translate(86.373 63.675)"
              >
                <path
                  id="Path_606"
                  data-name="Path 606"
                  d="M45.376,37.084a1.082,1.082,0,0,1-.743-.289,1.143,1.143,0,0,1-.31-.743,1.052,1.052,0,0,1,.31-.723,1.081,1.081,0,0,1,1.466,0,1.032,1.032,0,0,1,.289.723.989.989,0,0,1-1.012,1.033Z"
                  transform="translate(-44.323 -35.042)"
                  fill="#4dc4ef"
                />
              </g>
              <g
                id="Group_196"
                data-name="Group 196"
                transform="translate(81.495 63.675)"
              >
                <path
                  id="Path_607"
                  data-name="Path 607"
                  d="M43.012,37.084a1.081,1.081,0,0,1-.741-.289,1.143,1.143,0,0,1-.31-.743,1.052,1.052,0,0,1,.31-.723,1.079,1.079,0,0,1,1.464,0,1.034,1.034,0,0,1,.291.723,1.123,1.123,0,0,1-.291.743A1.105,1.105,0,0,1,43.012,37.084Z"
                  transform="translate(-41.961 -35.042)"
                  fill="#4dc4ef"
                />
              </g>
              <g
                id="Group_197"
                data-name="Group 197"
                transform="translate(76.344 63.675)"
              >
                <path
                  id="Path_608"
                  data-name="Path 608"
                  d="M40.518,37.084a1.081,1.081,0,0,1-.741-.289,1.143,1.143,0,0,1-.31-.743,1.052,1.052,0,0,1,.31-.723,1.079,1.079,0,0,1,1.464,0,1.034,1.034,0,0,1,.291.723,1.123,1.123,0,0,1-.291.743A1.109,1.109,0,0,1,40.518,37.084Z"
                  transform="translate(-39.467 -35.042)"
                  fill="#4dc4ef"
                />
              </g>
            </g>
            <g
              id="Group_204"
              data-name="Group 204"
              transform="translate(31.687 20.013)"
            >
              <g id="Group_203" data-name="Group 203" transform="translate(0)">
                <g
                  id="Group_199"
                  data-name="Group 199"
                  transform="translate(14.797 21.906)"
                >
                  <path
                    id="Path_609"
                    data-name="Path 609"
                    d="M27.357,22.7a3.31,3.31,0,1,0,2.34.969A3.294,3.294,0,0,0,27.357,22.7Zm1.819,5.128a2.634,2.634,0,0,1-3.639,0,2.575,2.575,0,1,1,3.639,0Z"
                    transform="translate(-23.531 -22.222)"
                    fill="#4dc4ef"
                  />
                  <path
                    id="Path_610"
                    data-name="Path 610"
                    d="M27.625,30.083a3.825,3.825,0,0,1-2.705-6.53,3.919,3.919,0,0,1,5.411,0,3.825,3.825,0,0,1-2.705,6.53Zm0-5.882a2.046,2.046,0,1,0,0,4.091h0a2.059,2.059,0,0,0,1.452-.578h0a2.057,2.057,0,0,0,0-2.912A2.041,2.041,0,0,0,27.627,24.2Z"
                    transform="translate(-23.798 -22.469)"
                    fill="#4dc4ef"
                  />
                </g>
                <g
                  id="Group_200"
                  data-name="Group 200"
                  transform="translate(10.462 14.512)"
                >
                  <path
                    id="Path_611"
                    data-name="Path 611"
                    d="M29.595,19.139a10.589,10.589,0,0,0-7.538,3.127.367.367,0,0,0,.518.52,9.919,9.919,0,0,1,14.041,0,.368.368,0,0,0,.52-.52A10.6,10.6,0,0,0,29.595,19.139Z"
                    transform="translate(-21.433 -18.623)"
                    fill="#4dc4ef"
                  />
                  <path
                    id="Path_612"
                    data-name="Path 612"
                    d="M22.581,23.676a.884.884,0,0,1-.624-1.51,11.171,11.171,0,0,1,15.809,0,.886.886,0,0,1,0,1.249.9.9,0,0,1-1.249,0,9.406,9.406,0,0,0-13.312,0A.883.883,0,0,1,22.581,23.676Z"
                    transform="translate(-21.699 -18.889)"
                    fill="#4dc4ef"
                  />
                </g>
                <g
                  id="Group_201"
                  data-name="Group 201"
                  transform="translate(5.26 7.156)"
                >
                  <path
                    id="Path_613"
                    data-name="Path 613"
                    d="M32.278,15.577a17.9,17.9,0,0,0-12.74,5.281.368.368,0,0,0,.52.52,17.273,17.273,0,0,1,24.442,0,.361.361,0,0,0,.26.107.368.368,0,0,0,.26-.628A17.915,17.915,0,0,0,32.278,15.577Z"
                    transform="translate(-18.914 -15.061)"
                    fill="#4dc4ef"
                  />
                  <path
                    id="Path_614"
                    data-name="Path 614"
                    d="M20.064,22.268a.883.883,0,0,1-.626-1.508,18.522,18.522,0,0,1,26.211,0,.885.885,0,0,1,0,1.249.907.907,0,0,1-1.247,0,16.757,16.757,0,0,0-23.715,0A.871.871,0,0,1,20.064,22.268Zm25.063-.989h0Z"
                    transform="translate(-19.18 -15.327)"
                    fill="#4dc4ef"
                  />
                </g>
                <g id="Group_202" data-name="Group 202" opacity="0.99">
                  <path
                    id="Path_615"
                    data-name="Path 615"
                    d="M35.1,12.012a25.82,25.82,0,0,0-18.161,7.36.505.505,0,0,0,0,.725.532.532,0,0,0,.741,0,25.024,25.024,0,0,1,34.84,0,.528.528,0,0,0,.372.151.52.52,0,0,0,.37-.151.505.505,0,0,0,0-.725A25.817,25.817,0,0,0,35.1,12.012Z"
                    transform="translate(-16.473 -11.702)"
                    fill="#4dc4ef"
                  />
                  <path
                    id="Path_616"
                    data-name="Path 616"
                    d="M53.049,20.718a.839.839,0,0,1-.591-.24,24.71,24.71,0,0,0-34.4,0,.843.843,0,0,1-1.175,0,.815.815,0,0,1,0-1.167,26.4,26.4,0,0,1,36.756,0,.818.818,0,0,1,0,1.167A.842.842,0,0,1,53.049,20.718ZM35.257,12.482a25.511,25.511,0,0,0-17.944,7.274.194.194,0,0,0-.06.14.2.2,0,0,0,.058.14.225.225,0,0,0,.31,0,25.331,25.331,0,0,1,35.271,0c.155.149.246.064.312,0a.2.2,0,0,0,.058-.14.19.19,0,0,0-.06-.14A25.511,25.511,0,0,0,35.257,12.482Z"
                    transform="translate(-16.633 -11.862)"
                    fill="#4dc4ef"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );

  return (
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
          padding: 0 2em;

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
          flex-direction: column;
        }
        .card-wrapper {
          width: 100%;
          display: flex;
          gap: 6em;
          justify-content: center;
          align-items: flex-start;
        }
        .card {
          width: 35%;
          border-radius: 0.5em;
          background: linear-gradient(45deg, #010103, #0b5eb0);

          padding: 2em;
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

        .features_wrapper {
          position: relative;
          padding: 3.2em 2em;
          max-width: 1170px;
          display: flex;
          gap: 2em;
        }
        .features_nav_wrapper {
          position: relative;
          width: 25%;
        }

        .features_nav_wrapper::after {
          content: "";
          position: absolute;
          right: -0.11em;
          top: 0;
          bottom: 0;
          width: 0.11em;
          background: var(--clr-neutral-50);
        }
        .nav-items-wrapper {
          top: var(--offset-top);
          position: sticky;
        }

        .content_wrapper {
          padding: 0 0.3em;
          margin: 0 auto;
          width: 75%;
          overflow-y: auto;
          display: flex;
          flex-wrap: wrap;
        }

        .feature-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: var(--offset-2);
        }
        .feature-icon > svg {
          width: 50px;
          height: 50px;
          fill: var(--clr-neutral-50);
        }
        .feature-title {
          font-size: var(--fs-550);
          font-weight: 900;
          color: var(--clr-text-highlight);
          margin-bottom: var(--offset-2);
        }
        .feature-subtitle {
          font-size: var(--fs-450);
          font-weight: 400;
          color: var(--clr-neutral-50);
          margin-bottom: var(--offset-2);
        }
        .feature-description {
          font-size: var(--fs-300);
          font-weight: 300;
          color: var(--clr-neutral-150);
          margin-bottom: var(--offset-2);
        }
        .content_feature-wrapper {
          padding: 0 2em;
          margin-bottom: var(--offset-6);
        }
        .flex-05 {
          flex: 0 1 50%;
        }
        .flex-1 {
          flex: 0 1 100%;
        }
        @media (max-width: 1180px) {
          .content_wrapper {
            display: flex;
            width: initial;
            flex-direction: column;
          }
          .flex-1,
          .flex-05 {
            flex: initial;
          }
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
            Discover more features and handy tools that will help you work
            faster, more accurately and stress-free with EZTitles
          </h1>
          <div className="scroll-to-content-arrow">
            <ScrollDownArrow destination="#anchor" />
          </div>
        </div>
      </section>
      <section className="section main-content" id="anchor">
        <div className="container">
          <div className="features_wrapper">
            <div className="features_nav_wrapper">
              <ul className="nav-items-wrapper">{menuItems}</ul>
            </div>
            <div className="content_wrapper">
              {selectedItem === "SDH captions" && (
                <div className="content_feature-wrapper flex-1">
                  <h3 className="feature-title">SDH</h3>
                  <h4 className="feature-subtitle">
                    Subtitles for the Deaf and Hard of Hearing
                  </h4>
                  <p className="feature-description">
                    EZTitles is fully geared up to prepare flawless Subtitles
                    for the Deaf and Hard of Hearing (SDH). These are subtitles
                    which combine the information of both captions and
                    subtitles. SDH can be in the source language of the video,
                    as they include important non-dialogue audio sound effects
                    and speaker identification, or in foreign languages if
                    needed. Overlaps, colors and precise text positioning on the
                    screen are all supported by EZTitles.
                  </p>
                </div>
              )}
              {selectedItem === "Make EZTitles yours" && (
                <div className="content_feature-wrapper flex-1">
                  <span className="feature-icon">{icon}</span>
                  <h4 className="feature-subtitle">
                    Customization and Profiles
                  </h4>
                  <p className="feature-description">
                    Almost every aspect of EZTitles is customizable. The program
                    can easily adapt to any unique style of work in no time. The
                    whole{" "}
                    <span className="highlighted-text">visual layout</span> is
                    freely customizable as well as all
                    <span className="highlighted-text">
                      {" "}
                      commands’ shortcuts
                    </span>
                    .
                  </p>
                  <p className="feature-description">
                    <span className="highlighted-text">Profiles</span>
                    <br /> Working on an Open/DVD, Teletext or Closed Captions
                    project? EZTitles’ profile presets will help you with that.
                    Just choose the project type, and the software will change
                    its interface to focus only on the tools you need to get
                    your job done! You can create your own unique profile to fit
                    your work style best! Or simply import one if someone has
                    already done it for you.
                  </p>
                </div>
              )}
              {selectedItem === "Work with video" && (
                <>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Video playback
                    </h4>
                    <p className="feature-description">
                      Speed-up and keep speech understandable. EZTitles boasts
                      an advanced audio filter that allows you to play at 1.5x
                      and 2x speeds with the speech remaining perfectly
                      understandable. With this filter you can not only preview
                      your subtitles in the fastest way possible but also speed
                      up your subtitle preparation process
                      <span className="highlighted-text"> 1.5x - 2x </span>
                      times.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Frame-accurate cueing
                    </h4>
                    <p className="feature-description">
                      EZTitles offers ultra-precise frame by frame
                      forward/backward video playback. And to top it off each
                      single frame can be easily auditioned thanks to the audio
                      scrubbing.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Letterbox Options
                    </h4>
                    <p className="feature-description">
                      Letterboxed videos can sometimes bring additional
                      requirements for the text’s position, and that is why
                      EZTitles offers several options designed to help you in
                      this situation. If you set the correct aspect ratio and
                      letterboxing, you will have an instant view of how your
                      subtitles fit on the picture.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">Video Crop</h4>
                    <p className="feature-description">
                      You could easily change the video resolution to get rid of
                      letterboxes and meet your client's requirements.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Skip the non-speech scenes
                    </h4>
                    <p className="feature-description">
                      With this brilliant timesaving feature EZTitles
                      automatically recognizes and skips scenes with no speech
                      to save you time on the final preview or quality check!
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Full Screen Preview
                    </h4>
                    <p className="feature-description">
                      If your computer has two monitors or a TV-out, the second
                      display can be used for a full screen preview, so you can
                      view your subtitles exactly as they will appear on the
                      viewer’s screen or in the theater.
                    </p>
                  </div>
                </>
              )}
              {selectedItem === "Work with files" && (
                <>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Translation Templates
                    </h4>
                    <p className="feature-description">
                      EZTitles offers you the option to load a second file along
                      with your project to use it as a translation template. It
                      can be used for translating your subtitles into a new
                      language or verifying and proofing already existing
                      subtitles.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Import/Export Presets
                    </h4>
                    <p className="feature-description">
                      You will absolutely fall for this wonderful feature. Now
                      you can configure import and export presets for each of
                      the supported file formats, so you don’t need to check or
                      apply the settings each time you import or export a file.
                      Plus, every preset includes your default save folder so
                      you don’t have to browse for it every time.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      File Revisions
                    </h4>
                    <p className="feature-description">
                      Create labeled versions of your files to track changes.
                      Later, if you want to compare your subtitles’ current
                      state with any of the existing revisions, you just need to
                      choose one from the list.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      File Comparison
                    </h4>
                    <p className="feature-description">
                      Find differences between subtitles’ text, positioning,
                      format and timing. Compare projects and revisions easy.
                      Export differences fast.
                    </p>
                  </div>
                </>
              )}
              {selectedItem === "Manipulate text" && (
                <>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      What You See Is What You Get
                    </h4>
                    <p className="feature-description">
                      All subtitles are displayed exactly the way they’re meant
                      to look. You view and edit your subtitles right over the
                      video, so the appearance properties can be adjusted on the
                      fly depending on the picture beneath.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Helpful Warnings
                    </h4>
                    <p className="feature-description">
                      You will be warned on the fly if you use symbols which are
                      not supported by the language you subtitle for. EZTitles
                      can export Teletext subtitles fully compatible with ARTE’s
                      specifications.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Insert Symbol
                    </h4>
                    <p className="feature-description">
                      You can use the “Edit/Insert/Insert Symbol” dialog box to
                      insert symbols such as ©, ™, µ, ♪, ♫, or special
                      characters that are not on the keyboard. What types of
                      symbols and characters you can insert depends on the font
                      you choose. For example, some fonts may include fractions
                      (¼), international characters (Ç, ë) and currency symbols
                      (£, ¥).
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Find and Replace
                    </h4>
                    <p className="feature-description">
                      EZTitles provides a comprehensive Find & Replace
                      functionality with a lot of useful capabilities.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Dashes and hyphens
                    </h4>
                    <p className="feature-description">
                      There are various requirements for using dashes and
                      hyphens when subtitling a dialogue, splitting text in the
                      middle of a sentence, etc. And that’s why EZTitles
                      introduces a whole group of options to automate this
                      process.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Color Subtitles
                    </h4>
                    <p className="feature-description">
                      EZTitles supports color subtitles in Teletext, Open/DVD
                      and Digital Cinema modes. In addition, the program
                      respects the limitations of the currently chosen format or
                      authoring system.
                    </p>
                  </div>
                </>
              )}
              {selectedItem === "Handy tools" && (
                <>
                  <div
                    className={`content_feature-wrapper ${
                      expanded ? "flex-1" : "flex-05"
                    }`}
                  >
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Cloud Services
                    </h4>

                    {!expanded && (
                      <p className="feature-description text-left">
                        Connect EZTitles to your preferred Cloud Storage service
                        – Google Drive or Dropbox. Start EZTitles on any
                        computer, and all your personal files and preferences
                        will load automatically from the cloud, so that you can
                        work in a familiar environment - you won’t even notice
                        you are using a different workstation.{" "}
                      </p>
                    )}
                    {expanded && (
                      <>
                        <p className="feature-description text-left">
                          Connect EZTitles to your preferred Cloud Storage
                          service - Google Drive or Dropbox.
                        </p>
                        <p className="feature-description text-left">
                          Start EZTitles on any computer, and all your personal
                          files and preferences will load automatically from the
                          cloud, so that you can work in a familiar environment
                          - you won’t even notice you are using a different
                          workstation.
                        </p>
                        <p className="feature-description text-left">
                          Keep your files, settings, keyboard shortcuts, auto
                          correct and spell checker dictionaries, project
                          templates and program visual layout in sync on all
                          your devices. Installing EZTitles on a new computer is
                          as easy as it gets. Once you connect to the cloud, all
                          your settings and files automatically synchronize to
                          be ready for use on the spot.
                        </p>
                        <p className="feature-description text-left">
                          Another advantage of working in the cloud is the
                          ability to share your project templates with your
                          colleagues and coworkers. Later they can connect to
                          your project templates and use them on their
                          computers.
                        </p>
                        <p className="feature-description text-left">
                          Last but not least, you can configure import and
                          export presets for each of the supported file formats,
                          so you don't need to check or apply your settings each
                          time you import or export a file. Plus, presets
                          include your default save folder - you don’t have to
                          browse for it every time.
                        </p>
                      </>
                    )}

                    <div className="feature-action text-center">
                      <button
                        className="button button_basic_long"
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? "hide" : "learn more"}
                      </button>
                    </div>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Import/Export Project Templates
                    </h4>
                    <p className="feature-description text-left">
                      Easily export your Project Settings and share them with a
                      colleague. Or import a Project Template that you’ve
                      received.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Commands Insight
                    </h4>
                    <p className="feature-description text-left">
                      Fast access to all commands in EZTitles. Search in names
                      and descriptions, check shortcuts and execute with a
                      single click.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">Full Undo</h4>
                    <p className="feature-description text-left">
                      EZTitles offers unlimited Undo functionality so you could
                      always track back as far as you need to.
                    </p>
                  </div>
                  <div className="content_feature-wrapper flex-05">
                    <span className="feature-icon">{icon}</span>
                    <h4 className="feature-subtitle text-center">
                      Fast and easy navigation
                    </h4>
                    <p className="feature-description text-left">
                      On the right side of the screen is the subtitle list which
                      shows you all the subtitles, their attributes and the
                      corresponding frame pictures. A small icon next to a
                      subtitle indicates an issue, so spotting mistakes in
                      EZTitles is quite simple.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
