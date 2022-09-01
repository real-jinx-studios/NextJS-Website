import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { promiseResolver } from "../../../lib/promiseResolver";
import VerifyEmail from "../../../components/info/VerifyEmail";
import styles from "../../../components/forms/trial_request_form.module.css";
import ParrotLoader from "../../../components/utils/ParrotLoader";
import customLog from "../../../components/utils/customLog";
export default function ActivateUserPage() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setIsLoading(true);
    const token = router.query.token;

    if (token) {
      const verifyEmail = async () => {
        setIsLoading(true);
        const [data, error] = await promiseResolver(
          fetch("/api/rest/WebSite/activate-registered-user", {
            method: "POST",
            body: JSON.stringify({
              ActivationToken: token,
            }),
          })
        );
        if (data.status === 200) {
          setIsVerified(true);
        }
        if (data.status === 400) {
          const err = await data.json();
          customLog([err]);

          setError("Invalid activation token");
        }
        if (data.status === 500) {
          router.replace({
            pathname: "/500",
            query: { err: "internal server error" },
          });
        }
        setIsLoading(false);
      };
      verifyEmail();
    }
  }, [router.isReady]);
  customLog([
    "ActivateUserPage",
    "isVerified",
    isVerified,
    "isLoading",
    isLoading,
    "error",
    error,
  ]);

  if (isLoading) {
    return (
      <section className="section flex-center-center offset-top">
        <div
          className={`container ${styles.form}`}
          data-before-title="ACTIVATING"
          data-after-title="USER"
        >
          <h1 className="section_title">Activating user</h1>
          <p>Please wait while we actiave your account.</p>
          <ParrotLoader />
        </div>
      </section>
    );
  } else if (isVerified) {
    return (
      <section className="section flex-center-center offset-top">
        <div
          className={`container ${styles.form}`}
          data-before-title="SUCCESS"
          data-after-title="ACTIVATION"
        >
          <h1 className="section_title">Email Verified</h1>
          <p>Your email has been verified. You can now login.</p>
          <Link href="/services-portal">
            <a className={styles.title__section_a}>Log in</a>
          </Link>
        </div>
      </section>
    );
  } else if (error) {
    return (
      <section className="section offset-top">
        <div
          className={`container ${styles.form}`}
          data-before-title="FAILED"
          data-after-title="ACTIVATION"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "var(--offset-5)",
          }}
        >
          <h1 className="section_title">User activation failed</h1>
          <p>Unable to activate user.</p>
          <p style={{ color: "var(--clr-warn)" }}>{error}.</p>
        </div>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </section>
    );
  } else {
    return (
      <section className="section offset-top">
        <div
          className={`container ${styles.form}`}
          data-before-title="ACTIVATE"
          data-after-title="USER"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "var(--offset-5)",
          }}
        >
          <h1 className="section_title">Activate your account</h1>
          <p>Please enter check your email to activate your account.</p>
        </div>
      </section>
    );
  }
}
