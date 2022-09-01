import { useState } from "react";
import FancyLoader from "../../components/utils/FancyLoader";
import Loader from "../../components/utils/Loader";
import LoaderDots from "../../components/utils/loaderDots";
import ParrotLoader from "../../components/utils/ParrotLoader";

export default function SubtitlingAssistant() {
  const [showLoader, setShowLoader] = useState(false);
  return (
    <div className="section">
      <style jsx>{`
        .wasted {
          display: flex;

          align-items: center;
          justify-content: center;
          width: 100%;
        }
        .wasted h1 {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 500;
          margin-bottom: 1rem;
        }
        .underlay {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(23rem, 1fr));
          grid-template-rows: auto;
          grid-gap: 1.3em;
          padding: 1.3em;
        }
        .title {
          font-size: 1.3rem;
          font-weight: 500;
          color: var(--clr-neutral-50);
        }
        .content {
          display: flex;
          flex-direction: column;
          align-items: center;

          width: 100%;
          height: 100%;
          gap: 1.3em;
        }
        .underlay {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background-color: var(--clr-neutral-50);
        }
        .contain-absolute {
          postion: relative;
        }
        .buttons {
        }
        .buttons.white {
          background-color: var(--clr-neutral-50);
        }
        .buttons.white h3 {
          color: var(--clr-neutral-800);
        }
        .li-button-expandable {
          position: relative;
          list-style: none;
          width: 42px;
          height: 42px;
          background-color: #fff;
          border-radius: 60px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s;
          box-shadow: 0 9px 25px rgba(0, 0, 0, 0.1);
        }
        .li-button-expandable:hover {
          width: 180px;
          box-shadow: 0 9px 25px rgba(0, 0, 0, 0);
        }
        .li-button-expandable::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 60px;
          background: linear-gradient(45deg, var(--i), var(--j));
          opacity: 0;
          transition: 0.5s;
        }
        .li-button-expandable:hover::before {
          opacity: 1;
        }
        .li-button-expandable::after {
          content: "";
          position: absolute;
          top: 9px;
          width: 100%;
          height: 100%;
          border-radius: 60px;
          background: linear-gradient(45deg, var(--i), var(--j));
          transition: 0.42s;
          filter: blur(15px);
          opacity: 0;
          z-index: -1;
        }
        .li-button-expandable:hover::after {
          opacity: 0.8;
        }
        .li-button-expandable span {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .svg-icon {
          width: 1.75em;
          height: 1.75em;
          margin: 0;
          padding: 0;
          stroke: var(--clr-warn);
          transition: 0.42s;
          transition-delay: 0.25s;
        }

        .checkout {
          stroke: #ffd475;
        }
        .celebrate {
          stroke: #f88dad;
        }
        .nav-button-action {
          color: var(--clr-neutral-50);
          font-size: 1.1em;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transform: scale(0);
          transition: 0.42s;
          transition-delay: 0s;
        }
        .li-button-expandable:hover .svg-icon {
          transform: scale(0);
          stroke: var(--clr-neutral-50);
          transition-delay: 0s;
        }
        .li-button-expandable:hover .nav-button-action {
          transform: scale(1);
          transition-delay: 0.25s;
        }
        .li-button-expandable > * {
          user-select: none;
          pointer-events: none;
        }
        .open_close {
          width: 50px;
          height: 50px;
          position: relative;
        }
        .open_close button {
          background-color: transparent;
          position: absolute;
          top: 45%;
          right: -1.35rem;
          transform: translateY(-50%) translateX(-53%);
          border: none;
          color: var(--clr-warn);
          font-size: 2.2rem;

          width: max-content;
          height: max-content;
          overflow: hidden;

          cursor: pointer;
          transition: all 0.3s ease;

          padding: 0;
          margin: 0;

          transform-origin: center center;

          text-decoration: none;
          color: #ccc;
          font-family: "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji",
            Times, Symbola, Aegyptus, Code2000, Code2001, Code2002, Musica,
            serif, LastResort;
          font-variant-emoji: emoji;
        }
        .open_close button:hover {
          transform: translateY(-50%) translateX(-50%) scale(1.38);
          transform-origin: center center;
        }

        /*links*/
        .nav_link_a::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: currentColor;
          transform: scaleX(0) translateZ(0);
          transform-origin: 100% 50%;
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .nav_link_a:hover::before {
          transform: scaleX(1) translateZ(0);
          transform-origin: 0 50%;
        }
        .nav_link_a {
          position: relative;
          font-weight: 300;
          font-size: 0.96rem;
        }
        .secondary_nav-item::before {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          content: "";
          width: 100%;

          transform: scaleX(0);

          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          background-color: var(--clr-neutral-500);
        }
        .secondary_nav-item {
          cursor: pointer;
          position: relative;
          font-size: 0.95rem;
          color: var(--clr-neutral-500);
        }
        .secondary_nav-item:hover {
          color: var(--clr-primary-800);
        }
        .secondary_nav-item:hover::before {
          transform: scaleX(0.95);
        }
        .clients-link {
          font-size: 2em;
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
          top: calc(-3px);
          height: 3px;
        }
      `}</style>
      <div className="container">
        <div className="wasted">
          <h1>I wasted time, and now doth time waste me.</h1>
        </div>
        <div className="grid">
          <div className="buttons ">
            <h3 className="title">Buttons</h3>
            <div className="content">
              <div className="button" data-info="regular">
                In black ink
              </div>
              <div className="button button_basic_long" data-info="fixed width">
                In black ink
              </div>
              <button
                className="button button_basic_long"
                data-info="fixed width"
              >
                In black ink
              </button>

              <div
                className="button button_basic_long_on_light_bg"
                data-info="fixed width on light bg"
              >
                In black ink
              </div>

              <div
                className="button button_basic_long blue"
                data-info="fixed width gradient blue"
              >
                In black ink
              </div>
              <div
                className="button button_basic_long red"
                data-info="fixed width red gradient"
              >
                In black ink
              </div>
              <div
                className="button button_basic_long orange"
                data-info="fixed width orange gradient"
              >
                In black ink
              </div>
              <div
                className="button_white-bg"
                data-info="fixed width orange gradient"
              >
                In black ink
              </div>
              <div className="buy_now_button" data-info="reddish button">
                In black ink
              </div>
              <li
                className="li-button-expandable"
                style={{ "--i": "#ffd475", "--j": "#ffb69c" }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon checkout"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action"> In black ink</span>
              </li>
              <li
                className="li-button-expandable"
                style={{ "--i": "#ea2222", "--j": "#ff5866" }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon burn-state"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action"> In black ink</span>
              </li>
              <li
                className="li-button-expandable"
                style={{ "--i": "#f88dad", "--j": "#726dc3" }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon celebrate"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action"> In black ink</span>
              </li>
              <div className="open_close">
                <button>{"🈹"}</button>
              </div>
              <div className="open_close">
                <button>{"㊙"}</button>
              </div>
            </div>
          </div>
          <div className="buttons white">
            <h3 className="title">Buttons white bg</h3>
            <div className="content">
              <div className="button" data-info="regular">
                In black ink
              </div>
              <div className="button button_basic_long" data-info="fixed width">
                In black ink
              </div>
              <button
                className="button button_basic_long"
                data-info="fixed width"
              >
                In black ink
              </button>

              <div
                className="button button_basic_long_on_light_bg"
                data-info="fixed width on light bg"
              >
                In black ink
              </div>

              <div
                className="button button_basic_long blue"
                data-info="fixed width gradient blue"
              >
                In black ink
              </div>
              <div
                className="button button_basic_long red"
                data-info="fixed width red gradient"
              >
                In black ink
              </div>
              <div
                className="button button_basic_long orange"
                data-info="fixed width orange gradient"
              >
                In black ink
              </div>
              <div
                className="button_white-bg"
                data-info="fixed width orange gradient"
              >
                In black ink
              </div>
              <div className="buy_now_button" data-info="reddish button">
                In black ink
              </div>
              <li
                className="li-button-expandable"
                style={{ "--i": "#ffd475", "--j": "#ffb69c" }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon checkout"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action"> In black ink</span>
              </li>
              <li
                className="li-button-expandable"
                style={{ "--i": "#ea2222", "--j": "#ff5866" }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon burn-state"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action"> In black ink</span>
              </li>
              <li
                className="li-button-expandable"
                style={{ "--i": "#f88dad", "--j": "#726dc3" }}
              >
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg-icon celebrate"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </span>
                <span className="nav-button-action"> In black ink</span>
              </li>
              <div className="open_close">
                <button>{"🈹"}</button>
              </div>
              <div className="open_close">
                <button>{"㊙"}</button>
              </div>
            </div>
          </div>
          <div className="links">
            <h3 className="title">Links</h3>
            <div className="content">
              <a href="#" className="link" data-info="regular">
                In black ink
              </a>
              <a href="#" className="underlined_link" data-info="regular">
                In black ink
              </a>
              <a href="#" className="underlined_link white" data-info="regular">
                In black ink
              </a>
              <a href="#" className="nav_link_a" data-info="regular">
                In black ink
              </a>
              <div className="underlay">
                <a href="#" className="secondary_nav-item" data-info="regular">
                  In black ink
                </a>
              </div>
              <a href="#" className="link-underlined" data-info="regular">
                In black ink
              </a>
              <a href="#" className="clients-link" data-info="regular">
                In black ink
              </a>
            </div>
          </div>
          <div className="loaders">
            <h3 className="title">Loaders</h3>
            <div className="content">
              <LoaderDots />
              <LoaderDots size="s" />
              <LoaderDots size="m" />
              <LoaderDots size="l" />

              <div className="underlay">
                <FancyLoader size="150" fontSize="1.25" />
              </div>

              <FancyLoader size="150" fontSize="1.25" white="true" />

              <div
                className="button"
                onClick={() => setShowLoader(!showLoader)}
              >
                show fixed loader
              </div>
              {showLoader && <Loader />}

              <ParrotLoader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
