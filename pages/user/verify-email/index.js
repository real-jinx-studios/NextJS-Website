import VerifyEmail from "../../../components/info/VerifyEmail";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!router.isReady) return;
    setUserName(router.query.userName);
  }, [router.isReady]);

  return (
    <section className="section offset-top">
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <VerifyEmail userName={userName} />
      </div>
    </section>
  );
}
