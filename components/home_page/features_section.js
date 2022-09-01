import styles from "./home.module.css";
import Link from "next/link";
export default function FeaturesSection() {
  return (
    <section className="section" aria-labelledby="features_title">
      <div className="container">
        <h2 id="features_title" className={styles.section_title}>
          We give you
        </h2>
        <div className={styles.features_wrapper}>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>PROFESSIONAL TOOLS</h3>
            <p className={styles.feature_description}>
              We at EZTitles Development Studio are devoted to providing our
              clients with quality professional subtitling solutions. Our
              products will help you complete even the most complex subtitling
              tasks at maximum speed, precision and ease. We offer excellent
              support and services and are always happy to listen to our
              clients’ input, using their opinions and ideas to improve the
              software. We believe our products are the best in the field
              precisely because we base our improvements and changes on active
              user feedback. We have always striven to make our software more
              personal.
            </p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>EASE AND AUTOMATION</h3>
            <p className={styles.feature_description}>
              Our subtitling and captioning tools are easy to use and have a
              stylish user friendly interface. They are designed with the single
              goal to make your work faster and smoother. The tedious and
              repetitive tasks could easily be automated. Checks, Fixes and
              Proofing of subtitles are done with no effort and even the
              captions creation process is automated with{" "}
              <Link href="/subass">
                <a>Subtitling Assistant</a>
              </Link>
              .
            </p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>STELLAR SUPPORT</h3>
            <p className={styles.feature_description}>
              Our customers with active Support and Subscription Services
              receive a stellar customer support from EZTitles’ Tech Team and
              also benefit from free updates/upgrades to the latest versions of
              the products. You could rely on accurate and swift response to
              your questions and sufficient assistance for your workflow
              building.
            </p>
          </div>
          <div className={styles.feature}>
            <h3 className={styles.feature_title}>REASONABLE PRICING</h3>
            <p className={styles.feature_description}>
              EZTitles’ subtitling and converting tools offer the best value for
              money. You’ll receive a world class professional software at
              affordable price. We provide discounts for bulk purchases for
              companies and for purchases over 1,000 € we offer flexible 12, 24
              or 36 monthly installment plans. If you are on a tight budget, you
              may either send us an e-mail or review the rates for your chosen
              license{" "}
              <Link href="/subtitle">
                <a>here</a>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
