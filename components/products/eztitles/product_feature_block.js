import Link from "next/link";
import { Fragment, useState } from "react";
import VideoOverlay from "../../utils/VideoOverlay";

export default function ProductFeatureBlock({ feature }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <style jsx>{`
        .feature-wrapper {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          /*outline: red solid 1px;*/
        }
        .feature-details {
          flex: 1;
          display: grid;
          grid-auto-rows: 0.3fr 0.3fr 1fr 0.3fr;
          justify-content: end;
          padding: 0.5em 3em;
        }
        .feature-details > * {
        }
        .feature-details.left.split {
          text-align: right;
          position: relative;
          /*outline: red solid 1px;*/
        }
        .feature-details.left {
          text-align: left;
          position: relative;
          /*outline: red solid 1px;*/
        }
        .feature-details.right {
          text-align: right;
          position: relative;
          /*outline: red solid 1px;*/
        }
        .feature-details.left.split::after {
          position: absolute;
          content: "";
          left: calc(100% - 1px);
          right: 0;
          top: 0;
          bottom: 0;
          background-color: var(--clr-neutral-50);
        }
        .feature-media {
          position: relative;
          height: 100%;
          padding: 3em;
        }
        .feature-details_title {
          font-size: 2.5rem;
          font-weight: 100;
        }
        .feature-details_actions-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .feature-details_actions-wrapper > a:nth-child(1) {
          margin: 0 1em;
        }
        .highlight-text {
          color: var(--clr-text-highlight);
          font-weight: 500;
        }
        strong {
          color: var(--clr-text-highlight) !important;
          font-weight: 500;
        }
      `}</style>
      <div className="feature-wrapper">
        {feature.displayOption === "description-media" && (
          <Fragment>
            <div className="feature-details left">
              <h3 className="feature-details_title">
                {feature.description.title}
              </h3>
              {feature.description.description.map((paragraph) => (
                <p
                  className="feature-details_description"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="feature-details_actions-wrapper">
                {feature.description.actions.map((action) => {
                  if (action.type === "link") {
                    return (
                      <div>
                        {" "}
                        <Link href={action.href}>
                          <a className="button button_basic_long">
                            {action.name}
                          </a>
                        </Link>
                      </div>
                    );
                  }
                  if (action.type === "button") {
                    return (
                      <div>
                        {" "}
                        <button
                          className="button button_basic_long"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {action.name}
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="feature-media flex-center-center">
              {!feature.isAnimated ? (
                <img
                  src={feature.media.image}
                  alt={feature.media.alt}
                  width={500}
                  height={500}
                />
              ) : (
                <video autoPlay loop>
                  <source src={feature.media.video} type="video/webm" />
                </video>
              )}
              {feature.hasDemo && (
                <VideoOverlay
                  isOpen={isOpen}
                  isYouTube={true}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
          </Fragment>
        )}
        {feature.displayOption === "media-description" && (
          <Fragment>
            <div className="feature-media flex-center-center">
              {!feature.isAnimated ? (
                <img
                  src={feature.media.image}
                  alt={feature.media.alt}
                  width={500}
                  height={500}
                />
              ) : (
                <video autoPlay loop>
                  <source src={feature.media.video} type="video/webm" />
                </video>
              )}
              {feature.hasDemo && (
                <VideoOverlay
                  isOpen={isOpen}
                  isYouTube={true}
                  setIsOpen={setIsOpen}
                />
              )}
            </div>
            <div className="feature-details right">
              <h3 className="feature-details_title">
                {feature.description.title}
              </h3>
              {feature.description.description.map((paragraph) => (
                <p
                  className="feature-details_description"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="feature-details_actions-wrapper">
                {feature.description.actions.map((action) => {
                  if (action.type === "link") {
                    return (
                      <div>
                        {" "}
                        <Link href={action.href}>
                          <a className="button button_basic_long">
                            {action.name}
                          </a>
                        </Link>
                      </div>
                    );
                  }
                  if (action.type === "button") {
                    return (
                      <div>
                        {" "}
                        <button
                          className="button button_basic_long"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {action.name}
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Fragment>
        )}
        {feature.displayOption === "description-description" && (
          <Fragment>
            <div className="feature-details left split">
              <VideoOverlay
                isOpen={isOpen}
                isYouTube={true}
                setIsOpen={setIsOpen}
              />
              <h3 className="feature-details_title">
                {feature.description.title}
              </h3>
              {feature.description.description.map((paragraph) => (
                <p
                  className="feature-details_description"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="feature-details_actions-wrapper">
                {feature.description.actions.map((action) => {
                  if (action.type === "link") {
                    return (
                      <div>
                        {" "}
                        <Link href={action.href}>
                          <a className="button button_basic_long">
                            {action.name}
                          </a>
                        </Link>
                      </div>
                    );
                  }
                  if (action.type === "button") {
                    return (
                      <div>
                        {" "}
                        <button
                          className="button button_basic_long"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {action.name}
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="feature-details">
              <h3 className="feature-details_title">{feature.media.title}</h3>
              {feature.media.description.map((paragraph) => (
                <p
                  className="feature-details_description"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
              <div className="feature-details_actions-wrapper">
                {feature.description.actions.map((action) => {
                  if (action.type === "link") {
                    return (
                      <div>
                        {" "}
                        <Link href={action.href}>
                          <a className="button button_basic_long">
                            {action.name}
                          </a>
                        </Link>
                      </div>
                    );
                  }
                  if (action.type === "button") {
                    return (
                      <div>
                        {" "}
                        <button
                          className="button button_basic_long"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {action.name}
                        </button>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}
