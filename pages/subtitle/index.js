import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import styles from "../../styles/subtitle.module.css";
import MyImage from "../../components/utils/myImage";
import ProductFeaturesSection from "../../components/products/eztitles/product_features_section";
import FileFormatsSection from "../../components/products/eztitles/file_formats_section";
import TimelineSection from "../../components/products/eztitles/timeline_section";
import LicenseOptionsSection from "../../components/products/eztitles/license_options_section";
import ProductPageNav from "../../components/navigation/ProductPageNav";
import SubtitlesForAnything from "../../components/products/eztitles/SubtitlesForAnything";
import ShotChangeSection from "../../components/products/eztitles/ShotChangeSection";
import LicenseEditionsSection from "../../components/products/eztitles/LicenseEditionsSection";
import PricingSection from "../../components/products/eztitles/PricingSection";
import FileFormatsSectionVariant from "../../components/products/eztitles/file_formats_section_variant";
import FuckedUpMenu from "../../components/products/eztitles/FuckedUpMenu";
import ScrollDownArrow from "../../components/utils/ScrollDownArrow";
import customLog from "../../components/utils/customLog";

export default function Subtitle() {
  /*intersection observer shit*/

  const section1 = useRef();
  const section2 = useRef();
  const section3 = useRef();
  const section4 = useRef();

  const nav1 = useRef();
  const nav2 = useRef();
  const nav3 = useRef();
  const nav4 = useRef();
  const navs = [nav1, nav2, nav3, nav4];

  //make intersection observer
  useEffect(() => {
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px 0px 0px",
    };
    const elements = [
      section1.current,
      section2.current,
      section3.current,
      section4.current,
    ];
    let last = null;
    const appearOnScroll = new IntersectionObserver(
      (entries, appearOnScroll) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // navs[elements.indexOf(entry.target)].current.classList.remove(
            //   "current"
            // );
          } else {
            /*if (last) last.classList.remove("current");

            last = navs[elements.indexOf(entry.target)].current;*/
            // navs[elements.indexOf(entry.target)].current.classList.add(
            //   "current"
            // );
          }
        }, appearOptions);
      }
    );
    elements.forEach((element) => {
      appearOnScroll.observe(element);
    });
    return () => {
      appearOnScroll.disconnect();
    };
  }, []);

  /*some more impractical bullshit about product prices*/
  const prices = {
    essentials: {
      ot: "1720",
      rent: "80",
      installment: "436",
      installment_contd: "435",
    },
    standard: {
      ot: "1940",
      rent: "90",
      installment: "491",
      installment_contd: "490",
    },
    ultimate: {
      ot: "2380",
      rent: "100",
      installment: "601",
      installment_contd: "600",
    },
  };

  /*state management is below*/
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isRentDropdownOpen, setIsRentDropdownOpen] = useState(false);
  const [isInstallmentDropdownOpen, setIsInstallmentDropdownOpen] =
    useState(false);
  const [isPaymentSelected, setIsPaymentSelected] = useState("one-time");

  const videoRef = useRef();
  const router = useRouter();

  /*event handlers like clicks and such below*/
  const handleVideoPlay = () => {
    if (videoRef.current.paused) videoRef.current.play();
    else videoRef.current.pause();
  };
  const handlePaymentSelect = (e) => {
    setIsPaymentSelected(e);
  };

  const toggleRentDropdown = () => setIsRentDropdownOpen(!isRentDropdownOpen);
  const toggleInstallmentDropdown = () =>
    setIsInstallmentDropdownOpen(!isInstallmentDropdownOpen);

  const license_editions = [
    {
      name: "Essentials",
      info: "For subtitling streaming services.",
    },
    {
      name: "Standard",
      info: "For more standard sub stuff.",
    },
    {
      name: "Ultimate",
      info: "for tesla owners.",
    },
  ];
  const [license, setLicense] = useState("Essentials");

  /*const { state, dispatch } = useContext(Store);*/
  const handleCheckout = async (e) => {
    e.preventDefault();
    /* dispatch({
      type: "ADD_TO_CHECKOUT_NORMAL",
      payload: {
        name: "EZTitles",
        icon: "/images/icons/ez_icon3.png",
        edition: "essentials",
        license: "Rent",
        duration: "1",
        quantity: 1,
        price: 80,
      },
    });*/
    /*router.push("/user");*/
    router.push("/user?destination=checkout");
  };
  const handleCheckoutPlugins = async (e) => {
    e.preventDefault();
    /*   dispatch({
      type: "ADD_TO_CHECKOUT_NORMAL",
      payload: {
        name: "EZT Plugins",
        icon: "/images/icons/ep_icon3.png",
        edition: "ProMedia Carbon",
        license: "Purchase",
        duration: "lifetime",
        quantity: 1,
        price: 500,
      },
    });*/
    router.push("/checkout");
  };

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="ysxVMioFPf2YJs3BRu3gefvPmShIoplEtnSp3FJJbAg"
        />
      </Head>
      <div className={styles.video_background}>
        <video autoPlay loop style={{ width: "100%" }}>
          <source src="/videos/hero-eztitles.webm" type="video/webm" />
        </video>
      </div>
      <header className={styles.main_wrapper}>
        {/*eztitles purchase menu*/}
        <div className={styles.page_top}>
          <div className={styles.page_top_grid}>
            <div className={styles.title_desc_cell}>
              <h1 className={styles.main_title_description_text}>
                The world’s best professional subtitling and captioning software
              </h1>
            </div>
            <div className={styles.title_cell}>
              <h2 className={styles.main_title_text}>EZTITLES</h2>
            </div>
            <div className={styles.free_trial_cell}>
              <input
                className="chk"
                type="checkbox"
                id="button-mover-trigger"
              />

              <Link href="/products/free-trial?destination=products/free-trial">
                <a className="button button_basic_long">FREE TRIAL</a>
              </Link>
              <label htmlFor="button-mover-trigger">
                <div className="chk_trigger"></div>
              </label>
            </div>
            <div className={styles.license_editions_cell}>
              <a
                onClick={handleCheckoutPlugins}
                href="#"
                className="button button_basic_long"
              >
                LICENSE EDITIONS
              </a>
            </div>
            <div className={styles.pricing_cell}>
              <h4 className={styles.pricing_options_description_title}>
                CHECK PRICING OPTIONS
                <br />
                <span>
                  EZTitles license editions differ only in the supported file
                  formats
                </span>
              </h4>
            </div>
            <div className={styles.dropdown_cell}>
              <div className={styles.dropdown_menu}>
                <select className={styles.select_custom}>
                  <option value="">ESSENTIAL</option>
                  <option value="">STANDARD</option>
                  <option value="">ULTIMATE</option>
                </select>
                <span className={styles.custom_arrow}></span>
              </div>
            </div>

            <div className={styles.payment_select_cell}>
              <p className={styles.payment_text_cell_text}>Payment:</p>
              <div className={styles.select}>
                <div className={styles.purchase_options}>
                  <div
                    className={styles.product_version}
                    key="one-time"
                    onClick={() => handlePaymentSelect("one-time")}
                  >
                    <div
                      className={
                        isPaymentSelected == "one-time"
                          ? styles.product_label_wrapper_on
                          : styles.product_label_wrapper_off
                      }
                    >
                      one-time
                    </div>
                  </div>

                  <div
                    className={styles.product_version}
                    key="rent"
                    onClick={() => handlePaymentSelect("rent")}
                  >
                    <div
                      className={
                        isPaymentSelected == "rent"
                          ? styles.product_label_wrapper_on
                          : styles.product_label_wrapper_off
                      }
                    >
                      rent
                    </div>
                  </div>

                  <div
                    className={styles.product_version}
                    key="installment"
                    onClick={() => handlePaymentSelect("installment")}
                  >
                    <div
                      className={
                        isPaymentSelected == "installment"
                          ? styles.product_label_wrapper_on
                          : styles.product_label_wrapper_off
                      }
                    >
                      installments
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.payment_installment_cell}>
              <p className={styles.text_installment}>
                1 payment of €436 and 3 payments of €435
              </p>
              <div className={styles.dropdown_menu}>
                <select className={styles.select_custom}>
                  <option value="">12 Months (4 payments)</option>
                  <option value="">24 Months (8 payments)</option>
                  <option value="">36 Months (12 payments)</option>
                </select>
                <span className={styles.custom_arrow}></span>
              </div>
            </div>
            <div className={styles.checkout_btn_cell}>
              <Link href="/checkout">
                <a className="button button_basic_long">GO TO CHECKOUT</a>
              </Link>
            </div>
            <div className={styles.checkout_price_cell}>
              {isPaymentSelected == "one-time" && (
                <p className={styles.price_text}>
                  {prices[license.toLowerCase()].ot}€ w/o VAT<sup>*</sup>
                </p>
              )}
              {isPaymentSelected == "rent" && (
                <p className={styles.price_text}>
                  {prices[license.toLowerCase()].rent}€ w/o VAT
                  <br />
                  <small>per/MO.</small>
                </p>
              )}
              {isPaymentSelected == "installment" && (
                <p className={styles.price_text}>
                  1 x {prices[license.toLowerCase()].installment}€ w/o VAT
                  <br />
                  <small>then</small>
                  <br />
                  <small>
                    3<small> x </small>
                    {prices[license.toLowerCase()].installment_contd}€ w/o VAT
                  </small>
                </p>
              )}
            </div>
            <div className={styles.payment_info_cell}>
              <p>
                &#127544; Edit stuff at checkout. Add whatever you want or not.
                &#127544;
              </p>
            </div>
            <div className={styles.arrow_cell}>
              <ScrollDownArrow destination="#video" />
            </div>
          </div>
        </div>
      </header>
      <div className={styles.content_wrapper}>
        <ProductPageNav navReferences={navs} />
        <style jsx>{`
          .bounds {
            outline: #41ff1e00 solid 1px;
          }
          section {
            margin-bottom: var(--offset-11);
          }
        `}</style>

        <div className="bounds" ref={section1}>
          <section className={styles.video_section}>
            <div className={styles.container} id="video">
              <div className={styles.content_inner_text}>
                <div className={styles.paragraph}>
                  <h2 className={styles.subsection_title}>
                    Take a quick look at EZTitles’ capabilities
                  </h2>
                </div>
              </div>
              <div className={styles.video_wrapper}>
                <div
                  className={styles.video_parent}
                  onClick={() => {
                    setIsVideoOpen(!isVideoOpen);
                    handleVideoPlay();
                  }}
                >
                  <div className={styles.video_play}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 0 24 24"
                      width="48px"
                      fill="#fefefe"
                    >
                      <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                    </svg>
                  </div>

                  <div className={styles.video_actual}>
                    <video
                      ref={videoRef}
                      style={{ maxWidth: 985, maxHeight: 554 }}
                    >
                      <source src="/videos/subass_video.mp4" />
                    </video>
                  </div>
                </div>
              </div>
              <div className={styles.content_inner_text}>
                <div className={styles.paragraph}>
                  <h2 className={styles.subsection_title}>
                    and explore its full power
                  </h2>
                </div>
                <div className={styles.scroll_down_svg}>
                  <Link href="#compatibility">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        enableBackground="new 0 0 50 50"
                        height="48px"
                        viewBox="0 0 50 50"
                        width="48px"
                        fill="#FFFFFF"
                      >
                        <path d="M15.563,40.836c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293l15-15  c0.391-0.391,0.391-1.023,0-1.414l-15-15c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l14.293,14.293L15.563,39.422  C15.172,39.813,15.172,40.446,15.563,40.836z" />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <SubtitlesForAnything />
        </div>
        <div className="bounds" ref={section2}>
          <section className={styles.video_format_section}>
            <div className={styles.v_r_a_video_background}>
              <video autoPlay loop muted>
                <source src="/videos/noway_cut.mp4" type="video/mp4" />
              </video>
            </div>
            <div className={styles.container}>
              <div
                className={styles.content_inner_text}
                style={{ flex: "unset" }}
              >
                <div className={styles.paragraph}>
                  <h2 className={styles.v_r_a_title}>
                    Subtitle any video file
                  </h2>
                </div>
              </div>
              <div className={styles.video_resolution_aspect_wrapper_flex}>
                <div className={styles.v_r_a_card_flex}>
                  <div className={`${styles.v_r_a_card_inner}`}>
                    <div className={styles.v_r_a_card_inner_title}>
                      <h4>any file format</h4>
                    </div>
                    <div className={styles.v_r_a_card_inner_description}>
                      <p className={styles.v_r_a_card_inner_description_text}>
                        EZTitles works with nearly any known video format with
                        embedded timecode
                      </p>
                    </div>
                    <div className={styles.v_r_a_card_inner_format_wrapper}>
                      <ul>
                        <li>MPEG-1</li>
                        <li>MPEG-2</li>
                        <li>MPEG-4</li>
                        <li>AVI</li>
                      </ul>
                      <ul>
                        <li>WMV</li>
                        <li>MOV</li>
                        <li>MXF</li>
                        <li>MVF</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.v_r_a_card_flex}>
                  <div className={`${styles.v_r_a_card_inner}`}>
                    <div className={styles.v_r_a_card_inner_title}>
                      <h4>any resolution</h4>
                    </div>
                    <div className={styles.v_r_a_card_inner_description}>
                      <p className={styles.v_r_a_card_inner_description_text}>
                        from SD up to 4K and any custom resolution
                      </p>
                    </div>
                    <div
                      className={
                        styles.v_r_a_card_inner_format_wrapper_resolution
                      }
                    >
                      <ul>
                        <li>
                          <span>
                            SD
                            <br />
                            640x480
                          </span>
                        </li>
                        <li>
                          <span>
                            HD
                            <br />
                            1280x720
                          </span>
                        </li>
                        <li>
                          <span>
                            FULL HD
                            <br />
                            1920x1080
                          </span>
                        </li>
                        <li>
                          <span>
                            4K
                            <br />
                            4096x2160
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.v_r_a_card_flex}>
                  <div className={`${styles.v_r_a_card_inner}`}>
                    <div className={styles.v_r_a_card_inner_title}>
                      <h4>any screen ratio</h4>
                    </div>
                    <div
                      className={styles.v_r_a_card_inner_format_wrapper_ratio}
                    >
                      <ul>
                        <li>
                          <span>16:10</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/computer-widescreen.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                            <MyImage
                              src="/images/software/eztitles/pc.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                            <MyImage
                              src="/images/software/eztitles/smartphone.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                        <li>
                          <span>16:9</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/computer-widescreen.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                            <MyImage
                              src="/images/software/eztitles/tv.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                            <MyImage
                              src="/images/software/eztitles/smartphone.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                        <li>
                          <span>1.85:1</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/cinema.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                        <li>
                          <span>2.35:1</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/movie-reel.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          <span>1:1</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/social_media.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                        <li>
                          <span>5:4</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/pc.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                        <li>
                          <span>3:2</span>
                          <div className={styles.ratio_icons}>
                            <MyImage
                              src="/images/software/eztitles/film.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                            <MyImage
                              src="/images/software/eztitles/camera.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                            <MyImage
                              src="/images/software/eztitles/tablet.png"
                              width={35}
                              height={35}
                              layout="intrinsic"
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.language_section}>
            <div className={styles.container}>
              <div
                style={{ marginTop: "230px" }}
                className={styles.content_inner}
              >
                <div className={styles.content_inner_text}>
                  <dd className={styles.language_text}>
                    <span className={styles.big_text}>in any language</span>{" "}
                    <span className={styles.language_text_color}>
                      dans n'importe quelle languein{" "}
                    </span>
                    en cualquier idioma{" "}
                    <span className={styles.language_text_color}>
                      in jeder sprache
                    </span>{" "}
                    на любом языке{" "}
                    <span className={styles.language_text_color}>
                      به هر زبانی
                    </span>
                    &nbsp;
                    <span className={styles.language_text_color}>
                      herhangi bir dilde
                    </span>{" "}
                    in qualsiasi lingua{" "}
                    <span className={styles.language_text_color}>
                      w dowolnym języku{" "}
                    </span>{" "}
                    בכל שפה på hvilket som helst språk &nbsp;{" "}
                    <span className={styles.language_text_color}>任何語言</span>{" "}
                    &nbsp; σε οποιαδήποτε γλώσσα
                    <span className={styles.language_text_color}> بأي لغة</span>
                    &nbsp;
                    <span className={styles.language_text_color}>
                      bármilyen nyelven
                    </span>{" "}
                    em qualquer idioma{" "}
                    <span className={styles.language_text_color}>
                      किसी भी भाषा म
                    </span>{" "}
                    ในภาษาใดก็ได้ 모든 언어로&nbsp;{" "}
                    <span className={styles.language_text_color}>
                      任意の言語で
                    </span>{" "}
                    &nbsp; på vilket språk som helst{" "}
                    <span className={styles.language_text_color}>
                      на всеки език
                    </span>
                  </dd>
                </div>
              </div>
            </div>
          </section>
          <ShotChangeSection />
        </div>
        <div className="bounds" ref={section3}>
          <TimelineSection />
          <ProductFeaturesSection />
          <FuckedUpMenu />
          <FileFormatsSection />
          <FileFormatsSectionVariant />
        </div>
        <div className="bounds" ref={section4}>
          <LicenseOptionsSection />
          <LicenseEditionsSection />
          <PricingSection />
        </div>
      </div>
    </>
  );
}
