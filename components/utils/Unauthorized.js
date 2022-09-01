import { useEffect } from "react";
import { useRouter } from "next/router";
export default function Unauthorized() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    router.replace("/user/login");
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
        <h1>Unauthorized</h1>
        <p>You are not authorized to access this page.</p>
      </div>
    </section>
  );
}
