import { useEffect, useState } from "react";
import ExpandIcon from "./ExpandIcon";

export default function FuckedUpMenu() {
  const [active, setActive] = useState(false);
  const [clickedElement, setClickedElement] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const handleClick = (e) => {
    setActive(!active);
    setClickedElement(e.target.dataset.element);
    //make timeout to prevent click event from firing before transition is complete
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  useEffect(() => {
    console.log(clickedElement);
  }, [clickedElement]);
  return (
    <section className="product-section">
      <style jsx>{`
        .product-container {
          max-width: 75rem;
          overflow: initial;
          height: 632px;
        }
        .fucked_up_menu_wrapper {
          display: flex;
          justify-content: center;
          align-items: stretch;
          width: 100%;
          height: 100%;
          flex-wrap: wrap;
          position: relative;
          gap: 2em;
        }
        /*.content_box {
          flex-basis: 48%;
          display: flex;
          position: relative;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          border-radius: 9px;
          border: 2px solid var(--clr-primary);
          transition: all 0.3s ease-in-out;
        }*/
        .content_box {
          position: absolute;
          height: 300px;
          width: 570px;
          border-radius: 9px;
          border: 2px solid var(--clr-primary);
          transition: all 0.3s ease-in-out;
        }
        .content_box * {
          user-select: none;
          pointer-events: none;
        }
        .top_left {
          top: 0;
          left: 0;
          transform-origin: top left;
        }
        .top_right {
          top: 0;
          right: 0;
          transform-origin: top right;
        }
        .bottom_left {
          bottom: 0;
          left: 0;
          transform-origin: bottom left;
        }
        .bottom_right {
          bottom: 0;
          right: 0;
          transform-origin: bottom right;
        }
        .content_box.open {
          height: 100%;
          width: 100%;
        }
        .content_box.closed {
          opacity: 0;
          transform: scale(0);
        }
        .circle {
          position: absolute;
          width: 200px;
          height: 200px;
          bottom: 50%;
          right: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: translate(50%, 50%);
          border-radius: 50%;
          background-color: var(--clr-main);
          transition: all 0.3s ease-in-out;
        }
        .circle.active-top-left {
          bottom: 0;
          right: 0;
          transform: scale(0.8);
        }
        .circle.active-top-right {
          bottom: 0;
          right: calc(100% - 200px);
          transform: scale(0.8);
        }
        .circle.active-bottom-left {
          bottom: calc(100% - 200px);
          right: 0;
          transform: scale(0.8);
        }
        .circle.active-bottom-right {
          bottom: calc(100% - 200px);
          right: calc(100% - 200px);
          transform: scale(0.8);
        }
        .circle_relative_cover {
          border: 2px solid var(--clr-primary);
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border-radius: 50%;
        }

        .circle_inner {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: var(--fs-525);
          color: var(--clr-neutral-50);
        }
        .expand-icon-wrapper {
          position: absolute;
          bottom: 0;
          right: 0;
          line-height: 0;
          padding: 5px;
        }
        .box-content-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          text-align: center;
          font-size: var(--fs-300);
          color: var(--clr-neutral-50);
        }
        .box-content-wrapper.right {
          align-items: flex-end;
        }
        .box-content-wrapper.left {
          align-items: flex-start;
        }
        .box-content-shrunk {
          font-size: var(--fs-200);
          padding: 0.5rem;
        }
        .box-content-shrunk h3 {
          font-size: var(--fs-525);
        }

        .box-content-shrunk.right {
          text-align: right;

          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .box-content_description-shrunk {
          font-size: var(--fs-300);
          max-width: 39ch;
          transform: translateY(0);
          transition: all 0.2s ease-in-out;
        }
        .box-content_description-shrunk.transitioning {
          opacity: 0;
          transform: translateY(50px);
        }
        .box-content_description-shrunk.closed {
          display: none;
        }
        .box-content_description-expanded {
          transition: all 0.2s ease-in-out;
        }
        .box-content_description-expanded.transitioning {
          opacity: 0;
          transform: translateY(50px);
        }
        .box-content_description-expanded.closed {
          display: none;
        }
        .box-content_description-expanded.open {
          display: block;
          transform: translateY(0);
        }
      `}</style>
      <div className="product-container">
        <header>
          <h2 className="product-title"></h2>
        </header>
        <div className="fucked_up_menu_wrapper">
          <div
            className={`content_box top_left ${
              active ? (clickedElement === "top-left" ? "open" : "closed") : ""
            }`}
            data-element="top-left"
          >
            <div className="box-content-wrapper left">
              <div className="box-content-shrunk left">
                <h3>
                  Proofing
                  <br />
                  Tools
                </h3>
                <div
                  className={`box-content_description-shrunk ${
                    active
                      ? clickedElement === "top-left"
                        ? isTransitioning
                          ? "transitioning"
                          : "closed"
                        : "open"
                      : "open"
                  }`}
                >
                  <p>
                    Comprehensive checks are done in the background. They
                    indicate inconsistent cues as well as reading speed and safe
                    area problems.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`content_box bottom_left  ${
              active
                ? clickedElement === "bottom-left"
                  ? "open"
                  : "closed"
                : ""
            }`}
            onClick={handleClick}
            data-element="bottom-left"
          ></div>
          <div
            className={`content_box top_right  ${
              active ? (clickedElement === "top-right" ? "open" : "closed") : ""
            }`}
            onClick={handleClick}
            data-element="top-right"
          >
            <div className="expand-icon-wrapper">
              <ExpandIcon
                expanded={
                  active
                    ? clickedElement === "top-right"
                      ? true
                      : false
                    : false
                }
              />
            </div>
            <div className="box-content-wrapper right">
              <div className="box-content-shrunk right">
                <h3>
                  Automatic
                  <br />
                  Checks
                </h3>
                <div
                  className={`box-content_description-shrunk ${
                    active
                      ? clickedElement === "top-right"
                        ? isTransitioning
                          ? "transitioning"
                          : "closed"
                        : "open"
                      : "open"
                  }`}
                >
                  <p>
                    When you are done subtitling the video, the Check tools will
                    help you make sure your client gets a flawless result.
                  </p>
                </div>
                <div
                  className={`box-content_description-expanded ${
                    active
                      ? clickedElement === "top-right"
                        ? isTransitioning
                          ? "transitioning"
                          : "open"
                        : "closed"
                      : "closed"
                  }`}
                >
                  <p>
                    EZTitles offers you a wide range of tools to give you full
                    control over your subtitles. You can check your project for
                    inconsistent cues, reading speed/safe area problems, raised
                    subtitles and snap thresholds. You can even check your
                    subtitles’ visual attributes - fonts, color, alignment, box
                    style, outline, italics and double height - for any issues.
                  </p>
                  <p>
                    EZTitles will also warn you if any attributes or features
                    you’ve used are not supported by the file format you’re
                    exporting your subtitles for.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`content_box bottom_right  ${
              active
                ? clickedElement === "bottom-right"
                  ? "open"
                  : "closed"
                : ""
            }`}
            onClick={handleClick}
            data-element="bottom-right"
          >
            {" "}
            <div className="expand-icon-wrapper">
              <ExpandIcon
                expanded={
                  active
                    ? clickedElement === "bottom-right"
                      ? true
                      : false
                    : false
                }
              />
            </div>
            <div className="box-content-wrapper right">
              <div className="box-content-shrunk right">
                <h3>
                  Proofing
                  <br />
                  Tools
                </h3>
                <div
                  className={`box-content_description-shrunk ${
                    active
                      ? clickedElement === "bottom-right"
                        ? isTransitioning
                          ? "transitioning"
                          : "closed"
                        : "open"
                      : "open"
                  }`}
                >
                  <p>
                    EZTitles has a set of powerfull tools for proofing your
                    subtitles, captions and translations
                  </p>
                </div>
                <div
                  className={`box-content_description-expanded ${
                    active
                      ? clickedElement === "bottom-right"
                        ? isTransitioning
                          ? "transitioning"
                          : "open"
                        : "closed"
                      : "closed"
                  }`}
                >
                  <p>
                    With its army of useful features, EZTitles will help you
                    work faster than ever before! Autocorrect, Short Forms,
                    Thesaurus, Spelling Suggestions, Negative Dictionaries, Unit
                    Converter, and Web Search to search for a word or phrase on
                    the Internet - EZTitles got it all covered! And all these
                    tools can be customized to fit your needs and help you focus
                    on the most important part of the job - the subtitling
                    itself. EZTitles can work with Microsoft Office, Open Office
                    or LibreOffice for the spellcheck.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`circle  ${active ? "active-" + clickedElement : ""}`}
          >
            <div className="circle_relative_cover">
              <div className="arc top_left"></div>
              <div className="arc top_right"></div>
              <div className="arc bottom_left"></div>
              <div className="arc bottom_right"></div>
            </div>
            <div className="circle_inner">
              Quality <br />
              Control
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
