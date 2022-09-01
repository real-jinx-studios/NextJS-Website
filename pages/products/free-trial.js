import { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import FreeTrialHero from "../../components/free_trials/FreeTrialHero";
import FreeTrialProducts from "../../components/free_trials/FreeTrialProducts";
import FreeTrialFormWrapper from "../../components/free_trials/FreeTrialFormWrapper";
import AuthCheck from "../../components/forms/auth/AuthCheck";
import AuthFormWarpper from "../../components/forms/AuthFormWrapper";
export default function FreeTrial({ status, data }) {
  return (
    <Fragment>
      <Head>
        <title>EZTitles Free Trials</title>
        <meta
          name="description"
          content="Request a demo for every EZTitles product."
        />
      </Head>
      <FreeTrialHero />

      <AuthCheck
        fallback={
          <section
            className=""
            aria-labelledby="products-trial-registration-section"
          >
            {" "}
            <AuthFormWarpper registrationType="trial" />
          </section>
        }
      >
        {" "}
        <FreeTrialProducts />
      </AuthCheck>
    </Fragment>
  );
}
