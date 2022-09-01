import { useRef, useEffect, useState } from "react";
export default function ShotChangeSection() {
  const [isInView, setIsInView] = useState(false);
  const shotChangeTimeline = useRef();
  const image1 = useRef();
  const image2 = useRef();
  const image3 = useRef();
  const image4 = useRef();
  const images = [image1, image2, image3, image4];

  //make intersection observer
  useEffect(() => {
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px 0px 0px",
    };

    const appearOnScroll = new IntersectionObserver(
      (entries, appearOnScroll) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            setIsInView(false);
            images.forEach((image) => {
              image.current.classList.remove("image_visible");
            });
          } else {
            setIsInView(true);
            images.forEach((image) => {
              image.current.classList.add("image_visible");
            });
            /* appearOnScroll.unobserve(entry.target);*/
          }
        }, appearOptions);
      }
    );

    appearOnScroll.observe(shotChangeTimeline.current);
  }, []);
  return (
    <section className="product-section flex-center-center-column gap-2">
      <style jsx>{`
        .container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .section {
          position: relative;
          padding: 0;
          margin-bottom: var(--offset-11);
        }
        .timeline_image_wrapper {
          position: relative;
          width: 100%;
          height: 300px;
          overflow-x: hidden;
        }
        .timeline_images {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 2080px;
          transform: translateX(-50%);
        }
        .timeline_images::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          /*   background-color: #00000088;*/
        }
        .image_wrapper {
          position: relative;
          width: max-content;
        }
        .image_wrapper::before {
          content: "";
          position: absolute;
          right: 0;

          width: 3px;
          background-color: #efa91e;
          z-index: 2;
        }
        .image_wrapper.top::before {
          top: 100%;
          bottom: 0;
        }
        .image_wrapper.bottom::before {
          top: 0;
          bottom: 100%;
        }
        .image_wrapper.inView1::before {
          top: 0;
          transition: all 0.5s ease-in-out 1.3s;
        }
        .image_wrapper.inView2::before {
          bottom: 0;
          transition: all 0.5s ease-in-out 1.45s;
        }
        .image_wrapper.inView3::before {
          top: 0;
          transition: all 0.5s ease-in-out 1.6s;
        }
        .image_wrapper.inView4::before {
          bottom: 0;
          transition: all 0.5s ease-in-out 1.75s;
        }

        .image_wrapper-text {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 0 2em;
          overflow: hidden;
        }
        .image_wrapper-text-title {
          font-size: 1.5em;
          width: 100%;
          font-weight: bold;
          color: var(--clr-neutral-50);
          text-align: left;
          margin-bottom: 0.5em;
          opacity: 0;
          transform: translateY(100%);
        }
        .image_wrapper-text-title.fade-up {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease-in-out 1.46s;
        }
        .image_wrapper-text-description {
          opacity: 0;
          font-size: 1em;
          text-align: left;
          transform: translateY(100%);
          color: var(--clr-neutral-50);
        }
        .image_wrapper-text-description.fade-up {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease-in-out 1.5s;
        }
        .image_wrapper-text-description.fade-up2 {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.3s ease-in-out 1.53s;
        }
        .image_hidden {
          position: relative;
          z-index: -1;
          opacity: 0;
          transform: translateX(-100%);
        }
        .image_visible {
          animation-name: slideFromLeft;
          animation-duration: 500ms;
          animation-delay: calc(var(--animation-order) * 200ms);
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.22, 0.68, 0, 1.71);
        }
        @keyframes slideFromLeft {
          0% {
            opacity: 0;

            transform: translateX(-50%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <div className="product-container">
        <header className="header">
          <h2 className="section-heading">
            EZTitles offers an ocean of useful features and automations to help
            your subtitling endeavors
          </h2>
        </header>
      </div>
      <div className="timeline_image_wrapper" ref={shotChangeTimeline}>
        <div className="timeline_images">
          <div className={`image_wrapper top ${isInView ? "inView1" : ""}`}>
            <img
              src="/images/software/eztitles/shot_change.webp"
              className="image_hidden"
              style={{ "--animation-order": "1" }}
              ref={image1}
            />
          </div>
          <div className={`image_wrapper bottom ${isInView ? "inView2" : ""}`}>
            <img
              src="/images/software/eztitles/shot_change.webp"
              className="image_hidden"
              style={{ "--animation-order": "2" }}
              ref={image2}
            />
            <div className="image_wrapper-text">
              <h4
                className={`image_wrapper-text-title ${
                  isInView ? "fade-up" : ""
                }`}
              >
                Stellar Shot change detection
              </h4>
              <p
                className={`image_wrapper-text-description ${
                  isInView ? "fade-up" : ""
                }`}
              >
                for subtitling with an unprecedented accuracy. EZTitles detects
                shot changes on its own, on the fly, in background and without
                any additional software or set-ups needed.
              </p>
            </div>
          </div>
          <div className={`image_wrapper top ${isInView ? "inView3" : ""}`}>
            <img
              src="/images/software/eztitles/shot_change.webp"
              className="image_hidden"
              style={{ "--animation-order": "3" }}
              ref={image3}
            />
            <div className="image_wrapper-text">
              <p
                className={`image_wrapper-text-description ${
                  isInView ? "fade-up2" : ""
                }`}
              >
                Meanwhile you could use all EZTitles’ features for subtitling
                while the video file is still being processed. There are also
                automated tools for fixing existing subtitles to meet the shot
                change requirements.
              </p>
            </div>
          </div>
          <div className={`image_wrapper bottom ${isInView ? "inView4" : ""}`}>
            <img
              src="/images/software/eztitles/shot_change.webp"
              className="image_hidden"
              style={{ "--animation-order": "4" }}
              ref={image4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
