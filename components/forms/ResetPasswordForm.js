import React, { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";

import CustomInput from "../inputs/customInput";
import styles from "./trial_request_form.module.css";
import { promiseResolver } from "../../lib/promiseResolver";
import ParrotLoader from "../utils/ParrotLoader";
import Loader from "../utils/Loader";

export default function ResetPasswordForm({ handleFormStateChange }) {
  //get where to redirect from user since could be checkout or user profile or other
  const router = useRouter();
  const destination =
    router.query.destination !== undefined
      ? router.query.destination
      : "/services-portal";
  //make useRef const to attach to html input fields for user
  const usernameRef = useRef();

  //state for the conditional rendering if register is true or false
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  //handle user submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const err = checkFormForErrors();
    if (Object.keys(err).length > 0) {
      setIsLoading(false);
      return;
    }

    const [data, error] = await promiseResolver(
      fetch(
        `/api/rest/WebSite/send-reset-password-email`,
        {
          method: "POST",
          body: JSON.stringify({
            UserOrEmail: usernameRef.current.value,
            ResetPasswordLink:
              "http://" +
              process.env.NEXT_PUBLIC_WEBSITE_HOST +
              "/user/reset-password?token=$reset_token$",
          }),
        },
        { endpoint: "send-reset-password-email" }
      )
    );

    if (data.status === 200) {
      router.push(`/user/verify-reset-password`);
    } else if (data.status === 400) {
      setFormErrors({
        Username: "Username or Email not found",
      });
    } else if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }
    setIsLoading(false);
  };

  //check if form has any errors
  const checkFormForErrors = () => {
    const errorObject = {};
    if (usernameRef.current.value === "") {
      errorObject.Username = "Username/Email is required";
    }

    setFormErrors(errorObject);
    return errorObject;
  };

  return (
    <div className="container flex-center-center">
      <form
        className={`${styles.input_wrapper} ${styles.form}`}
        onSubmit={handleSubmit}
        data-before-title="RESET"
        data-after-title="PASSWORD"
      >
        <div className={styles.title__section}>
          <p className={styles.title__section_p}>Reset Password</p>
          <p className={styles.title__section_p_subtext}>
            <a
              className={styles.title__section_a}
              onClick={() => handleFormStateChange("login")}
            >
              Log In
            </a>
          </p>
        </div>

        <CustomInput
          reference={usernameRef}
          type="text"
          placeholder="Username or Email"
          isRequired
          id="reset_username"
          name="Username"
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />

        {!isLoading ? (
          <Fragment>
            <button className="button button_basic_long" type="submit">
              RESET PASSWORD
            </button>
          </Fragment>
        ) : (
          <div className={styles.loader_wrapper}>
            <Loader />
          </div>
        )}
      </form>
    </div>
  );
}
