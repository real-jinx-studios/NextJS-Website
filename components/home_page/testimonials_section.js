import styles from "./home.module.css";
import MyImage from "../utils/myImage";
export default function TestimonialSection() {
  return (
    <section className="section" aria-labelledby="testimonials">
      <div className="container">
        <h2 id="testimonials" className={styles.section_title}>
          Testimonials
        </h2>
        <div className={styles.testimonial_wrapper}>
          <div className={styles.testimonial}>
            <p className={styles.testimonial_text}>
              She looked deeply into his eyes and said, "Octopus." "Do Not
              Enter." The sign made it clear that they didn't want anyone
              around.
            </p>
            <p className={styles.testimonial_person}>Real Person</p>
            <p className={styles.testimonial_company}>
              <em>Real Company</em>
            </p>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonial_text}>
              The song came from the bathroom belting over the sound of the
              shower's running water. It was the same way each day began since
              he could remember. It listened intently and concluded that the
              singing today was as terrible as it had ever been. She sat deep in
              thought.
            </p>
            <p className={styles.testimonial_person}>A Person</p>
            <p className={styles.testimonial_company}>
              <em>Netflix</em>
            </p>
          </div>
          <div className={styles.testimonial}>
            <p className={styles.testimonial_text}>
              That wasn't going to stop Jack. Jack always lived with the notion
              that signs were mere suggestions, not actually absolute rules.
              That's why the moment Jack looked at the "Do Not Enter" sign, he
              walked past it and onto their property.
            </p>
            <p className={styles.testimonial_person}>Another Real Person</p>
            <p className={styles.testimonial_company}>
              <em>Real Company</em>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
