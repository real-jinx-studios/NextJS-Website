import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../forms/trial_request_form.module.css";

import { promiseResolver } from "../../lib/promiseResolver";

export default function VerifyEmail(props) {
  const [isSent, setIsSent] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault();

    const [data, error] = await promiseResolver(
      fetch(
        `/api/rest/WebSite/resend-verification-email`,
        {
          method: "POST",
          body: JSON.stringify({
            UserOrEmail: props.userName,
            VerificationLink:
              "http://" +
              process.env.NEXT_PUBLIC_WEBSITE_HOST +
              "/user/activate-user?token=$activation_token$",
          }),
        },
        { endpoint: "resend-verification-email" }
      )
    );
    if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }
    if (data.status === 200) {
      setIsSent(true);
      toast.success("Email sent successfully!", {
        position: "top-center",
        autoClose: false,

        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    } else if (data.status === 400) {
      const err = await data.json();
      if (err.error === "Trying to resend to activated user") {
        setIsActivated(true);
      }
    } else {
      if (process.env.NEXT_PUBLIC_IS_DEVELOPMENT) {
        toast.error("Server error. Unable to send email.", {
          position: "top-center",
          autoClose: false,

          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  const handleLinkClick = (e) => {
    e.preventDefault();
    if (props.handleFormStateChange) {
      props.handleFormStateChange("login");
    } else {
      router.push("/services-portal");
    }
  };

  return (
    <div
      className={`container ${styles.form} verify-email`}
      data-before-title="VERIFY"
      data-after-title="EMAIL"
    >
      <style jsx>{`
        .verify-email {
          gap: var(--offset-2);
        }
        h1 {
          color: var(--clr-neutral-800);
        }
        p {
          color: var(--clr-neutral-700);
        }
      `}</style>
      <div className={styles.title__section}>
        <p className={styles.title__section_p}>Email Verification</p>
        <p className={styles.title__section_p_subtext}>
          Already verified?{" "}
          <a className={styles.title__section_a} onClick={handleLinkClick}>
            Log in
          </a>
        </p>
      </div>
      <p>
        Please check your email for a verification link. If you don't see it,
        check your spam folder.
      </p>

      {!isSent ? (
        <>
          <p>
            If you still haven't received the email, click the button below to
            resend it.
          </p>
          <button className="button" onClick={handleClick}>
            Resend Email
          </button>
        </>
      ) : (
        <></>
      )}
      {isActivated ? (
        <>
          <p>
            You have already activated your account. Please{" "}
            <a onClick={handleLinkClick}>log in</a>
            to continue.
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
