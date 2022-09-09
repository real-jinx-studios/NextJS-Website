import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import styles from "./trial_request_form.module.css";

import FancyLoader from "../utils/FancyLoader";

export default function ChangeEmailConfirmationForm({
  handleFormStateChange,
  emailToken,
}) {
  //state for the conditional rendering if register is true or false
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;
    if (!emailToken) return;
    verifyEmail();
  }, []);

  const verifyEmail = async () => {
    setIsLoading(true);

    const res = fetch(`/api/rest/WebSite/send-reset-password-email`, {
      method: "POST",
      body: JSON.stringify({
        EmailToken: emailToken,
      }),
    });
    let data = {};

    if (res.status === 400) {
      data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
    }

    toast.success("Email changed successfully!", {
      position: "bottom-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    setIsLoading(false);
  };

  return (
    <div className="container flex-center-center">
      <style jsx>{`
        .section-title {
          font-size: 1.8rem;
          font-weight: 500;
          color: var(--clr-neutral-800);
        }
        .email-change {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .success {
          font-size: 1.1rem;
          color: var(--clr-correct);
        }
        .error {
          font-size: 1.1rem;
          color: var(--clr-warn);
        }
      `}</style>
      <div
        className={`${styles.input_wrapper} ${styles.form}`}
        data-before-title="NEW"
        data-after-title="EMAIL"
      >
        <div className={styles.title__section}>
          <p className="section-title">Email Confirmation</p>
        </div>

        {!isLoading ? (
          <div className="email-change">
            {!error && <p className="success">Email changed successfully!</p>}
            {error && <p className="error">{error}</p>}
          </div>
        ) : (
          <div className={styles.loader_wrapper}>
            <FancyLoader size="150" fontSize="1.25" />
          </div>
        )}
      </div>
    </div>
  );
}
