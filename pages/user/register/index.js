import RegisterForm from "../../../components/forms/auth/RegisterForm";
import { useRouter } from "next/router";
import ParrotLoader from "../../../components/utils/ParrotLoader";
export default function ServicePortal() {
  const router = useRouter();
  const handleFormStateChange = (e) => {
    router.push("/user/login");
  };
  return <RegisterForm handleFormStateChange={handleFormStateChange} />;
}
