import { Fragment } from "react";
import styles from "../components/homeMain.module.css";
import ProductsShowcase from "../components/home_page/ProductsShowcase";
import FeaturesSection from "../components/home_page/features_section";
import TestimonialSection from "../components/home_page/testimonials_section";
import ClientsSection from "../components/home_page/clients_section";

export default function Home(props) {
  return (
    <Fragment>
      <div className={styles.video_background}>
        <video autoPlay loop>
          <source src="/videos/home-hero-bg.mp4" />
        </video>
      </div>
      <section className="container" aria-labelledby="ezt-main-page">
        <h1 id="ezt-main-page">
          Cutting-edge professional subtitling products
        </h1>
      </section>
      <ProductsShowcase />
      <FeaturesSection />
      <TestimonialSection />
      <ClientsSection />
    </Fragment>
  );
}
