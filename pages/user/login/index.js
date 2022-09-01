import LoginForm from "../../../components/forms/auth/LoginForm";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ResetPasswordForm from "../../../components/forms/ResetPasswordForm";

import AuthCheck from "../../../components/forms/auth/AuthCheck";
import { useClient } from "../../../lib/context";

export default function Login() {
  const [formState, setFormState] = useState("login");
  const { getClientToken } = useClient();

  const router = useRouter();
  const handleFormStateChange = (newFormState) => {
    if (newFormState === "register") {
      router.push("/user/register");
    } else if (newFormState === "reset") {
      setFormState("reset");
    } else if (newFormState === "login") {
      setFormState("login");
    }
  };

  useEffect(() => {
    if (getClientToken()) {
      router.replace("/services-portal");
    }
  }, []);

  if (formState === "reset") {
    return (
      <section className="section offset-top">
        {" "}
        <ResetPasswordForm handleFormStateChange={handleFormStateChange} />
      </section>
    );
  }

  return (
    <AuthCheck
      fallback={
        <section className="section offset-top">
          {" "}
          <LoginForm handleFormStateChange={handleFormStateChange} />
        </section>
      }
    >
      <section className="section offset-top">
        <div className="container">
          <h2>redirecting to services portal</h2>
        </div>
      </section>
    </AuthCheck>
  );
}
