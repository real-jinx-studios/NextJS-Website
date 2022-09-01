import { useState, useCallback, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import CustomInput from "../../../components/inputs/customInput";
import LoaderDots from "../../../components/utils/loaderDots";
import { promiseResolver } from "../../../lib/promiseResolver";
export default function PasswordResetPage() {
  const [newPassword, setNewPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const passwordToken = router.query.token;
  //password error object
  const [passwordError, setPasswordError] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const passwordRef = useRef();

  const onChange = (e) => {
    const val = e.target.value;
    setNewPassword(val);
    // Only set form value if length is < 3 OR it passes regex
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    const [data, error] = await promiseResolver(
      fetch("/api/rest/WebSite/reset-password", {
        method: "POST",
        body: JSON.stringify({
          ResetPasswordToken: passwordToken,
          NewPassword: passwordRef.current.value,
        }),
      })
    );
    if (data.status === 200) {
      router.push("/user/login");
    }
    if (data.status === 500) {
      router.replace({
        pathname: "/500",
        query: { err: "internal server error" },
      });
    }
  };

  return (
    <section className="section flex-center-center-column offset-top">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <CustomInput
            type="password"
            placeholder="New Password"
            isRequired
            isRegisterPassword={true}
            value={newPassword}
            handleChange={onChange}
            formErrors={formErrors}
            setFormErrors={setFormErrors}
            reference={passwordRef}
          />
          {!loading ? (
            <button
              className={`button button_basic_long ${
                Object.keys(formErrors).length > 0 ? "button_disabled" : ""
              }`}
              type="submit"
              disabled={Object.keys(formErrors).length > 0}
            >
              submit
            </button>
          ) : (
            <LoaderDots />
          )}
        </form>
      </div>
    </section>
  );
}
