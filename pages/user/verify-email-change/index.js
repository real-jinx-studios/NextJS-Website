import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChangeEmailConfirmationForm from "../../../components/forms/ChangeEmailConfirmationForm";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [emailToken, setEmailToken] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    setEmailToken(router.query.eToken);
  }, [router.isReady]);

  return (
    <section className="section offset-top">
      <ChangeEmailConfirmationForm emailToken={emailToken} />
    </section>
  );
}
