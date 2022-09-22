import { useState, useContext } from "react";
import styles from "./free_trial.module.css";
import LoginForm from "../forms/auth/LoginForm";
import TrialRequestForm from "../forms/TrialRequestForm";

import VerifyEmail from "../info/VerifyEmail";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import RegisterForm from "../forms/auth/RegisterForm";
import AuthCheck from "../forms/auth/AuthCheck";

export default function FreeTrialFormWrapper() {
  const [usernameInput, setUsernameInput] = useState("");
  const [formState, setFormState] = useState("login");

  const handleFormStateChange = (e) => {
    setFormState(e);
  };

  const handleUsernameInput = (e) => {
    setUsernameInput(e);
  };

  return (
    <section
      className={styles.products_section}
      aria-labelledby="products-trial-registration-section"
    >
      <AuthCheck
        fallback={
          formState === "login" ? (
            <LoginForm
              handleFormStateChange={handleFormStateChange}
              destination="#"
              handleUsernameInput={handleUsernameInput}
            />
          ) : formState === "verifyEmail" ? (
            <VerifyEmail
              handleFormStateChange={handleFormStateChange}
              userName={usernameInput}
            />
          ) : formState === "reset" ? (
            <ResetPasswordForm handleFormStateChange={handleFormStateChange} />
          ) : (
            <RegisterForm
              handleFormStateChange={handleFormStateChange}
              handleUsernameInput={handleUsernameInput}
              registrationType="trial"
            />
          )
        }
      >
        <div className="container">
          <TrialRequestForm />
        </div>
      </AuthCheck>
    </section>
  );
}
