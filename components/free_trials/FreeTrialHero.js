import styles from "./free_trial.module.css";
export default function FreeTrialHero() {
  return (
    <div className="container offset-top">
      <section className={styles.hero_section} aria-labelledby="hero-title">
        <h1 id="hero-title" className={styles.free_trial_hero_title}>
          Try all EZTitles professional tools for free!
        </h1>
        <div className={styles.hero_paragraph}>
          <p>
            You have the change to try for yourself{" "}
            <strong>world-class </strong>
            professional subtitling, captioning and conversion tools for 30 days{" "}
            <strong>free of charge</strong>!
          </p>
        </div>
      </section>
    </div>
  );
}
