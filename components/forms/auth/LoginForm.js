import React, { Fragment, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import "react-toastify/dist/ReactToastify.css";
import CustomInput from "../../inputs/customInput";
import styles from "./trial_forms.module.css";
import Loader from "../../utils/Loader";
import { useClient } from "../../../lib/context";

export default function LoginForm({
  handleFormStateChange,
  handleUsernameInput,
}) {
  const { loginClient } = useClient();

  //get where to redirect from user since could be checkout or user profile or other
  const router = useRouter();
  //make useRef const to attach to html input fields for user
  const usernameRef = useRef();
  const passwordRef = useRef();

  //state for the conditional rendering if register is true or false
  const [loginError, setIsLoginError] = useState(false);

  //handle user submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const res = loginClient(username, password);
    const data = await res;

    if (data.error) {
      setIsLoginError(true);
      return;
    }
    if (data.status === 500) {
      router.replace({
        pathname: "/500",
      });
      return;
    }

    if (!data.IsUserActive) {
      if (handleUsernameInput) {
        handleUsernameInput(username);
      }
      handleFormStateChange("verifyEmail");
      console.log("user is not active");

      return;
    }
  };

  return (
    <div className="container">
      <form
        className={`${styles.input_wrapper} ${styles.form}`}
        onSubmit={handleSubmit}
        data-before-title="LOG"
        data-after-title="IN"
      >
        <div className={styles.title__section}>
          <p className={styles.title__section_p}>Log in</p>
          <p className={styles.title__section_p_subtext}>
            Don't have an account yet?{" "}
            <a
              className={styles.title__section_a}
              onClick={() => handleFormStateChange("register")}
            >
              Sign up
            </a>
          </p>
        </div>
        <div
          className={`${styles.error} ${loginError ? styles.error_active : ""}`}
        >
          Incorrect username or password.
        </div>
        <CustomInput
          reference={usernameRef}
          type="text"
          name="username"
          id="login_username"
          placeholder="Username or Email"
        />
        <CustomInput
          reference={passwordRef}
          type="password"
          name="password"
          id="login_password"
          placeholder="Password"
        />
        {true ? (
          <Fragment>
            <button className="button button_basic_long" type="submit">
              SIGN IN
            </button>
            <a
              className={styles.title__section_a}
              onClick={() => handleFormStateChange("reset")}
            >
              Forgot password?
            </a>
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
