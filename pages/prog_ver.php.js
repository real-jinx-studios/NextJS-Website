import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Prog_verPhp() {
  const router = useRouter();

  useEffect(() => {
    router.push("/api/prog_ver.php");
  }, []);

  return <></>;
}
