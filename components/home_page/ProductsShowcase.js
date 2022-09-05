import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ProductsShowcase() {
  const [selectedProduct, setSelectedProduct] = useState("blue");

  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const handleSelectProductChange = (e, value) => {
    setSelectedProduct(value);
  };

  useEffect(() => {
    oneRef.current.classList.add("active");
    twoRef.current.classList.add("active");
    threeRef.current.classList.add("active");
    oneRef.current.click();
  }, []);
  return (
    <section className="section wide offset-top">
      <style jsx>{`
        .main_inner {
          margin: 0 auto;
          display: flex;
          width: 100%;
          justify-content: center;
        }
        .one,
        .two,
        .three {
          border: 2px solid var(--clr-neutral-50);
          border-radius: 9px;
          width: 350px;
          position: relative;
          z-index: 1;
          min-height: 600px;
          transition: all 0.35s cubic-bezier(1, -0.65, 0, 1.35);
        }
        .one {
          transform: translateX(0);

          background: rgb(17, 75, 103);
          background: linear-gradient(
            45deg,
            rgba(17, 75, 103, 1) 0%,
            rgba(32, 104, 140, 1) 66%,
            rgba(47, 133, 176, 1) 100%
          );
          border-color: #00ffff;
        }
        .two {
          transform: translateX(0);
          background: rgb(106, 19, 9);
          background: linear-gradient(
            45deg,
            rgba(106, 19, 9, 1) 0%,
            rgba(131, 24, 13, 1) 66%,
            rgba(142, 27, 15, 1) 100%
          );
          border-color: #ce4f4a;
        }
        .three {
          transform: translateX(0);
          background: rgb(154, 68, 27);
          background: linear-gradient(
            45deg,
            rgba(154, 68, 27, 1) 0%,
            rgba(183, 66, 6, 1) 66%,
            rgba(210, 77, 4, 1) 100%
          );
          border-color: #fbb03b;
        }

        #blue:checked ~ .main > .main_inner > .one.active {
          transform: translateX(100%);
          z-index: 2;
        }
        #blue:checked ~ .main > .main_inner > .two.active {
          transform: translateX(-40%) scale(0.9);
        }
        #blue:checked ~ .main > .main_inner > .three.active {
          transform: translateX(-60%) scale(0.9);
        }
        #red:checked ~ .main > .main_inner > .one.active {
          transform: translateX(60%) scale(0.9);
        }
        #red:checked ~ .main > .main_inner > .two.active {
          transform: translateX(0) scale(1);
          z-index: 2;
        }
        #red:checked ~ .main > .main_inner > .three.active {
          transform: translateX(-60%) scale(0.9);
        }
        #orange:checked ~ .main > .main_inner > .one.active {
          transform: translateX(60%) scale(0.9);
        }
        #orange:checked ~ .main > .main_inner > .two.active {
          transform: translateX(40%) scale(0.9);
        }
        #orange:checked ~ .main > .main_inner > .three.active {
          transform: translateX(-100%) scale(1);
          z-index: 2;
        }
        #blue,
        #red,
        #orange {
          position: absolute;
          top: 0;
          left: 0;
          display: none;
        }
        #blue {
          top: 50%;
        }
        #red {
          top: 55%;
        }
        #orange {
          top: 60%;
        }

        .ezt,
        .ezc,
        .ezp {
          position: absolute;
          transition: all 0.3s ease-in-out;
        }
        .ezt {
          transform: translateX(0);
        }
        .ezc {
          transform: translateX(-150%);
        }
        .ezp {
          transform: translateX(-250%);
        }

        #blue:checked ~ .details_container > .ezt {
          transform: translateX(0);
          z-index: 2;
        }
        #blue:checked ~ .details_container > .ezc {
          transform: translateX(-150%);
          opacity: 0;
        }
        #blue:checked ~ .details_container > .ezp {
          transform: translateX(-250%);
          opacity: 0;
        }
        #red:checked ~ .details_container > .ezt {
          transform: translateX(-150%);
          z-index: 1;
          opacity: 0;
        }
        #red:checked ~ .details_container > .ezc {
          transform: translateX(0);
          z-index: 2;
          opacity: 1;
        }
        #red:checked ~ .details_container > .ezp {
          transform: translateX(-250%);
          z-index: 1;
          opacity: 0;
        }
        #orange:checked ~ .details_container > .ezt {
          transform: translateX(-150%);
          z-index: 1;
          opacity: 0;
        }
        #orange:checked ~ .details_container > .ezc {
          transform: translateX(-250%);
          z-index: 1;
          opacity: 0;
        }
        #orange:checked ~ .details_container > .ezp {
          transform: translateX(0);
          z-index: 2;
          opacity: 1;
        }

        .main_wrapper {
          display: flex;
          justify-content: space-between;
        }
        .main_controller {
          display: flex;
          gap: 2em;
          margin-top: 1.89em;
          justify-content: center;
        }
        .main_controller label::before {
          color: var(--clr-neutral-50) !important;
          display: inline-block;
          content: "";
          width: 0.5em;
          height: 0.5em;
          border-radius: 50%;
          background-color: var(--clr-neutral-50);
          font-size: 1.5rem !important;
        }
        .card {
          padding: 1.8em 2.1em;
        }
        .card_product_platforms,
        .card_product_title,
        .card_product_description,
        .card_product_learn_more {
          margin-bottom: 1.89em;
        }
        .card_product_platforms img {
          margin-left: auto;
        }
        .card_product_title {
        }
        .card_product_title p {
          font-size: 2.1rem;
          font-weight: bold;
        }
        .card_product_description {
          margin-bottom: 2.5em;
        }
        .card_product_description p {
          font-size: 0.96rem;
        }
        .card_product_learn_more {
          display: flex;
          justify-content: center;
        }
        .details_container {
          flex: 0 0 34%;
          padding: 2em;
          margin: 0 auto;
          position: relative;
        }
        .details_product {
          width: 80%;
        }
        .details_product.active {
        }
        .details_title_wrapper {
          text-align: center;
        }
        .details_title {
          font-size: 2.2rem;
        }
        .details_subtitle {
        }
        .details_buttons {
          margin-left: auto;
          margin-right: auto;
          width: 50%;
          display: flex;
          gap: 1.8em;
          flex-direction: column;
        }
      `}</style>
      <div className="main_wrapper">
        <input
          type="radio"
          name="switch"
          id="blue"
          onClick={(e) => {
            handleSelectProductChange(e, "blue");
          }}
        />
        <input
          type="radio"
          name="switch"
          id="red"
          onClick={(e) => {
            handleSelectProductChange(e, "red");
          }}
        />
        <input
          type="radio"
          name="switch"
          id="orange"
          onClick={(e) => {
            handleSelectProductChange(e, "orange");
          }}
        />
        <div className="details_container">
          <div className="details_product ezt">
            <div className="details_title_wrapper">
              <h3 className="details_title">
                Subtitles and Closed Captions creation software
              </h3>
              <p className="details_subtitle">
                <strong>Starting from €58/month</strong>
                <br />
                <em>for EZTitles Essentialsss</em>
              </p>
            </div>
            <div className="details_buttons">
              <Link href="/products/free-trial?destination=products/free-trial">
                <a className="button button_basic_long blue">FREE TRIAL</a>
              </Link>
              <Link href="/checkout">
                <a className="button button_basic_long blue">BUY NOW</a>
              </Link>
              <Link
                href={{
                  pathname: "/products/eztitles-essentials",
                  query: {
                    product: "eztitles-essentials",
                  },
                }}
              >
                <a className="button button_basic_long blue">LEARN MORE</a>
              </Link>
              <Link href="/products/eztitles-essentials">
                <a className="button button_basic_long blue">
                  LICENSE EDITIONS
                </a>
              </Link>
            </div>
          </div>
          <div className="details_product ezc">
            <div className="details_title_wrapper">
              <h3 className="details_title">Subtitles conversion software</h3>
              <p className="details_subtitle">
                <strong>Starting from €80/month</strong>
                <br />
                <em>for EZConvert GUI</em>
              </p>
            </div>
            <div className="details_buttons">
              <Link href="/products/free-trial?destination=products/free-trial">
                <a className="button button_basic_long red">FREE TRIAL</a>
              </Link>
              <Link href="/checkout">
                <a className="button button_basic_long red">BUY NOW</a>
              </Link>
              <Link
                href={{
                  pathname: "/ezc",
                  query: {
                    product: "ezconvert",
                  },
                }}
              >
                <a className="button button_basic_long red">LICENSE EDITIONS</a>
              </Link>
            </div>
          </div>
          <div className="details_product ezp">
            <div className="details_title_wrapper">
              <h3 className="details_title">Plugins for EZTitles</h3>
              <p className="details_subtitle">
                <strong>Starting from €60/month</strong>
                <br />
                <em>for all plugins</em>
              </p>
            </div>
            <div className="details_buttons">
              <Link href="/products/free-trial?destination=products/free-trial">
                <a className="button button_basic_long orange">FREE TRIAL</a>
              </Link>
              <Link href="/checkout">
                <a className="button button_basic_long orange">BUY NOW</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="main_inner">
            <label ref={oneRef} className="one card" htmlFor="blue">
              <div className="card_product_platforms">
                <img width={45} height={45} src="/images/windows.png" />
              </div>
              <div className="card_product_title">
                <p>EZTitles</p>
              </div>
              <div className="card_product_description">
                <p>
                  EZTitles redefines what professional subtitling software can
                  do! World-class Streaming Services, TV, Digital Cinema, DVD
                  and Blu-ray subtitle preparation software. Powerful conversion
                  tool for almost any known file format. Breakthrough module for
                  Closed Captioning. Three groundbreaking products. Single
                  software.
                </p>
              </div>
              <div className="card_product_learn_more">
                <Link href="/subtitle">
                  <a className="button button_basic_long">LEARN MORE</a>
                </Link>
              </div>
            </label>
            <label ref={twoRef} className="two card" htmlFor="red">
              <div className="card_product_platforms">
                <img width={45} height={45} src="/images/windows.png" />
              </div>
              <div className="card_product_title">
                <p>EZConvert</p>
              </div>
              <div className="card_product_description">
                <p>
                  Fast and accurate subtitle conversion tool which supports a
                  variety of subtitle formats and DVD, Blu-ray and NLE authoring
                  systems. EZConvert does not bother with different output file
                  format a client may require. It simply has them all!
                </p>
              </div>
              <div className="card_product_learn_more">
                <Link href="/convert">
                  <a className="button button_basic_long">LEARN MORE</a>
                </Link>
              </div>
            </label>
            <label ref={threeRef} className="three card" htmlFor="orange">
              <div className="card_product_platforms">
                <img width={45} height={45} src="/images/windows.png" />
              </div>
              <div className="card_product_title">
                <p>EZTitles Plug-ins</p>
              </div>
              <div className="card_product_description">
                <p>
                  The plug-ins for ProMedia Carbon & Rhozet Carbon Coder, and
                  Capella Systems' Cambria File Convert are powerful tools which
                  allows you to load and encode your subtitles Closed Caption,
                  Teletext or DVB files with the video.
                </p>
              </div>
              <div className="card_product_learn_more">
                <Link href="/plugins">
                  <a className="button button_basic_long">LEARN MORE</a>
                </Link>
              </div>
            </label>
          </div>
          <div className="main_controller">
            <label htmlFor="blue" />
            <label htmlFor="red" />
            <label htmlFor="orange" />
          </div>
        </div>
      </div>
    </section>
  );
}
