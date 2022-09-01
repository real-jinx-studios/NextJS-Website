import { useRouter } from "next/router";
import { useEffect } from "react";
import LoaderDots from "../../components/utils/loaderDots";

export default function UserRedirect(props) {
  const router = useRouter();

  useEffect(() => {
    if (props.status === "authenticated") {
      router.replace("/services-portal");
    } else {
      router.replace("/user/login?" + router.query);
    }
  }, [props.status]);

  return (
    <section className="container center">
      <LoaderDots size="xl" color="system" />
    </section>
  );
}
