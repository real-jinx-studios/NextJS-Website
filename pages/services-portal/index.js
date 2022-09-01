import Link from "next/link";
import ServicesPortalMain from "../../components/services_portal/ServicesPortalMain";

import LoginForm from "../../components/forms/auth/LoginForm";
import AuthCheck from "../../components/forms/auth/AuthCheck";
import AuthFormWarpper from "../../components/forms/AuthFormWrapper";

export default function ServicesPortal() {
  return (
    <AuthCheck
      fallback={
        <div className="section offset-top">
          <div className="container">
            <AuthFormWarpper />
          </div>
        </div>
      }
    >
      <ServicesPortalMain />;
    </AuthCheck>
  );
}
