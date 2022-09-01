import styles from "./free_trial.module.css";
export default function ProductCardTrial({ type, handleForm, ...props }) {
  const products = [
    {
      icon: "ez_icon3.png",
      name: "EZtitles",
      subtitle: "Subtitling software",
      alt: "EZtitles icon",
      details:
        "You will get a free access to the most powerful edition of EZTitles to experience all the incredible features and automations and try the export to all industry standard file formats.",
      extra: "Try EZTitles Ultimate for 30 days now!",
      button: "GET FREE TRIAL",
    },
    {
      icon: "ezc_icon3.png",
      name: "EZConvert",
      subtitle: "Conversion Software",
      alt: "EZConvert Icon",
      details:
        "EZConvert is a strictly professional tool and is not offered for a full 30 days free trial. You should check out the demo version of EZConvert GUI for free. If your company is interested in the enterprise features, please apply for a 5 day trial.",
      extra: "",
      button: "GET FREE TRIAL",
    },
    {
      icon: "ep_icon3.png",
      name: "EZTitles Plug-ins",
      subtitle: "Plug-ins for encoding",
      alt: "EZtitles Plugins icon",
      details:
        "EZTitles provides subtitling Plug0ins for some of the popular video encoding software. Using them you could easily import your captions in ProMedia@ Carbon or Cambria FTC.",
      extra: "Try EZTitles Plug-ins for free for 30 days!",
      button: "GET FREE TRIAL",
    },
    {
      icon: "cap.png",
      name: "EZtitles Student Trial",
      subtitle: "",
      alt: "EZtitles Students icon",
      details:
        "We offer an extended Student Trial for EZTitles subtitling and captioning software. This 3 months license for educational purpose is offered to students in universities where AVT with EZTitles is taught.",
      extra: "Try EZTitles Ultimate for 90 days now!",
      button: "GET STUDENT TRIAL",
    },
  ];

  return (
    <div className={styles.product_card_wrapper}>
      <div className={styles.product_card_header}>
        <img
          src={"/images/icons/" + products[type].icon}
          alt={products[type].alt}
          width={50}
          height={50}
        />
        <div className={styles.product_card_header_title_section}>
          <h4 className={styles.product_card_header_title}>
            {products[type].name}
          </h4>
          <p className={styles.product_card_header_subtitle}>
            {products[type].subtitle}
          </p>
        </div>
      </div>
      <div className={styles.product_card_details}>
        <p>{products[type].details}</p>
      </div>
      <div className={styles.product_card_extra}>
        <p>{products[type].extra}</p>
      </div>
      <div className={styles.product_card_btn}>
        <a href="#products-trial-registration-section">
          <button className="button button_basic_long" onClick={handleForm}>
            {products[type].button}
          </button>
        </a>
      </div>
    </div>
  );
}
